const H=window.Holdem,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const SB={url:'https://uwnkhkqawjhxwysizrzv.supabase.co',key:'sb_publishable_aSi5csZKTrpJKMFAFvHE5A_eju6oUqE'};
const NS='obs'+(new URLSearchParams(location.search).get('as')||'')+'.';
const st={get(k,d){try{const v=localStorage.getItem(NS+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(NS+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>(+n||0).toLocaleString('en-US');
const short=n=>n>=1e6?(n/1e6).toFixed(n%1e6?1:0)+'M':n>=1e3?(n/1e3).toFixed(n%1e3?1:0)+'K':String(n);
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2800)}
const hash=s=>{let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)};

// ---------- sedes (como las ciudades de un juego de billar: cada una sube la apuesta) ----------
const VENUES=[
 {room:'Classic',sb:5,bb:10,buy:500,lvl:1,felt:'#0c3a25',glow:'#2bd47d',metal:'linear-gradient(135deg,#1f7a4d,#0a3d25 55%,#062818)',ink:'#d9ffe9'},
 {room:'Silver',sb:25,bb:50,buy:2500,lvl:3,felt:'#1b252c',glow:'#cfd6de',metal:'linear-gradient(135deg,#f2f4f7,#a9b0b9 45%,#6c737c)',ink:'#15181b'},
 {room:'Gold',sb:100,bb:200,buy:10000,lvl:6,felt:'#2b2210',glow:'#f2cf6b',metal:'linear-gradient(135deg,#fbe8a6,#d4a640 45%,#8a6416)',ink:'#2a1d04'},
 {room:'Platinum',sb:500,bb:1000,buy:50000,lvl:10,felt:'#14242c',glow:'#bfe3f2',metal:'linear-gradient(135deg,#f4fbff,#b9cdd8 45%,#7d93a1)',ink:'#0f1a20'},
 {room:'Black',sb:2500,bb:5000,buy:250000,lvl:15,felt:'#0b0b0c',glow:'#e9e9ea',metal:'linear-gradient(135deg,#3a3a3f,#111113 50%,#000)',ink:'#f2f2f3'},
 {room:'Diamond',sb:10000,bb:20000,buy:1000000,lvl:20,felt:'#0a2a3a',glow:'#7fd8ff',metal:'linear-gradient(135deg,#e4f8ff,#7fd0f2 40%,#2d7fb0)',ink:'#05202e'},
 {room:'Double Diamond',sb:50000,bb:100000,buy:5000000,lvl:25,felt:'#1a1236',glow:'#c9a6ff',metal:'linear-gradient(135deg,#ffe3fb,#c8a8ff 35%,#7c6cff 65%,#3c2f9e)',ink:'#170d33'}];

const ENTRIES=PRICING.entries;
// dinero: cada mesa real guarda G.money={usd (lo que cuesta el buy-in o la entrada), bank (wallet del anfitrión), net}. adentro todo son fichas.
const U=(n,v=V)=>v&&v.money?PRICING.fmtUsd(Math.max(0,n)*v.money.usd/v.buyin):'';
const M=(n)=>fmt(n);
const rpcFor=net=>net==='mainnet'?'https://solana-rpc.publicnode.com':'https://api.devnet.solana.com';
const scan=(sig,net=PRICING.network)=>`https://solscan.io/tx/${sig}${net==='mainnet'?'':'?cluster=devnet'}`;
const MINT=net=>PRICING.token[net],DEC=PRICING.token.decimals;
let BAL=null;async function balance(){if(!P.wallet||P.wallet.kind!=='sol')return;try{const ata=(await ataOf(P.wallet.addr,PRICING.network)).toBase58();const r=await fetch(rpcFor(PRICING.network),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getAccountInfo',params:[ata,{encoding:'jsonParsed'}]})});const d=await r.json();BAL=d.result&&d.result.value?+d.result.value.data.parsed.info.tokenAmount.uiAmount:0;hdr()}catch(e){}}
setInterval(balance,30000);
let W3=null;async function web3(){if(W3)return W3;await new Promise((ok,ko)=>{const sc=document.createElement('script');sc.src='https://unpkg.com/@solana/web3.js@1.98.0/lib/index.iife.min.js';sc.onload=ok;sc.onerror=ko;document.head.appendChild(sc)});return W3=window.solanaWeb3}
const TOKEN_PG='TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',ATA_PG='ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',MEMO_PG='MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
async function ataOf(owner,net){const w=await web3();return w.PublicKey.findProgramAddressSync([new w.PublicKey(owner).toBuffer(),new w.PublicKey(TOKEN_PG).toBuffer(),new w.PublicKey(MINT(net)).toBuffer()],new w.PublicKey(ATA_PG))[0]}
// una transacción con uno o varios pagos en USDC (buy-in → banco; cash-outs/premios → cada jugador), firmada en Phantom
async function payTo(list,memo,net){const w=await web3(),pv=window.phantom?.solana||window.solana;if(!pv)throw new Error('Phantom not found');await pv.connect();
 const from=pv.publicKey,mint=new w.PublicKey(MINT(net)),conn=new w.Connection(rpcFor(net),'confirmed'),tx=new w.Transaction(),src=await ataOf(from.toBase58(),net);
 for(const x of list){const owner=new w.PublicKey(x.to),dst=await ataOf(x.to,net);
  tx.add(new w.TransactionInstruction({programId:new w.PublicKey(ATA_PG),keys:[{pubkey:from,isSigner:true,isWritable:true},{pubkey:dst,isSigner:false,isWritable:true},{pubkey:owner,isSigner:false,isWritable:false},{pubkey:mint,isSigner:false,isWritable:false},{pubkey:w.SystemProgram.programId,isSigner:false,isWritable:false},{pubkey:new w.PublicKey(TOKEN_PG),isSigner:false,isWritable:false}],data:new Uint8Array([1])}));
  const amt=BigInt(Math.round(x.usd*10**DEC)),d=new Uint8Array(10),dv=new DataView(d.buffer);d[0]=12;dv.setBigUint64(1,amt,true);d[9]=DEC;
  tx.add(new w.TransactionInstruction({programId:new w.PublicKey(TOKEN_PG),keys:[{pubkey:src,isSigner:false,isWritable:true},{pubkey:mint,isSigner:false,isWritable:false},{pubkey:dst,isSigner:false,isWritable:true},{pubkey:from,isSigner:true,isWritable:false}],data:d}))}
 tx.add(new w.TransactionInstruction({keys:[],programId:new w.PublicKey(MEMO_PG),data:new TextEncoder().encode(memo)}));
 const {blockhash}=await conn.getLatestBlockhash();tx.recentBlockhash=blockhash;tx.feePayer=from;
 let sig;if(pv.signAndSendTransaction){const r=await pv.signAndSendTransaction(tx);sig=r.signature||r}else{const signed=await pv.signTransaction(tx);sig=await conn.sendRawTransaction(signed.serialize())}
 for(let k=0;k<40;k++){try{const st2=await conn.getSignatureStatuses([sig]);const c=st2.value[0];if(c&&c.err)throw new Error('transaction failed');if(c&&(c.confirmationStatus==='confirmed'||c.confirmationStatus==='finalized'))return sig}catch(e){if(/failed/.test(e.message))throw e}await new Promise(r=>setTimeout(r,1500))}return sig}
// el banco revisa en la cadena que el pago llegó: de quién, a qué cuenta de USDC y cuánto
async function verifyPay(sig,from,to,usd,net){const dst=(await ataOf(to,net)).toBase58(),need=Math.floor(usd*10**DEC*.999);
 for(let k=0;k<8;k++){try{const r=await fetch(rpcFor(net),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'getTransaction',params:[sig,{encoding:'jsonParsed',maxSupportedTransactionVersion:0,commitment:'confirmed'}]})});const d=await r.json();
  if(d.result){if(d.result.meta&&d.result.meta.err)return false;return d.result.transaction.message.instructions.some(ix=>ix.parsed&&(ix.parsed.type==='transferChecked'||ix.parsed.type==='transfer')&&ix.parsed.info.destination===dst&&ix.parsed.info.authority===from&&+(ix.parsed.info.tokenAmount?ix.parsed.info.tokenAmount.amount:ix.parsed.info.amount)>=need)}}catch(e){}await new Promise(r=>setTimeout(r,1500))}return false}
function ledger(e){(P.ledger=P.ledger||[]).unshift({t:Date.now(),...e});P.ledger.length=Math.min(P.ledger.length,60);saveP()}

// ---------- perfil local: monedas de juego, nivel, foto ----------
const P=Object.assign({name:'',avatar:'',coins:10000,xp:0,hands:0,won:0,best:0,tWins:0,lastBonus:0,inPlay:null,paid:{},counted:{}},st.get('profile',{}));
const saveP=()=>{st.set('profile',P);hdr()};
const lvlOf=xp=>Math.floor(Math.sqrt(xp/20))+1,xpFor=l=>20*(l-1)*(l-1);
const UID=st.get('uid',null)||(()=>{const u='u'+crypto.getRandomValues(new Uint32Array(2)).join('');st.set('uid',u);return u})();
function avaH(name,img,uid){if(img)return`<img src="${img}" alt="">`;const h=hash(uid||name),c1=`hsl(${h%360} 45% 38%)`,c2=`hsl(${(h>>4)%360} 55% 18%)`;return`<span style="position:absolute;inset:0;background:linear-gradient(135deg,${c1},${c2});display:grid;place-items:center">${esc((name||'?').trim()[0]||'?').toUpperCase()}</span>`}
function hdr(){$('#coins').textContent=BAL==null?(P.wallet?'…':'—'):PRICING.fmtUsd(BAL)+' USDC';const wb=document.getElementById('wbtn');if(wb){wb.textContent=P.wallet?shortW(P.wallet.addr):'connect wallet';wb.classList.toggle('on',!!P.wallet)}$('#mylv').textContent=lvlOf(P.xp);$('#myava').innerHTML=avaH(P.name,P.avatar,UID)}
function addCoins(n,why){P.coins+=n;saveP();if(n>0&&why)toast(`+${fmt(n)} coins · ${why}`)}
function bonus(){const d=new Date().toDateString();if(P.lastBonus===d)return toast('you already claimed today’s bonus. come back tomorrow.');P.lastBonus=d;addCoins(2000,'daily bonus')}
// fichas que quedaron en una mesa que cerraste sin levantarte
if(P.inPlay&&!location.hash.startsWith('#t/'+P.inPlay.code)){const r=P.inPlay;P.inPlay=null;if(r.stack>0){P.coins+=r.stack;setTimeout(()=>toast(`${fmt(r.stack)} coins returned from table ${r.code}`),800)}saveP()}

// ---------- fichas (SVG) ----------
const DEN=[[1e6,'#e7c873','#7a5a12'],[1e5,'#ef4444','#7f1d1d'],[25000,'#a855f7','#4c1d95'],[5000,'#f97316','#7c2d12'],[1000,'#facc15','#713f12'],[500,'#8b5cf6','#3b0764'],[100,'#111','#555'],[25,'#16a34a','#064e3b'],[5,'#dc2626','#7f1d1d'],[1,'#f4f4f5','#9ca3af']];
const chipSvg=(c,d)=>`<svg viewBox="0 0 20 20"><ellipse cx="10" cy="11.4" rx="9.2" ry="5.6" fill="${d}"/><ellipse cx="10" cy="9.6" rx="9.2" ry="5.6" fill="${c}"/><ellipse cx="10" cy="9.6" rx="6.4" ry="3.8" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="1.1" stroke-dasharray="2.2 1.6"/><ellipse cx="10" cy="9.6" rx="4.2" ry="2.4" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width=".5"/></svg>`;
function stack(n){let left=Math.max(0,Math.floor(n)),cols=[];for(const [v,c,d] of DEN){if(left>=v&&cols.length<3){const k=Math.min(8,Math.floor(left/v));cols.push({c,d,k});left-=k*v}}
 return`<span class="stk">${cols.map(o=>`<span class="col" style="height:${20+(o.k-1)*3.2}px">${Array.from({length:o.k},(_,i)=>`<span style="position:absolute;left:0;bottom:${i*3.2}px">${chipSvg(o.c,o.d)}</span>`).join('')}</span>`).join('')}</span>`}

// ---------- sonido mínimo ----------
let AC=null;const snd=(f=880,d=.05,t='triangle',g=.05)=>{if(st.get('mute',0))return;try{AC=AC||new AudioContext();const o=AC.createOscillator(),v=AC.createGain();o.type=t;o.frequency.value=f;v.gain.value=g;o.connect(v).connect(AC.destination);v.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+d);o.start();o.stop(AC.currentTime+d)}catch(e){}};
const sChip=()=>{snd(1900,.04,'square',.02);setTimeout(()=>snd(2300,.03,'square',.015),30)},sCard=()=>snd(500,.05,'sine',.04),sTurn=()=>{snd(660,.08);setTimeout(()=>snd(990,.1),90)};

// ---------- cifrado de cartas (cada jugador recibe solo las suyas) ----------
const KEYS={},AK={};const b64=b=>btoa(String.fromCharCode(...new Uint8Array(b))),unb64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function myKeys(){if(KEYS.priv)return KEYS;let j=st.get('kp',null);const alg={name:'ECDH',namedCurve:'P-256'};
 if(!j){const kp=await crypto.subtle.generateKey(alg,true,['deriveKey']);j={priv:await crypto.subtle.exportKey('jwk',kp.privateKey),pub:b64(await crypto.subtle.exportKey('raw',kp.publicKey))};st.set('kp',j)}
 KEYS.priv=await crypto.subtle.importKey('jwk',j.priv,alg,false,['deriveKey']);KEYS.pub=j.pub;return KEYS}
async function aesWith(pub){if(AK[pub])return AK[pub];const k=await myKeys(),p=await crypto.subtle.importKey('raw',unb64(pub),{name:'ECDH',namedCurve:'P-256'},false,[]);return AK[pub]=await crypto.subtle.deriveKey({name:'ECDH',public:p},k.priv,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function seal(pub,o){const iv=crypto.getRandomValues(new Uint8Array(12));return{iv:b64(iv),ct:b64(await crypto.subtle.encrypt({name:'AES-GCM',iv},await aesWith(pub),new TextEncoder().encode(JSON.stringify(o))))}}
async function unseal(pub,b){return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:unb64(b.iv)},await aesWith(pub),unb64(b.ct))))}

