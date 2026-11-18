/* NorthPoint · firma de acciones para Hyperliquid (mainnet y testnet).
   Sigue el esquema del SDK oficial de Python:
   - Acciones L1 (órdenes, cancelaciones, apalancamiento): msgpack(acción) + nonce + vault → keccak → "agente fantasma" EIP-712 (chainId 1337).
   - Acciones firmadas por el usuario (aprobar agente, aprobar comisión de builder): EIP-712 "HyperliquidSignTransaction".
   Funciona en el navegador (globals ethers y MessagePack) y en Node (module.exports). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory;
  else root.HLSign = factory(root.ethers, root.MessagePack);
})(typeof self !== 'undefined' ? self : this, function (ethers, msgpack) {
  const ZERO = '0x0000000000000000000000000000000000000000';
  const API = { main: 'https://api.hyperliquid.xyz', test: 'https://api.hyperliquid-testnet.xyz' };

  // números como los quiere Hyperliquid: string sin ceros sobrantes
  function wire(x) {
    let s = Number(x).toFixed(8);
    if (Math.abs(Number(s) - Number(x)) >= 1e-12) throw new Error('redondeo inválido: ' + x);
    s = s.replace(/\.?0+$/, '');
    return s === '-0' ? '0' : s;
  }
  // precio: máx 5 cifras significativas y máx (6 − szDecimals) decimales; los enteros siempre valen
  function roundPx(px, szDecimals) {
    if (Number.isInteger(px)) return px;
    const sig = Number(Number(px).toPrecision(5));
    const dec = Math.max(0, 6 - szDecimals);
    return Number(sig.toFixed(dec));
  }
  function roundSz(sz, szDecimals) { const f = 10 ** szDecimals; return Math.floor(sz * f + 1e-9) / f; }

  function u64(n) { const b = new Uint8Array(8); let v = BigInt(n); for (let i = 7; i >= 0; i--) { b[i] = Number(v & 0xffn); v >>= 8n; } return b; }
  function concat(parts) { const n = parts.reduce((a, p) => a + p.length, 0), out = new Uint8Array(n); let o = 0; for (const p of parts) { out.set(p, o); o += p.length; } return out; }
  function actionHash(action, vaultAddress, nonce, expiresAfter) {
    const parts = [msgpack.encode(action), u64(nonce)];
    if (vaultAddress) parts.push(new Uint8Array([1]), ethers.getBytes(vaultAddress)); else parts.push(new Uint8Array([0]));
    if (expiresAfter != null) parts.push(new Uint8Array([0]), u64(expiresAfter));
    return ethers.keccak256(concat(parts));
  }
  const L1 = {
    domain: { chainId: 1337, name: 'Exchange', verifyingContract: ZERO, version: '1' },
    types: { Agent: [{ name: 'source', type: 'string' }, { name: 'connectionId', type: 'bytes32' }] }
  };
  function split(sig) { const s = ethers.Signature.from(sig); return { r: s.r, s: s.s, v: s.v }; }
  // firma L1 con una llave local (la "llave de operación" del usuario)
  async function signL1(wallet, action, nonce, isMainnet, vaultAddress = null, expiresAfter = null) {
    const msg = { source: isMainnet ? 'a' : 'b', connectionId: actionHash(action, vaultAddress, nonce, expiresAfter) };
    return split(await wallet.signTypedData(L1.domain, L1.types, msg));
  }

  // acciones firmadas por la wallet del usuario (MetaMask, Rabby…)
  const USER_TYPES = {
    approveAgent: [{ name: 'hyperliquidChain', type: 'string' }, { name: 'agentAddress', type: 'address' }, { name: 'agentName', type: 'string' }, { name: 'nonce', type: 'uint64' }],
    approveBuilderFee: [{ name: 'hyperliquidChain', type: 'string' }, { name: 'maxFeeRate', type: 'string' }, { name: 'builder', type: 'address' }, { name: 'nonce', type: 'uint64' }],
    withdraw3: [{ name: 'hyperliquidChain', type: 'string' }, { name: 'destination', type: 'string' }, { name: 'amount', type: 'string' }, { name: 'time', type: 'uint64' }]
  };
  const PRIMARY = { approveAgent: 'HyperliquidTransaction:ApproveAgent', approveBuilderFee: 'HyperliquidTransaction:ApproveBuilderFee', withdraw3: 'HyperliquidTransaction:Withdraw' };
  function userTyped(action, chainIdHex) {
    const kind = action.type, fields = USER_TYPES[kind];
    const message = {}; fields.forEach(f => (message[f.name] = action[f.name]));
    return {
      domain: { name: 'HyperliquidSignTransaction', version: '1', chainId: parseInt(chainIdHex, 16), verifyingContract: ZERO },
      types: { [PRIMARY[kind]]: fields }, primaryType: PRIMARY[kind], message
    };
  }
  function approveAgentAction(agentAddress, agentName, isMainnet, chainIdHex, nonce) {
    return { type: 'approveAgent', signatureChainId: chainIdHex, hyperliquidChain: isMainnet ? 'Mainnet' : 'Testnet', agentAddress, agentName, nonce };
  }
  function approveBuilderFeeAction(builder, maxFeeRate, isMainnet, chainIdHex, nonce) {
    return { type: 'approveBuilderFee', signatureChainId: chainIdHex, hyperliquidChain: isMainnet ? 'Mainnet' : 'Testnet', maxFeeRate, builder: builder.toLowerCase(), nonce };
  }
  // firma con un signer de ethers (Node / pruebas) — misma estructura que eth_signTypedData_v4
  async function signUserWithWallet(wallet, action) {
    const t = userTyped(action, action.signatureChainId);
    return split(await wallet.signTypedData(t.domain, t.types, t.message));
  }
  // firma con la wallet del navegador (EIP-1193)
  async function signUserWithProvider(provider, address, action) {
    const t = userTyped(action, action.signatureChainId);
    const data = JSON.stringify({
      types: { EIP712Domain: [{ name: 'name', type: 'string' }, { name: 'version', type: 'string' }, { name: 'chainId', type: 'uint256' }, { name: 'verifyingContract', type: 'address' }], ...t.types },
      domain: t.domain, primaryType: t.primaryType, message: t.message
    });
    return split(await provider.request({ method: 'eth_signTypedData_v4', params: [address, data] }));
  }

  // órdenes
  function orderWire({ asset, isBuy, px, sz, reduceOnly = false, tif = 'Ioc', trigger = null }) {
    const o = { a: asset, b: isBuy, p: wire(px), s: wire(sz), r: reduceOnly };
    o.t = trigger ? { trigger: { isMarket: trigger.isMarket, triggerPx: wire(trigger.px), tpsl: trigger.tpsl } } : { limit: { tif } };
    return o;
  }
  function orderAction(orders, builder, grouping = 'na') {
    const a = { type: 'order', orders, grouping };
    if (builder && builder.b) a.builder = { b: builder.b.toLowerCase(), f: builder.f };
    return a;
  }
  const cancelAction = cancels => ({ type: 'cancel', cancels: cancels.map(c => ({ a: c.asset, o: c.oid })) });
  const leverageAction = (asset, leverage, isCross = true) => ({ type: 'updateLeverage', asset, isCross, leverage });

  async function post(net, action, nonce, signature, vaultAddress = null) {
    const r = await fetch(API[net] + '/exchange', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, nonce, signature, vaultAddress }) });
    const txt = await r.text(); let d; try { d = JSON.parse(txt); } catch (e) { d = { status: 'err', response: txt }; }
    return d;
  }
  async function info(net, body) {
    const r = await fetch(API[net] + '/info', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error('Hyperliquid ' + r.status); return r.json();
  }
  return { API, wire, roundPx, roundSz, actionHash, signL1, userTyped, approveAgentAction, approveBuilderFeeAction, signUserWithWallet, signUserWithProvider, orderWire, orderAction, cancelAction, leverageAction, post, info };
});