// ---------- red ----------
const sb=window.supabase.createClient(SB.url,SB.key,{auth:{persistSession:false}});
let LOBBY={},lobby=null,lobbyOk=false,lastAnn=null;
function ensureLobby(){if(lobby&&['joined','joining'].includes(lobby.state))return;if(lobby){try{sb.removeChannel(lobby)}catch(e){}}lobbyOk=false;
 lobby=sb.channel('suited-lobby',{config:{presence:{key:UID}}});
 lobby.on('presence',{event:'sync'},()=>{LOBBY={};Object.values(lobby.presenceState()).flat().forEach(t=>{if(t.code)LOBBY[t.code]=t});const on=Object.values(lobby.presenceState()).flat();const seated=on.reduce((x,t)=>x+(t.seated||0),0);document.querySelectorAll('[data-online]').forEach(e=>e.textContent=fmt(Math.max(on.length,seated)));drawLobby();drawVenues()});
 lobby.subscribe(s=>{if(s==='SUBSCRIBED'){lobbyOk=true;lobby.track(lastAnn||{here:1});setTimeout(drawLobby,1500)}})}
ensureLobby();setInterval(ensureLobby,5000);
let lastLobbyTrack=0;function announce(force){if(!G||!HOST||!G.public)return;if(!force&&Date.now()-lastLobbyTrack<3000)return;lastLobbyTrack=Date.now();
 ensureLobby();lastAnn={code:G.code,name:G.name,mode:G.mode,venue:G.venue,seated:G.seats.filter(Boolean).length,sb:G.sb,bb:G.bb,buyin:G.buyin,started:!!G.started,finished:G.phase==='finished',prize:G.prize||0};if(lobbyOk)lobby.track(lastAnn)}

// ---------- lobby ----------
const CODEC='ABCDEFGHJKLMNPQRSTUVWXYZ23456789',newCode=()=>Array.from(crypto.getRandomValues(new Uint8Array(6)),b=>CODEC[b%CODEC.length]).join('');
const SPADE='<svg viewBox="0 0 24 24"><path d="M12 2C9 6 4 9 4 13.2A4.3 4.3 0 0011.3 16c-.3 2.2-1.2 3.9-2.8 5h7c-1.6-1.1-2.5-2.8-2.8-5A4.3 4.3 0 0020 13.2C20 9 15 6 12 2z" fill="currentColor"/></svg>';
function drawVenues(){$('#venues').innerHTML=VENUES.map((v,i)=>{const tr=PRICING.tiers[i],n=Object.values(LOBBY).filter(t=>t.venue===i&&t.mode!=='sng').reduce((a,t)=>a+t.seated,0);
  return`<div class="tier" data-quick="${i}" style="--metal:${v.metal};--ink:${v.ink};--glow:${v.glow};--felt:${v.felt}"><div class="tcard2"><div class="sheen"></div><div class="tc-top"><span class="tc-brand">${SPADE}SUITED</span><span class="tc-chip"></span></div><div class="tc-name">${v.room}</div><div class="tc-bot"><span>buy-in</span><span>${PRICING.fmtUsd(tr.usd)}</span></div></div>
  <div class="tinfo"><div><b>${PRICING.fmtUsd(tr.usd)}</b><span>${fmt(v.buy)} chips · blinds ${short(v.sb)}/${short(v.bb)}</span></div><span class="tplay"><i></i>${n} seated</span></div></div>`}).join('');
 $('#pvVenue').innerHTML=VENUES.map((v,i)=>v.custom?'':`<option value="${i}">${v.room} · ${PRICING.fmtUsd(PRICING.tiers[i].usd)}</option>`).join('');
 $('#entries').innerHTML=ENTRIES.map((e,i)=>`<div class="tc ${i===(+st.get('entry',0))?'on':''}" data-entry="${i}"><div class="k">${e.k} · ${VENUES[e.tier].room} table</div><div class="v">${PRICING.fmtUsd(e.usd)}</div><div class="s">entry · 9 players = ${PRICING.fmtUsd(e.usd*9)} prize pool</div></div>`).join('')}
function seatsBar(n){return`<span class="seatsbar">${Array.from({length:9},(_,i)=>`<i class="${i<n?'f':''}"></i>`).join('')}</span>`}
function drawLobby(){const T=Object.values(LOBBY);const cash=T.filter(t=>t.mode!=='sng'),sng=T.filter(t=>t.mode==='sng'&&!t.started&&!t.finished);
 $('#liveN').textContent=cash.length?`· ${cash.length}`:'';
 $('#liveTables').innerHTML=cash.length?cash.sort((a,b)=>b.seated-a.seated).map(t=>{const v=VENUES[t.venue]||VENUES[0];return`<div class="tr" style="--vf:${v.felt}"><span class="dot"></span><div><div class="n">${esc(t.name)}</div><div class="s">${v.room} · blinds ${short(t.sb)}/${short(t.bb)} · buy-in ${short(t.buyin)}</div></div>${seatsBar(t.seated)}<button class="btn sm ${t.seated>=9?'gh':''}" data-open="${t.code}">${t.seated>=9?'full':'sit'}</button></div>`}).join(''):'<div class="empty">no public tables right now. tap quick seat in any room to open one.</div>';
 $('#tN').textContent=sng.length?`${sng.length} open`:'';
 $('#liveT').innerHTML=sng.length?sng.map(t=>`<div class="tr"><span class="dot" style="background:var(--gold)"></span><div><div class="n">${esc(t.name)}</div><div class="s">entry ${short(t.buyin)} · prize pool ${short(t.prize)} · starts when 2+ are seated</div></div>${seatsBar(t.seated)}<button class="btn sm" data-open="${t.code}">register</button></div>`).join(''):'<div class="empty">no tournaments open. create one below.</div>'}
// para sentarte hay que conectar una wallet (Phantom o MetaMask): es tu identidad en la mesa
const shortW=a=>a?a.slice(0,4)+'…'+a.slice(-4):'';
function walletModal(){showOver(`<h3>your wallet</h3><p>your Solana wallet pays your buy-ins and receives your winnings. every payment is a transaction you approve in Phantom.</p>
 <button class="wopt" data-cw="sol"><span class="wi" style="background:linear-gradient(135deg,#ab9ff2,#534bb1)"><svg viewBox="0 0 24 24"><path d="M5 16.5h11.5l2.5-2.5H7.5zM5 7.5h11.5L19 10H7.5zM19 12H7.5L5 9.5h11.5z" fill="#fff"/></svg></span><span><b>Phantom</b><small>Solana</small></span></button>
 <p style="margin:14px 0 0;font-size:11.5px">18+ only. by connecting you accept the table rules.</p>`)}
async function connectWallet(kind){try{let addr;
 if(kind==='sol'){const pv=window.phantom?.solana||window.solana;if(!pv){window.open('https://phantom.app/download','_blank','noopener');return toast('install Phantom, then come back')}const r=await pv.connect();addr=r.publicKey.toString()}
 else{if(!window.ethereum){window.open('https://metamask.io/download/','_blank','noopener');return toast('install MetaMask, then come back')}const a=await window.ethereum.request({method:'eth_requestAccounts'});addr=a[0]}
 P.wallet={kind,addr};if(!P.name)P.name=shortW(addr);saveP();balance();$('#over').classList.remove('on');toast('wallet connected · '+shortW(addr));if(CODE)enterTable(CODE)}catch(e){toast('connection cancelled')}}
function needName(){if(P.name)return true;showOver(`<h3>pick your table name</h3><p>other players will see this name.</p><input class="in" id="oName" maxlength="16" placeholder="your name"><div style="height:12px"></div><button class="btn w" data-setname>continue</button>`);setTimeout(()=>$('#oName')?.focus(),50);return false}
function createTable(cfg){if(cfg.money&&(!P.wallet||P.wallet.kind!=='sol')){walletModal();return}const code=newCode(),Gn=H.newTable({code,...cfg},UID);if(cfg.money){Gn.money={usd:cfg.money.usd,bank:P.wallet.addr,net:PRICING.network};Gn.paid={};Gn.bank=P.name;Gn.cashouts=[]}st.set('host.'+code,Gn);location.hash='#t/'+code}
function quick(i){const v=VENUES[i];if(!needName())return;
 const t=Object.values(LOBBY).filter(t=>t.mode!=='sng'&&t.venue===i&&t.seated<9).sort((a,b)=>b.seated-a.seated)[0];
 if(t)location.hash='#t/'+t.code;else createTable({name:`${v.room} #${Math.floor(Math.random()*90+10)}`,mode:'cash',venue:i,public:true,sb:v.sb,bb:v.bb,buyin:v.buy,money:{usd:PRICING.tiers[i].usd}})}

// ---------- perfil ----------
function drawProfile(){const tx=$('#pTx');if(tx)tx.innerHTML=(P.ledger||[]).length?P.ledger.map(e=>`<div class="txr"><span class="tt ${e.type==='buy-in'?'out':'in'}">${e.type}</span><span class="m">${e.type==='buy-in'?'−':'+'}${PRICING.fmtUsd(Math.abs(e.usd||0))}</span><span class="dim2">${e.sig?`<a href="${scan(e.sig,e.net||PRICING.network)}" target="_blank" rel="noopener">view on Solscan</a>`:esc(e.status||'')}</span></div>`).join(''):'<div class="empty">no transactions yet</div>';const L=lvlOf(P.xp),a=xpFor(L),b=xpFor(L+1);$('#pAva').innerHTML=avaH(P.name,P.avatar,UID);$('#pName').value=P.name;$('#pXp').style.width=((P.xp-a)/(b-a)*100)+'%';$('#pLv').textContent=`level ${L} · ${fmt(P.xp-a)} / ${fmt(b-a)} xp to level ${L+1}`;
 $('#pStats').innerHTML=[[(P.ledger||[]).filter(e=>e.type==='buy-in').length,'buy-ins'],[fmt(P.hands),'hands played'],[fmt(P.won),'pots won'],[fmt(P.best),'biggest pot'],[fmt(P.tWins),'tournaments won'],[P.hands?Math.round(P.won/P.hands*100)+'%':'—','win rate']].map(([x,y])=>`<div><b>${x}</b><span>${y}</span></div>`).join('');
 $('#road').innerHTML=VENUES.map(v=>`<div class="${L>=v.lvl?'ok':''}"><b>${v.room}</b>${L>=v.lvl?'unlocked':'level '+v.lvl}<div style="color:var(--mut);margin-top:4px">${short(v.sb)}/${short(v.bb)}</div></div>`).join('')}
$('#pName').onchange=e=>{P.name=e.target.value.trim().slice(0,16);saveP()};
$('#pFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const img=new Image();img.onload=()=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d'),s=Math.min(img.width,img.height);x.drawImage(img,(img.width-s)/2,(img.height-s)/2,s,s,0,0,96,96);P.avatar=c.toDataURL('image/jpeg',.72);saveP();drawProfile();toast('photo updated')};img.src=URL.createObjectURL(f)};

// ---------- mesa ----------
let ch=null,CODE=null,G=null,HOST=false,HOLE=null,PUBS={},seenHand=0,lastState=0,V=null,prevBoard=0,prevTurn=-1,prevHandSeen=0;
async function enterTable(code){CODE=code;document.body.style.overflow='hidden';document.body.classList.add('inroom');$('#room').classList.add('on');$$('.page').forEach(p=>p.classList.remove('on'));
 if(!P.name){needName();return}
 const saved=st.get('host.'+code,null);HOST=!!(saved&&saved.hostUid===UID);if(HOST)G=saved;
 await myKeys();
 ch=sb.channel('suited-'+code,{config:{broadcast:{self:false},presence:{key:UID}}});
 ch.on('broadcast',{event:'state'},({payload})=>{if(HOST)return;G=payload;lastState=Date.now();onState()});
 ch.on('broadcast',{event:'hole'},async({payload})=>{if(payload.to!==UID||!G)return;try{HOLE={hand:payload.hand,cards:await unseal(G.hostPub,payload.box)};render()}catch(e){}});
 ch.on('broadcast',{event:'req'},({payload})=>{if(HOST)handle(payload)});
 ch.on('broadcast',{event:'err'},({payload})=>{if(payload.to===UID)onErr(payload.e,payload.type)});
 ch.on('presence',{event:'sync'},()=>{PUBS={};Object.values(ch.presenceState()).flat().forEach(p=>PUBS[p.uid]=p);render()});
 ch.subscribe(async s=>{if(s!=='SUBSCRIBED')return;await ch.track({uid:UID,name:P.name,pub:KEYS.pub});
  if(HOST){commit();announce(true)}else{send('hello',{});setTimeout(()=>{if(!G)$('#msg').textContent='waiting for the table host… they need to have the table open.'},5000)}});
 if(HOST)setInterval(hostTick,1000);setInterval(render,400);render()}
function send(type,d){const p={type,uid:UID,name:P.name,pub:KEYS.pub,...d};if(HOST)handle(p);else ch.send({type:'broadcast',event:'req',payload:p})}
function reply(p,e){if(p.uid===UID)onErr(e,p.type);else ch.send({type:'broadcast',event:'err',payload:{to:p.uid,e,type:p.type}})}
function handle(p){if(!G)return;let e=null;if(p.pub)PUBS[p.uid]={...(PUBS[p.uid]||{}),uid:p.uid,name:p.name,pub:p.pub};
 if(p.type==='hello'){commit();sendHole(p.uid);return}
 if((p.type==='sit'||p.type==='rebuy')&&G.money&&p.uid!==G.hostUid){G.used=G.used||{};if(!p.sig||G.used[p.sig]){reply(p,'payment missing');return}
  verifyPay(p.sig,p.wallet,G.money.bank,G.money.usd,G.money.net).then(ok=>{if(!ok){reply(p,'payment not found on-chain. ask the bank for help.');return}G.used[p.sig]=1;
   const e2=p.type==='sit'?H.sit(G,{uid:p.uid,name:p.name,seat:p.seat,avatar:p.avatar,lvl:p.lvl}):H.rebuy(G,p.uid);if(e2){reply(p,e2+' · your payment arrived: the bank can refund it');return}
   if(p.type==='sit')G.seats[p.seat].wallet=p.wallet;G.paid=G.paid||{};G.paid[p.uid]=p.sig;commit()});return}
 if(p.type==='leave'&&G.money&&G.mode==='cash'&&p.uid!==G.hostUid){const s3=G.seats.find(x=>x&&x.uid===p.uid);if(s3&&s3.stack>0&&s3.wallet)(G.cashouts=G.cashouts||[]).push({uid:p.uid,name:s3.name,wallet:s3.wallet,chips:s3.stack,usd:Math.floor(s3.stack*G.money.usd/G.buyin*100)/100})}
 if(p.type==='sit'){e=H.sit(G,{uid:p.uid,name:p.name,seat:p.seat,avatar:p.avatar,lvl:p.lvl});if(!e&&p.wallet){const s2=G.seats[p.seat];s2.wallet=p.wallet;if(G.money&&p.uid===G.hostUid){G.paid=G.paid||{};G.paid[p.uid]='host'}}}
 else if(p.type==='act')e=H.act(G,p.uid,p.a,p.amount);
 else if(p.type==='leave')e=H.leave(G,p.uid);
 else if(p.type==='rebuy')e=H.rebuy(G,p.uid);
 else if(p.type==='sitout')e=H.sitout(G,p.uid,p.on);
 else if(p.type==='start'){if(p.uid!==G.hostUid)e='only the host can start';else if(H.eligible(G).length<2)e='you need at least 2 players';else{G.go=true;G.nextAt=Date.now()+3000}}
 else if(p.type==='paid'){if(p.uid!==G.hostUid)e='only the host can mark payments';else{G.paid=G.paid||{};G.paid[p.who]=!G.paid[p.who]}}
 if(e){if(p.uid===UID)onErr(e,p.type);else ch.send({type:'broadcast',event:'err',payload:{to:p.uid,e,type:p.type}});return e}commit();return null}
let PEND=null;function onErr(e,type){toast(e);if((type==='sit'||type==='rebuy')&&PEND){P.coins+=PEND;PEND=null;if(type==='sit')P.inPlay=null;saveP()}}
function hostTick(){if(!G)return;let c=false;if(H.timeout(G))c=true;
 if(G.phase==='waiting'){const need=G.mode==='sng'?Math.min(9,Math.max(2,G.minStart||2)):2;if(H.eligible(G).length>=need&&!(G.mode==='sng'&&G.money&&!G.go)){if(!G.nextAt)G.nextAt=Date.now()+(G.mode==='sng'?8000:2500);else if(Date.now()>G.nextAt){G.nextAt=0;H.startHand(G);c=true}}else G.nextAt=0}
 else if(G.phase==='showdown'&&Date.now()>G.nextAt){H.startHand(G);c=true}
 if(c)commit();else if(Date.now()-lastState>4000)commit();announce()}
async function sendHole(uid){if(!G||(!H.inBetting(G)&&G.phase!=='showdown'))return;const i=G.seats.findIndex(p=>p&&p.uid===uid),cards=G.priv.holes[i];if(!cards)return;
 if(uid===UID){HOLE={hand:G.handNo,cards};return}const pub=PUBS[uid]?.pub;if(!pub)return;ch.send({type:'broadcast',event:'hole',payload:{to:uid,hand:G.handNo,box:await seal(pub,cards)}})}
function commit(){st.set('host.'+CODE,G);lastState=Date.now();const v=H.publicView(G);v.hostPub=KEYS.pub;ch&&ch.send({type:'broadcast',event:'state',payload:v});
 if(G.handNo!==seenHand&&H.inBetting(G)){seenHand=G.handNo;G.seats.forEach(p=>{if(p&&p.inHand)sendHole(p.uid)})}announce(true);onState()}
// economía y progreso del jugador, a partir del estado público
let SEENPAY='';function onState(){const v=HOST?H.publicView(G):G;if(!v)return;if(v.phase==='finished'&&v.payout&&SEENPAY!==v.payout){SEENPAY=v.payout;if(P.paid[CODE])showFinished(v)}if(H.inBetting(v)&&!HSTART[CODE+':'+v.handNo])HSTART[CODE+':'+v.handNo]=Date.now();const i=v.seats.findIndex(p=>p&&p.uid===UID),me=i>=0?v.seats[i]:null;
 if(me&&v.mode!=='sng'){P.inPlay={code:CODE,stack:me.stack+(H.inBetting(v)&&me.inHand?0:0)};}
 if(v.phase==='showdown'&&me&&me.inHand&&!P.counted[CODE+':'+v.handNo]){P.counted[CODE+':'+v.handNo]=1;P.hands++;P.xp+=2;const R=v.results;const w=R.pots.filter(pt=>pt.winners.includes(i));if(w.length){const amt=w.reduce((a,pt)=>a+Math.floor(pt.amount/pt.winners.length),0);P.won++;P.xp+=10;P.best=Math.max(P.best,amt);winCard(amt,me.contrib||0,w[0].hand,v)}
  const ks=Object.keys(P.counted);if(ks.length>300)ks.slice(0,ks.length-300).forEach(k=>delete P.counted[k]);saveP()}
 if(v.phase==='finished'&&!P.paid[CODE]){const pl=(v.places||[]).find(x=>x.uid===UID);if(pl){P.paid[CODE]=1;P.xp+=pl.place===1?120:pl.prize?50:10;if(pl.place===1)P.tWins++;if(pl.prize){toast(`${['','1st','2nd','3rd'][pl.place]||pl.place+'th'} place · ${U(pl.prize,v)||fmt(pl.prize)+' chips'}`);if(v.money)ledger({type:'prize',usd:Math.floor(pl.prize*v.money.usd/v.buyin*100)/100,status:'paid by the bank',memo:v.name})}saveP();showFinished(v)}}
 render()}
let HSTART={};function winCard(amt,put0,hand,v){const k=CODE+':'+v.handNo,t0=HSTART[k]||Date.now()-30000,secs=Math.max(1,Math.round((Date.now()-t0)/1000)),profit=amt-put0,pct=put0?profit/put0*100:0;
 const el=$('#wincard');el.innerHTML=`<div class="wc-h">pot won <svg viewBox="0 0 24 24"><path d="M12 2l2.4 2.1 3.2-.3.7 3.1 2.8 1.6-1.3 2.9 1.3 2.9-2.8 1.6-.7 3.1-3.2-.3L12 22l-2.4-2.1-3.2.3-.7-3.1-2.8-1.6L4.2 12 2.9 9.1l2.8-1.6.7-3.1 3.2.3z" fill="#d4a63a"/><path d="M8 12.5l2.6 2.5L16 9.5" fill="none" stroke="#fff" stroke-width="2"/></svg></div>
  <div class="wc-big"><span class="wc-coin"></span><span id="wcN">0</span></div><div class="wc-d"><span class="up">+${M(profit,v)}</span>${put0?`<span class="chipup">+${pct.toFixed(0)}%</span>`:''}</div>
  <div class="wc-s">${hand?'won with <b>'+esc(hand)+'</b>':'everyone else folded'}</div><div class="wc-row"><span>hand took</span><b>${secs} seconds</b></div>`;
 el.classList.remove('on');void el.offsetWidth;el.classList.add('on');const n=$('#wcN'),t1=performance.now();(function f(x){const k2=Math.min(1,(x-t1)/900),e=1-Math.pow(1-k2,3);n.textContent=fmt(Math.round(amt*e));if(k2<1)requestAnimationFrame(f)})(t1);
 confetti();snd(880,.12);setTimeout(()=>snd(1320,.18),120);clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),4200)}
function confetti(){const c=document.createElement('canvas');c.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:70';document.body.appendChild(c);const d=devicePixelRatio;c.width=innerWidth*d;c.height=innerHeight*d;const x=c.getContext('2d');x.scale(d,d);
 const Q=Array.from({length:110},()=>({x:innerWidth/2,y:innerHeight*.55,vx:(Math.random()-.5)*13,vy:-Math.random()*13-4,r:Math.random()*6+3,c:['#58bc89','#22e07a','#fff','#e7c873','#b6f5d0'][Math.random()*5|0],a:Math.random()*6}));let n=0;
 (function f(){x.clearRect(0,0,innerWidth,innerHeight);Q.forEach(p=>{p.vy+=.34;p.x+=p.vx;p.y+=p.vy;p.a+=.2;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});if(++n<120)requestAnimationFrame(f);else c.remove()})()}
// fondo de ciudad con efectos (lluvia neón, luciérnagas, chispas, reflectores, linternas, estrellas)
let SCN=-1;function scene(vi){if(vi===SCN)return;SCN=vi;const v=VENUES[vi]||VENUES[0],el=$('#scene');el.style.setProperty('--glow',v.glow);$('#room').style.setProperty('--felt',v.felt);$('#room').style.setProperty('--glow',v.glow);el.querySelector('.cname').textContent=v.room}
async function payout(){const v=V;if(!v||!v.money||v.hostUid!==UID)return;const list=(v.places||[]).filter(pl=>pl.prize>0).map(pl=>{const s2=v.seats.find(x=>x&&x.uid===pl.uid);return{to:s2&&s2.wallet,usd:Math.floor(pl.prize*v.money.usd/v.buyin*100)/100,name:pl.name}}).filter(x=>x.to&&x.to!==v.money.bank);
 const b=$('[data-payout]');if(!list.length){G.payout='host';commit();return toast('you won it: the prize is already in your wallet')}b.disabled=true;b.textContent='approve in Phantom…';
 try{const sig=await payTo(list,`suited:${CODE}:payout`,v.money.net);G.payout=sig;ledger({type:'payout',usd:list.reduce((a,x)=>a+x.usd,0),sig,net:v.money.net,memo:'prizes '+v.name});commit();showFinished(H.publicView(G));toast('winners paid')}
 catch(e){b.disabled=false;b.textContent='pay winners';toast('payout failed: '+e.message)}}
function showFinished(v){showOver(`<h3>${esc(v.name)} · final results</h3><p>prize pool ${U(v.prize,v)||fmt(v.prize)+' chips'}${v.money?` · ${esc(v.bank||'the host')} pays the winners below`:''}</p><div class="places">${v.places.map(pl=>`<div class="${pl.uid===UID?'me':''}"><span>${pl.place}. ${esc(pl.name)}</span><b class="m">${pl.prize?'+'+(U(pl.prize,v)||fmt(pl.prize)):'—'}</b></div>`).join('')}</div>${v.money?(v.payout?`<p style="color:var(--g);margin:0 0 12px">winners paid ✓ ${v.payout!=='host'?`· <a href="${scan(v.payout,v.money.net)}" target="_blank" rel="noopener" style="color:var(--g)">view on Solscan</a>`:''}</p>`:v.hostUid===UID?`<button class="btn w" data-payout style="margin-bottom:8px">pay winners · one approval in Phantom</button>`:`<p style="margin:0 0 12px">waiting for ${esc(v.bank||'the host')} to send the prizes…</p>`):''}<button class="btn w ${v.money&&!v.payout&&v.hostUid===UID?'gh':''}" data-back>back to lobby</button>`)}

const SUIT={s:'♠︎',h:'♥︎',d:'♦︎',c:'♣︎'};
function cardH(c,cls=''){if(c==null)return`<div class="card back ${cls}"></div>`;const r=H.RANKS[c%13],s=H.SUITS[Math.floor(c/13)];return`<div class="card ${s==='h'||s==='d'?'red':''} ${cls}"><span class="r">${r==='T'?'10':r}</span><span class="c">${SUIT[s]}</span><span class="s">${SUIT[s]}</span></div>`}
// dibujo por piezas: solo se toca lo que cambió (nada parpadea)
const CACHE=new Map();function put(el,h){if(CACHE.get(el)!==h){CACHE.set(el,h);el.innerHTML=h;return true}return false}
const NODES={seats:[],bets:[],sits:[],board:[]};
function ensureNodes(){if(NODES.seats.length)return;const L=$('#layer');for(let i=0;i<9;i++){const s=document.createElement('div');s.className='seat';s.innerHTML='<div class="hc"></div><div class="av"><span class="ava" style="width:100%;height:100%"></span><span class="lv"></span></div><span class="tag" style="display:none"></span><div class="plate"><div class="nm"></div><div class="st"></div></div><div class="hn"></div>';L.appendChild(s);NODES.seats.push(s);
 const b=document.createElement('div');b.className='bet';L.appendChild(b);NODES.bets.push(b);const t=document.createElement('button');t.className='sit';t.dataset.sit=i;t.textContent='sit';L.appendChild(t);NODES.sits.push(t)}
 const B=$('#board');for(let k=0;k<5;k++){const d=document.createElement('div');B.appendChild(d);NODES.board.push(d)}
 const d=document.createElement('div');d.className='dealer';d.textContent='D';d.id='dealer';L.appendChild(d)}
function render(){if(!CODE)return;const v=HOST&&G?H.publicView(G):G;if(!v)return;ensureNodes();V=v;scene(v.venue);
 const ven=VENUES[v.venue]||VENUES[0];
 put($('#rtop'),`<button class="pill" data-copy><svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>invite · <span class="m">${CODE}</span></button><button class="pill" data-mute>${st.get('mute',0)?'sound off':'sound on'}</button>`);
 const lvLeft=v.mode==='sng'&&v.started?Math.max(0,v.levelMs-((Date.now()-v.levelAt)%v.levelMs)):0;
 const isHost=v.hostUid===UID,paidList=v.money?v.seats.filter(Boolean).map(p=>`<div class="pr ${v.paid&&v.paid[p.uid]?'ok':''}"><i>${v.paid&&v.paid[p.uid]?(v.paid[p.uid]==='host'?'bank':'paid ✓'):'…'}</i><span>${esc(p.name)}</span></div>`).join(''):'';
 const cashPend=v.money?(v.cashouts||[]).filter(c=>!c.sig):[];
 put($('#hud'),`${v.money?`<div class="chip2 bank">${v.mode==='sng'?`<b>${PRICING.fmtUsd(v.money.usd*v.seats.filter(Boolean).length)}</b> prize pool · entry ${PRICING.fmtUsd(v.money.usd)}`:`buy-in <b>${PRICING.fmtUsd(v.money.usd)}</b> = ${fmt(v.buyin)} chips`} · bank: ${esc(v.bank||'host')} · ${v.money.net==='mainnet'?'USDC':'test USDC'}${paidList&&v.mode==='sng'?`<div class="plist">${paidList}</div>`:''}</div>`:''}<div class="chip2">${esc(v.name)}</div><div class="chip2">${ven.room} · blinds <b>${short(v.sb)}/${short(v.bb)}</b></div>${v.mode==='sng'?`<div class="chip2">level ${v.level+1}${v.started?` · next in ${Math.floor(lvLeft/60000)}:${String(Math.floor(lvLeft/1000)%60).padStart(2,'0')}`:''}</div><div class="chip2">${v.seats.filter(p=>p&&!p.out).length} players left</div>`:''}`);
 const mob=innerWidth<=820,my=v.seats.findIndex(p=>p&&p.uid===UID),rot=my>=0?my:0,fr=$('#rail').getBoundingClientRect(),cx=fr.left+fr.width/2,cy=fr.top+fr.height/2;
 const Pp=i=>{const a=(90+((i-rot+9)%9)*40)*Math.PI/180;return{x:cx+fr.width/2*(mob?1.02:1.0)*Math.cos(a),y:cy+fr.height/2*(mob?1.0:1.04)*Math.sin(a)}};
 const Bp=i=>{const a=Pp(i);return{x:a.x+(cx-a.x)*.4,y:a.y+(cy-a.y)*.38}};
 const Rs=v.results,show=v.phase==='showdown'&&Rs,winners=new Set(show?Rs.pots.flatMap(p=>p.winners):[]),winCards=new Set(show?Rs.pots.flatMap(p=>p.cards||[]):[]);
 if(H.inBetting(v)&&v.toAct===my&&prevTurn!==v.handNo*100+v.board.length*10+(v.curBet>0?1:0)){prevTurn=v.handNo*100+v.board.length*10+(v.curBet>0?1:0);sTurn()}
 v.seats.forEach((p,i)=>{const s=NODES.seats[i],b=NODES.bets[i],sit=NODES.sits[i],a=Pp(i);
  sit.style.display=!p&&my<0&&!(v.mode==='sng'&&v.started)?'grid':'none';sit.style.left=a.x+'px';sit.style.top=a.y+'px';
  if(!p){s.style.display='none';b.style.opacity=0;return}
  s.style.display='flex';s.style.left=a.x+'px';s.style.top=a.y+'px';
  const me=p.uid===UID,turn=v.toAct===i&&H.inBetting(v),shown=show&&Rs.shown&&Rs.shown[i];
  s.className=`seat ${turn?'turn':''} ${p.folded&&p.inHand?'fold':''} ${p.sitout||p.out?'away':''} ${winners.has(i)&&show?'win':''}`;
  let cards='';if(p.inHand&&!p.folded&&v.phase!=='waiting'&&v.phase!=='finished'){if(shown)cards=shown.map(c=>cardH(c,winCards.size&&!winCards.has(c)?'dim':winCards.has(c)?'win':'')).join('');else if(me&&HOLE&&HOLE.hand===v.handNo)cards=HOLE.cards.map(c=>cardH(c)).join('');else cards=cardH(null)+cardH(null)}
  if(put(s.querySelector('.hc'),cards)&&cards){s.querySelectorAll('.hc .card').forEach(c=>c.classList.add('new'));sCard()}
  put(s.querySelector('.av .ava'),avaH(p.name,p.avatar,p.uid));put(s.querySelector('.av .lv'),String(p.lvl||1));
  s.querySelector('.av').style.setProperty('--t',turn?Math.max(0,(v.deadline-Date.now())/H.TURN_MS*100)+'%':'0%');
  put(s.querySelector('.nm'),esc(p.name)+(PUBS[p.uid]?'':' <span style="color:#666">· away</span>'));put(s.querySelector('.st'),`<span class="coin" style="width:11px;height:11px"></span>${M(p.stack,v)}`);
  const tg=s.querySelector('.tag');const tag=p.out?['out','aw']:p.allin&&p.inHand&&!p.folded?['all-in','']:winners.has(i)&&show?['winner','win']:p.sitout?['away','aw']:null;
  tg.style.display=tag?'block':'none';if(tag){tg.textContent=tag[0];tg.className='tag '+tag[1]}
  put(s.querySelector('.hn'),show&&Rs.hands&&Rs.hands[i]?esc(Rs.hands[i]):'');
  if(p.bet>0){const q=Bp(i);b.style.left=q.x+'px';b.style.top=q.y+'px';b.style.opacity=1;if(put(b,stack(p.bet)+`<span>${M(p.bet,v)}</span>`))sChip()}else{b.style.left=cx+'px';b.style.top=cy+'px';b.style.opacity=0}});
 const d=$('#dealer');if(v.button>=0&&v.seats[v.button]&&v.phase!=='waiting'){const a=Pp(v.button),q=Bp(v.button);d.style.display='grid';d.style.left=(a.x+(q.x-a.x)*.5+30)+'px';d.style.top=(a.y+(q.y-a.y)*.5)+'px'}else d.style.display='none';
 const bd=v.phase==='waiting'||v.phase==='finished'?[]:(v.board||[]);
 NODES.board.forEach((el,k)=>{const h=bd[k]!=null?cardH(bd[k],show&&winCards.size?(winCards.has(bd[k])?'win':'dim'):''):'<div class="card slot"></div>';if(put(el,h)&&bd[k]!=null){el.firstChild.classList.add('new');el.firstChild.style.animationDelay=(k<3&&bd.length===3?k*90:0)+'ms';sCard()}});
 const inMid=(v.pot||0)-v.seats.reduce((a,p)=>a+(p?p.bet:0),0),potShow=show?Rs.pots.reduce((a,p)=>a+p.amount,0):inMid;
 put($('#potw'),v.phase==='waiting'||v.phase==='finished'||!potShow?'':`${stack(potShow)}<span class="pot">pot ${M(potShow,v)}</span>`);
 put($('#msg'),esc(v.phase==='waiting'?(v.seats.filter(Boolean).length<2?(v.money&&v.mode==='sng'?'share the invite. the host starts the tournament when everyone is seated.':v.mode==='sng'?'waiting for players to register. starts with 2 or more.':'waiting for players. share the invite.'):(v.money&&v.mode==='sng'&&!v.go?'everyone seated? the host taps start.':v.mode==='sng'?'tournament starting…':'dealing…')):v.phase==='finished'?`${v.places?.[0]?.name||''} wins the tournament`:show?Rs.pots.map(pt=>`${pt.winners.map(i=>v.seats[i]?.name).join(' & ')} ${pt.winners.length>1?'split':'wins'} ${M(pt.amount,v)}${pt.hand?' · '+pt.hand:''}`).join('  ·  '):''));
 put($('#log'),(v.log||[]).slice(-16).reverse().map(t=>`<div>${esc(t)}</div>`).join(''));
 const mp=my>=0?v.seats[my]:null;
 const hostStart=(v.money&&v.mode==='sng'&&v.hostUid===UID&&!v.started&&!v.go?`<button class="pill" data-start style="background:var(--g);color:#03130a;border-color:var(--g)">start tournament · ${v.seats.filter(Boolean).length} players</button>`:'')+(v.money&&v.hostUid===UID&&cashPend.length?`<button class="pill" data-paycash style="background:#e7c873;color:#1a1405;border-color:#e7c873">pay cash-outs · ${cashPend.length} · ${PRICING.fmtUsd(cashPend.reduce((a,c)=>a+c.usd,0))}</button>`:'');
 put($('#mybar'),hostStart+(mp?`<button class="pill" data-leave>${v.mode==='sng'&&v.started&&!mp.out?'leave (forfeit)':'stand up'}</button>${v.mode!=='sng'&&mp.stack===0&&!(H.inBetting(v)&&mp.inHand&&!mp.folded)?`<button class="pill" data-rebuy>rebuy ${v.money?PRICING.fmtUsd(v.money.usd):short(v.buyin)}</button>`:''}${v.mode!=='sng'?`<button class="pill" data-sitout="${mp.sitout?0:1}">${mp.sitout?'i’m back':'sit out'}</button>`:''}`:''));
 actsUI(v,my)}
let actKey='';function actsUI(v,my){const el=$('#acts'),p=my>=0?v.seats[my]:null,on=!!p&&H.inBetting(v)&&v.toAct===my;el.classList.toggle('on',on);if(!on){actKey='';return}
 const toCall=v.curBet-p.bet,maxTo=p.bet+p.stack,minTo=Math.min(maxTo,v.curBet+v.minRaise),pot=v.pot;
 put($('#actHave'),`<i class="coin"></i><b>${M(p.stack,v)}</b> in front of you`);$('#tipAct').classList.toggle('off',!!st.get('tipAct',0));
 $('#bcall').textContent=toCall>0?(toCall>=p.stack?`all-in ${M(p.stack,v)}`:`call ${M(toCall,v)}`):'check';
 const k=v.handNo+'|'+v.phase+'|'+v.curBet+'|'+my,rr=$('#rr'),ra=$('#ra');
 if(k!==actKey){actKey=k;rr.min=minTo;rr.max=maxTo;rr.step=Math.max(1,v.sb);rr.value=minTo;ra.value=minTo;
  const o=[['min',minTo],['½ pot',v.curBet+Math.round((pot+toCall)/2)],['¾',v.curBet+Math.round((pot+toCall)*.75)],['pot',v.curBet+pot+toCall],['all-in',maxTo]].filter(([,x])=>x>=minTo&&x<=maxTo);
  $('#pre').innerHTML=o.map(([l,x])=>`<button data-to="${x}">${l}</button>`).join('')}
 const to=Math.max(minTo,Math.min(maxTo,+ra.value||minTo));rr.style.setProperty('--p',((to-minTo)/Math.max(1,maxTo-minTo)*100)+'%');
 $('#braise').textContent=maxTo<=v.curBet?'—':to>=maxTo?`all-in ${M(maxTo,v)}`:`${v.curBet===0?'bet':'raise to'} ${M(to,v)}`;$('#braise').disabled=maxTo<=v.curBet}
$('#rr').oninput=e=>{$('#ra').value=e.target.value;render()};$('#ra').oninput=()=>render();
function trySit(i){const v=V;if(!v)return;
 if(v.money){if(!P.wallet||P.wallet.kind!=='sol')return walletModal();
  if(v.hostUid===UID){send('sit',{seat:i,avatar:P.avatar,lvl:lvlOf(P.xp),wallet:P.wallet.addr});return}
  showOver(`<h3>${esc(v.name)}</h3><div class="bi-amt">${PRICING.fmtUsd(v.money.usd)}</div><p>${v.mode==='sng'?'tournament entry':'buy-in · you get '+fmt(v.buyin)+' chips'}${PRICING.fmtMxn(v.money.usd)?' · '+PRICING.fmtMxn(v.money.usd):''}. paid in ${v.money.net==='mainnet'?'USDC':'test USDC'} from your Phantom straight to ${esc(v.bank||'the host')}’s wallet (${shortW(v.money.bank)}). you’re seated as soon as it confirms.</p><button class="btn w" data-apay="${i}">pay ${PRICING.fmtUsd(v.money.usd)} &amp; take seat ${i+1}</button>`);return}
 send('sit',{seat:i,avatar:P.avatar,lvl:lvlOf(P.xp)})}
async function payAnd(type,seat,btn){const v=V;if(btn){btn.disabled=true;btn.textContent='approve in Phantom…'}
 try{const sig=await payTo([{to:v.money.bank,usd:v.money.usd}],`suited:${CODE}:${UID}:${type}`,v.money.net);ledger({type:type==='rebuy'?'rebuy':'buy-in',usd:v.money.usd,sig,net:v.money.net,memo:v.name});if(btn)btn.textContent='confirming…';
  send(type,{seat,avatar:P.avatar,lvl:lvlOf(P.xp),sig,wallet:P.wallet.addr});setTimeout(()=>$('#over').classList.remove('on'),1200);balance()}
 catch(e){if(btn){btn.disabled=false;btn.textContent='try again'}toast(/reject|cancel/i.test(e.message)?'payment cancelled':'payment failed: '+e.message)}}
async function payCash(){const v=V;if(!v||v.hostUid!==UID)return;const pend=(G.cashouts||[]).filter(c=>!c.sig&&c.wallet);if(!pend.length)return;
 try{const sig=await payTo(pend.map(c=>({to:c.wallet,usd:c.usd})),`suited:${CODE}:cashout`,v.money.net);pend.forEach(c=>c.sig=sig);ledger({type:'cash-outs',usd:pend.reduce((a,c)=>a+c.usd,0),sig,net:v.money.net,memo:v.name});commit();toast('cash-outs paid')}
 catch(e){toast(/reject|cancel/i.test(e.message)?'payment cancelled':'payment failed: '+e.message)}}
function standUp(){const v=V,i=v?v.seats.findIndex(p=>p&&p.uid===UID):-1;if(i>=0&&v.money&&v.mode==='cash'&&v.hostUid!==UID){const s=v.seats[i];if(s.stack>0){ledger({type:'cash-out',usd:Math.floor(s.stack*v.money.usd/v.buyin*100)/100,status:'paid by the bank',memo:v.name});toast(`cash-out ${U(s.stack,v)} · the bank sends it to your wallet`)}}P.inPlay=null;saveP();send('leave',{})}
function showOver(h){$('#overIn').innerHTML=h;$('#over').classList.add('on')}
document.addEventListener('click',e=>{const t=e.target;
 const s=t.closest('[data-sit]');if(s){trySit(+s.dataset.sit);return}
 const a=t.closest('[data-a]');if(a){st.set('tipAct',1);send('act',{a:a.dataset.a,amount:a.dataset.a==='raise'?+$('#ra').value:0});$('#acts').classList.remove('on');if(a.dataset.a!=='fold')sChip();return}
 const to=t.closest('[data-to]');if(to){$('#ra').value=to.dataset.to;render();return}
 if(t.closest('[data-copy]')){navigator.clipboard?.writeText(location.origin+location.pathname+'#t/'+CODE).then(()=>toast('invite link copied'));return}
 if(t.closest('[data-mute]')){st.set('mute',st.get('mute',0)?0:1);render();return}
 if(t.closest('[data-leave]')){standUp();return}
 if(t.closest('[data-rebuy]')){if(V.money&&V.hostUid!==UID)payAnd('rebuy',null,null);else send('rebuy',{});return}
 if(t.closest('[data-paycash]')){payCash();return}
 const ap=t.closest('[data-apay]');if(ap){const i=+ap.dataset.apay;if(V.seats[i])return toast('that seat was just taken, pick another');payAnd('sit',i,ap);return}
 if(t.closest('[data-payout]')){payout();return}
 const ms=t.closest('[data-msit]');if(ms){$('#over').classList.remove('on');send('sit',{seat:+ms.dataset.msit,avatar:P.avatar,lvl:lvlOf(P.xp)});return}
 if(t.closest('[data-start]')){send('start',{});return}
 const mp2=t.closest('[data-markpaid]');if(mp2){send('paid',{who:mp2.dataset.markpaid});return}
 if(t.closest('[data-practice]')){$('#over').classList.remove('on');const b=window.__buy;if(b)b.done({});return}
 const so=t.closest('[data-sitout]');if(so){send('sitout',{on:so.dataset.sitout==='1'});return}
 if(t.closest('[data-back]')){if(V&&V.seats.some(p=>p&&p.uid===UID)&&V.mode!=='sng')standUp();setTimeout(()=>{location.hash='#play';location.reload()},150);return}
 if(t.closest('[data-bonus]')){bonus();drawProfile();return}
 const q=t.closest('[data-quick]');if(q){quick(+q.dataset.quick);return}
 const op=t.closest('[data-open]');if(op){if(!needName())return;location.hash='#t/'+op.dataset.open;return}
 if(t.closest('[data-join]')){if(!needName())return;const c=$('#jcode').value.trim().toUpperCase();if(!/^[A-Z0-9]{6}$/.test(c))return toast('codes have 6 characters');location.hash='#t/'+c;return}
 if(t.closest('[data-mkpriv]')){if(!needName())return;const i=+$('#pvVenue').value,v=VENUES[i];createTable({name:$('#pvName').value.trim()||'private table',mode:'cash',venue:i,public:false,sb:v.sb,bb:v.bb,buyin:v.buy,money:{usd:PRICING.tiers[i].usd}});return}
 const en=t.closest('[data-entry]');if(en){st.set('entry',+en.dataset.entry);drawVenues();const ta=$('#tAmt');if(ta)ta.value=ENTRIES[+en.dataset.entry].usd;return}
 if(t.closest('[data-mkt]')){if(!needName())return;const e2=ENTRIES[+st.get('entry',0)];const stck=+$('#tStack').value;const real=$('#tMoney').value!=='practice';const usd=+$('#tAmt').value||e2.usd;if(real&&!(usd>0))return toast('type the entry amount');
  createTable({name:$('#tName').value.trim()||`${e2.k} sit & go`,mode:'sng',venue:Math.min(6,+$('#tCard').value||e2.tier),public:$('#tPub').value==='1',sb:Math.max(1,Math.round(stck/150)),bb:Math.max(2,Math.round(stck/75)),buyin:1000,stack:stck,levelMs:+$('#tSpeed').value,...(real?{money:{usd}}:{})});return}
 const cw=t.closest('[data-cw]');if(cw){connectWallet(cw.dataset.cw);return}
 if(t.closest('[data-wallet]')){if(P.wallet){if(confirm('disconnect '+shortW(P.wallet.addr)+'?')){P.wallet=null;saveP()}}else walletModal();return}
 if(t.closest('[data-setname]')){const n=$('#oName').value.trim();if(!n)return;P.name=n.slice(0,16);saveP();$('#over').classList.remove('on');if(CODE)enterTable(CODE);return}
 if(t.id==='over'&&!$('#oName')&&!CODE)$('#over').classList.remove('on')});
addEventListener('keydown',e=>{if(!$('#acts').classList.contains('on')||/INPUT/.test(document.activeElement.tagName))return;const k=e.key.toLowerCase();
 if(k==='f')$('[data-a="fold"]').click();else if(k==='c'||k===' '){$('#bcall').click();e.preventDefault()}else if(k==='r')$('#braise').click()});
addEventListener('resize',render);
function route(){const h=location.hash,m=h.match(/^#t\/([A-Z0-9]{6})$/i);if(m)return enterTable(m[1].toUpperCase());
 const pg=['play','tourneys','me'].includes(h.slice(1))?h.slice(1):'play';$$('.page').forEach(p=>p.classList.toggle('on',p.id==='pg-'+pg));$$('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===pg));
 if(pg==='me')drawProfile();scrollTo(0,0)}
addEventListener('hashchange',()=>{if(CODE||/^#t\//.test(location.hash))location.reload();else route()});
hdr();drawVenues();route();balance();PRICING.load().then(()=>{drawVenues()});
