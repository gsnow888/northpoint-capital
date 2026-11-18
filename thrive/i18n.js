/* Thrive by NorthPoint · idiomas (EN / ES)
   La app está escrita en inglés; este archivo la traduce en vivo al español: textos, placeholders, títulos y
   todo lo que se va pintando (operaciones, avisos, tiempos). Idioma: ?lang=es|en › elección guardada › idioma del navegador. */
(function () {
  const KEY = 'np.lang';
  const q = new URLSearchParams(location.search).get('lang');
  let saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
  const lang = (q === 'es' || q === 'en') ? q : saved || ((navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en');
  if (q) try { localStorage.setItem(KEY, q); } catch (e) {}

  const ES = {
    'welcome to thrive': 'bienvenido a thrive', 'follow any trader by wallet': 'sigue a cualquier trader por su wallet', 'paste a wallet (0x…)': 'pega una wallet (0x…)', 'name (optional)': 'nombre (opcional)', 'no open positions': 'sin posiciones abiertas', 'you’re not following anyone yet.': 'todavía no sigues a nadie.', 'paste a valid wallet address (0x + 40 characters)': 'pega una wallet válida (0x + 40 caracteres)', 'we sent a sign-in link to': 'te mandamos un link para entrar a', '. open it on this device and you’re in.': '. ábrelo en este dispositivo y listo.', '. practice money until you connect real funds.': '. dinero de práctica hasta que conectes fondos reales.', 'sign in to start trading with the best traders on Hyperliquid. it takes 10 seconds.': 'entra para operar junto a los mejores traders de Hyperliquid. toma 10 segundos.',
    'continue with Google': 'continuar con Google', 'or with your email': 'o con tu correo', 'send me a sign-in link': 'mándame un link para entrar', 'continue with email': 'continuar con correo',
    'or sign in with a crypto wallet': 'o entra con una wallet cripto', 'check your inbox': 'revisa tu correo', 'use another email': 'usar otro correo', 'sending…': 'enviando…', 'try again': 'intentar de nuevo',
    'no email? check spam, or wait a minute and try again.': '¿no llegó? revisa spam, o espera un minuto e inténtalo de nuevo.', 'type a valid email': 'escribe un correo válido',
    'too many attempts, wait a minute and try again': 'demasiados intentos, espera un minuto e inténtalo de nuevo', 'that link expired. ask for a new one.': 'ese link expiró. pide uno nuevo.',
    'practice money until you connect real funds.': 'dinero de práctica hasta que conectes fondos reales.', 'by continuing you accept the': 'al continuar aceptas los', 'terms': 'términos', 'and': 'y', 'privacy policy': 'aviso de privacidad',
    // ---------- clanes, perfil FOMO, panel trench, tutorial ----------
    'clans': 'clanes', 'new': 'nuevo', 'see all ›': 'ver todos ›', 'your rank': 'tu puesto', 'outside the top': 'fuera del top', 'sign in': 'entrar',
    'teams of traders competing together. combined PnL is the sum of members’ real Hyperliquid PnL.': 'equipos de traders que compiten juntos. el PnL combinado es la suma del PnL real en Hyperliquid de sus miembros.',
    'create a clan': 'crear un clan', 'clan name': 'nombre del clan', 'create': 'crear', 'join': 'unirme', 'leave clan': 'salir del clan', 'thrive clans': 'clanes de thrive',
    'clan': 'clan', 'members': 'miembros', 'combined PnL 24h': 'PnL combinado 24h', 'no clans yet. be the first to create one.': 'todavía no hay clanes. sé el primero en crear uno.',
    'Hyperliquid vaults': 'vaults de Hyperliquid', 'real strategies run by a leader with depositors': 'estrategias reales de un líder con depositantes', 'vault': 'vault', 'leader': 'líder',
    'loading clans…': 'cargando clanes…', 'you joined the clan': 'te uniste al clan', 'you left the clan': 'saliste del clan', 'that name or tag is taken': 'ese nombre o tag ya existe',
    'name 3–30 characters, tag 2–5 letters or numbers': 'nombre de 3 a 30 caracteres, tag de 2 a 5 letras o números',
    'followers': 'seguidores', 'trades': 'trades', '30d rank': 'puesto 30d', 'copy address': 'copiar dirección', 'labeled entity': 'entidad etiquetada', 'hypurrscan': 'hypurrscan',
    'loading official data from Hyperliquid…': 'cargando datos oficiales de Hyperliquid…', 'positions': 'posiciones', 'all': 'todo', 'perps': 'perps', 'asset': 'activo', 'position': 'posición',
    'reading positions…': 'leyendo posiciones…', 'no positions': 'sin posiciones', 'theses': 'tesis', 'real trades on Hyperliquid': 'trades reales en Hyperliquid', 'buy': 'compra', 'sell': 'venta',
    'no recent trades': 'sin trades recientes', 'no history for this period': 'sin historial en este periodo', 'PnL 7d': 'PnL 7d', 'PnL 30d': 'PnL 30d', 'PnL all time': 'PnL histórico',
    'volume 30d': 'volumen 30d', 'profile link copied': 'link del perfil copiado', 'copy profile link': 'copiar link del perfil', 'spot': 'spot',
    'this account is empty right now: no balance and no open positions on Hyperliquid.': 'esta cuenta está vacía ahora: sin saldo ni posiciones abiertas en Hyperliquid.',
    'available': 'disponible', 'up': 'sube', 'down': 'baja', 'long': 'long', 'short': 'short', 'amount': 'monto', 'max': 'máx', 'payout multiplier': 'multiplicador de pago',
    'details': 'detalles', 'tap to trade!': '¡toca para operar!', 'cash out whenever you want!': '¡cash out cuando quieras!', 'cash out': 'cash out', 'cash out complete': 'cash out realizado',
    'duration': 'duración', 'keep trading': 'seguir operando', 'practice money, real prices': 'dinero de práctica, precios reales', 'real trade on Hyperliquid': 'trade real en Hyperliquid',
    'replay the tutorial': 'repetir el tutorial', 'sign in with your wallet to create or join a clan': 'entra con tu wallet para crear o unirte a un clan', 'open position': 'abrir posición', 'skip': 'saltar', 'next': 'siguiente',
    'pick a market': 'elige un mercado', 'crypto, memecoins, stocks like NVIDIA and Apple, gold and oil. every price is live.': 'cripto, memecoins, acciones como NVIDIA y Apple, oro y petróleo. todos los precios son en vivo.',
    'watch the chart': 'mira el gráfico', 'the bubbles are real traders buying and selling right now. tap one to see their profile.': 'las burbujas son traders reales comprando y vendiendo ahora mismo. toca una para ver su perfil.',
    'up or down?': '¿sube o baja?', 'choose which way you think the price goes next.': 'elige hacia dónde crees que va el precio.',
    'choose an amount': 'elige un monto', 'slide or type how much to put in. you start with $10,000 of practice money.': 'desliza o escribe cuánto meter. empiezas con $10,000 de práctica.',
    'multiplies your gains, and your losses too. higher means riskier.': 'multiplica tus ganancias, y también tus pérdidas. más alto es más riesgo.',
    'tap to trade': 'toca para operar', 'one tap opens the position at the live price.': 'un toque abre la posición al precio en vivo.',
    'cash out whenever you want': 'cash out cuando quieras', 'your position shows here. tap the green button to take your profit.': 'tu posición aparece aquí. toca el botón verde para cobrar tu ganancia.',
    'follow the best': 'sigue a los mejores', 'see who is winning on Hyperliquid, join a clan and follow traders.': 'mira quién gana en Hyperliquid, únete a un clan y sigue traders.',
    'take the 1-minute tour': 'tour de 1 minuto', 'trading on the web, built around people, not just charts': 'trading en la web, hecho alrededor de personas, no solo gráficos',
    'trading on the web': 'trading en la web', 'for the rest of us': 'para todos los demás',
    // ---------- navegación y comunes ----------
    'tokens': 'tokens', 'perps': 'perps', 'indices & stocks': 'índices y acciones', 'leaderboard': 'clasificación', 'feed': 'feed', 'help': 'ayuda',
    'log in': 'entrar', 'start trading': 'empezar a operar', 'download app': 'descargar app', 'download on the': 'descárgala en', 'get it on': 'disponible en',
    'markets': 'mercados', 'chart': 'gráfico', 'trade': 'operar', 'practice': 'práctica', 'real': 'real', 'live': 'en vivo', 'LIVE': 'EN VIVO',
    'loading…': 'cargando…', 'retry': 'reintentar', 'done': 'listo', 'close': 'cerrar', 'cancel': 'cancelar', 'save': 'guardar', 'delete': 'borrar',
    'copy': 'copiar', 'connect': 'conectar', 'change': 'cambiar', 'check': 'revisar', 'got it': 'entendido', 'not now': 'ahora no', 'authorize': 'autorizar',
    'I accept': 'acepto', 'deposit': 'depositar', 'deposit more': 'depositar más', 'deposit on hyperliquid': 'depositar en hyperliquid', 'post': 'publicar',
    'follow': 'seguir', 'following': 'siguiendo', 'follow and get alerts': 'seguir y recibir alertas', 'view profile': 'ver perfil', 'view public profile': 'ver perfil público',
    'sign in': 'entrar', 'sign out': 'cerrar sesión', 'sign in to post': 'entra para publicar', 'sign in to thrive': 'entra a thrive', 'sign in with your wallet': 'entra con tu wallet',
    // ---------- terminal: listas y filtros ----------
    'trending': 'en tendencia', 'new': 'nuevos', 'top volume': 'más volumen', 'graduated': 'graduados', 'favorites': 'favoritos', 'volume': 'volumen',
    'gainers': 'ganadores', 'losers': 'perdedores', 'leverage': 'apalancamiento', 'stocks': 'acciones', 'indices & ETFs': 'índices y ETFs', 'commodities': 'materias primas',
    'pre-IPO': 'pre-IPO', 'rates': 'bonos', 'forex': 'divisas', '24h': '24 h', '7 days': '7 días', '30 days': '30 días', 'all time': 'histórico',
    'thrive traders': 'traders de thrive', 'following only': 'solo seguidos', 'top today': 'top del día', 'entity': 'entidad', 'labeled entity': 'entidad etiquetada',
    'loading Solana tokens…': 'cargando tokens de Solana…', 'loading thrive traders…': 'cargando traders de thrive…', 'no results': 'sin resultados', 'no markets available': 'sin mercados disponibles',
    'tap the star on a token to save it here.': 'toca la estrella de un token para guardarlo aquí.', 'tap the star on a perp to save it here.': 'toca la estrella de un perp para guardarlo aquí.',
    'no thrive traders yet.': 'aún no hay traders en thrive.', 'to be the first on the board.': 'para ser el primero en la tabla.',
    'you’re not following anyone yet.': 'aún no sigues a nadie.', 'open the': 'abre la', ', open a profile and tap': ', entra a un perfil y toca',
    ': their trades will show up here and we’ll alert you in real time.': ': sus operaciones aparecerán aquí y te avisaremos en vivo.',
    'no recent trades': 'sin operaciones recientes', 'loading trades…': 'cargando operaciones…',
    // ---------- encabezado de mercado ----------
    'price': 'precio', '24h change': 'cambio 24 h', '24h vol': 'vol 24 h', 'market cap': 'cap. de mercado', 'liquidity': 'liquidez', '24h buys': 'compras 24 h',
    '24h traders': 'traders 24 h', 'open interest': 'interés abierto', '1h funding': 'funding 1 h', 'max leverage': 'apalanc. máx', 'loading market…': 'cargando mercado…',
    // ---------- gráfico ----------
    'candles': 'velas', 'line': 'línea', 'scroll to zoom · drag to move · double-click to reset': 'rueda para zoom · arrastra para mover · doble clic para reiniciar',
    'on chart:': 'en el gráfico:', 'my trades': 'mis operaciones', 'traders': 'traders', 'min size (>$1K)': 'tamaño mín. (>$1K)', 'local time': 'hora local',
    'loading candles…': 'cargando velas…', 'no candles for this market yet': 'aún no hay velas para este mercado', 'your entry': 'tu entrada', '→ back to live': '→ volver al vivo',
    'you (practice)': 'tú (práctica)', '· click to view wallet': '· clic para ver la wallet', 'buy': 'compra', 'sell': 'venta',
    'toggle market list  [ ]': 'mostrar/ocultar mercados  [ ]', 'focus chart  (f)': 'enfocar gráfico  (f)', 'toggle trade panel  ]': 'mostrar/ocultar panel  ]', 'reset layout': 'restablecer diseño', 'swap panels': 'intercambiar paneles',
    // ---------- paneles inferiores ----------
    'top traders': 'top traders', 'top trader positions': 'posiciones de top traders', 'theses': 'tesis', 'trades': 'operaciones', 'order book': 'libro de órdenes',
    'top 30 of the month + who you follow': 'top 30 del mes + los que sigues', 'trader': 'trader', 'side': 'lado', 'amount': 'monto', 'size': 'tamaño', 'time': 'hora',
    'position': 'posición', 'entry': 'entrada', 'unrealized PnL': 'PnL no realizado', 'lev.': 'apal.', 'liquidation': 'liquidación', 'bought': 'compró', 'sold': 'vendió',
    'net': 'neto', 'est. PnL': 'PnL estimado', 'last': 'última', 'long': 'long', 'short': 'short', 'waiting for trades…': 'esperando operaciones…',
    'reading real positions…': 'leyendo posiciones reales…', 'none of the top traders has an open position in this market right now.': 'ninguno de los top traders tiene posición abierta en este mercado ahora mismo.',
    'connecting to the order book…': 'conectando al libro de órdenes…', 'total': 'total', 'live · click a level to fill TP/SL': 'en vivo · clic en un nivel para TP/SL',
    'no theses on this market yet. be the first.': 'aún no hay tesis en este mercado. sé el primero.', 'thesis posted': 'tesis publicada', 'delete this thesis?': '¿borrar esta tesis?',
    'slow down: max 5 theses per minute': 'más despacio: máximo 5 tesis por minuto', 'neutral': 'neutral',
    // ---------- panel de operar ----------
    'margin': 'margen', 'USDC margin': 'margen USDC', 'to buy': 'a comprar', 'to sell': 'a vender', 'to buy (USD)': 'a comprar (USD)', 'to sell (USD)': 'a vender (USD)',
    'choose an amount': 'elige un monto', 'choose a margin': 'elige un margen', 'insufficient balance': 'saldo insuficiente', 'more than you have': 'más de lo que tienes',
    'more than you hold': 'más de lo que tienes', 'minimum $10 size': 'tamaño mínimo $10', 'not available in real': 'no disponible en real',
    'practice mode: real prices, simulated money': 'modo práctica: precios reales, dinero simulado', 'real mode': 'modo real',
    'you get approx.': 'recibes aprox.', 'you have': 'tienes', 'nothing': 'nada', 'available': 'disponible', 'est. liquidation': 'liquidación aprox.', 'est. fees': 'comisiones aprox.',
    'fee 0.045%': 'comisión 0.045%', 'fee 0.5%': 'comisión 0.5%', 'take profit (price)': 'take profit (precio)', 'stop loss (price)': 'stop loss (precio)',
    'wallet': 'wallet', 'SOL balance': 'saldo SOL', 'slippage': 'deslizamiento', 'route': 'ruta', 'jupiter (best price)': 'jupiter (mejor precio)', 'solana wallet': 'wallet de solana',
    'not connected': 'sin conectar', 'none': 'nada', 'connect Phantom': 'conectar Phantom', 'getting best route…': 'buscando la mejor ruta…', 'confirm in your wallet…': 'confirma en tu wallet…', 'sending…': 'enviando…',
    'your positions': 'tus posiciones', 'open': 'abiertas', 'closed': 'cerradas', 'no open positions': 'sin posiciones abiertas', 'no open real positions': 'sin posiciones reales abiertas',
    'you haven’t closed any trades yet': 'aún no cierras operaciones', 'open orders': 'órdenes abiertas', 'your real trade history is on your profile:': 'tu historial real está en tu perfil:',
    'liquidated': 'liquidado', 'opened long': 'abrió long', 'closed long': 'cerró long', 'opened short': 'abrió short', 'closed short': 'cerró short', 'flipped long': 'pasó a long', 'flipped short': 'pasó a short', 'traded': 'operó',
    'website': 'sitio web', 'official X': 'X oficial', 'search on X': 'buscar en X',
    // ---------- cuenta y modales ----------
    'deposit (practice)': 'depositar (práctica)', 'add simulated balance to practice with real prices. none of this is real money.': 'agrega saldo simulado para practicar con precios reales. nada de esto es dinero real.',
    'reset account': 'reiniciar cuenta', 'reset your practice account? your positions and history will be deleted.': '¿reiniciar tu cuenta de práctica? se borran tus posiciones e historial.',
    'your account': 'tu cuenta', 'practice mode · saved in this browser': 'modo práctica · se guarda en este navegador', 'realized PnL': 'PnL realizado', 'win rate': 'acierto',
    'closed trades': 'operaciones cerradas', 'traders followed': 'traders seguidos', 'practice PnL': 'PnL de práctica',
    'use your wallet. no email, no password. signing is free and never moves funds.': 'usa tu wallet. sin correo ni contraseña. firmar es gratis y nunca mueve fondos.',
    'Ethereum wallet': 'Wallet de Ethereum', 'Solana wallet': 'Wallet de Solana', 'MetaMask, Rabby, Coinbase Wallet…': 'MetaMask, Rabby, Coinbase Wallet…', 'Phantom, Solflare, Backpack…': 'Phantom, Solflare, Backpack…',
    'with an account you can post theses, appear on the thrive leaderboard and sync your follows, favorites and practice account across devices.': 'con una cuenta puedes publicar tesis, aparecer en la clasificación de thrive y sincronizar tus seguidos, favoritos y cuenta de práctica entre dispositivos.',
    'username (3–20 letters, numbers, _ or .)': 'usuario (3–20 letras, números, _ o .)', 'e.g. andre.trades': 'ej. andre.trades',
    'your follows, favorites, practice account and layout sync automatically to this account.': 'tus seguidos, favoritos, cuenta de práctica y diseño se sincronizan solos con esta cuenta.',
    'signed in as': 'entraste como', 'signed out': 'sesión cerrada', 'sign in failed:': 'no se pudo entrar:', 'sign the message in your wallet…': 'firma el mensaje en tu wallet…',
    'keyboard shortcuts': 'atajos de teclado', 'search tokens, perps or traders': 'busca tokens, perps o traders', 'buy / long': 'compra / long', 'sell / short': 'venta / short',
    'timeframe 1m · 5m · 15m · 1h · 4h · 1d': 'temporalidad 1m · 5m · 15m · 1h · 4h · 1d', 'candles ↔ line': 'velas ↔ línea', 'focus the chart': 'enfocar el gráfico',
    'show / hide market list': 'mostrar / ocultar mercados', 'show / hide trade panel': 'mostrar / ocultar panel de operar', 'previous / next market in the list': 'mercado anterior / siguiente',
    'reset chart zoom': 'reiniciar zoom', 'close panels': 'cerrar paneles', 'this help': 'esta ayuda',
    'drag the edges between panels to resize them; double-click an edge to reset it.': 'arrastra los bordes entre paneles para cambiar su tamaño; doble clic en un borde para reiniciarlo.',
    'alerts': 'alertas', 'enable browser notifications': 'activar notificaciones del navegador',
    'follow traders from the leaderboard and you’ll see every trade they make here, in real time.': 'sigue traders desde la clasificación y aquí verás cada operación que hagan, en vivo.',
    'search tokens, perps or traders (0x…)': 'busca tokens, perps o traders (0x…)', 'address': 'dirección', 'perps, indices & stocks': 'perps, índices y acciones', 'solana tokens': 'tokens de solana',
    'searching…': 'buscando…', 'no matches': 'sin coincidencias', 'address copied': 'dirección copiada', 'removed from favorites': 'quitado de favoritos',
    // ---------- modo real ----------
    'enable real trading': 'activar trading real', 'you trade from your own wallet on Hyperliquid. thrive never touches your money and can’t withdraw it.': 'operas desde tu propia wallet en Hyperliquid. thrive nunca toca tu dinero ni puede retirarlo.',
    'start trading real': 'empezar en real', 'install wallet': 'instalar wallet', 'trading key authorized': 'llave de operación autorizada', 'fee authorized': 'comisión autorizada',
    'sign in your wallet to authorize the key…': 'firma en tu wallet para autorizar la llave…', 'order sent': 'orden enviada', 'order canceled': 'orden cancelada',
    'order rejected:': 'orden rechazada:', 'couldn’t close:': 'no se pudo cerrar:', 'close this REAL position at market price?': '¿cerrar esta posición REAL a precio de mercado?',
    'filled': 'ejecutada', 'sent': 'enviado', 'view on solscan': 'ver en solscan', 'swap failed:': 'el swap falló:', 'Hyperliquid requires orders of at least $10 in size': 'Hyperliquid pide órdenes de al menos $10',
    'this market isn’t available in real mode yet': 'este mercado aún no está disponible en modo real', 'the amount is too small for this market': 'el monto es muy chico para este mercado',
    'Hyperliquid is busy, retry in a moment': 'Hyperliquid está ocupado, reintenta en un momento', 'no route found for this token': 'no hay ruta para este token',
    // ---------- perfil ----------
    'back to chart': 'volver al gráfico', 'account value': 'valor de cuenta', 'PnL 24h': 'PnL 24 h', 'PnL 7 days': 'PnL 7 días', 'PnL 30 days': 'PnL 30 días', 'PnL all time': 'PnL histórico',
    'PnL history': 'historial de PnL', 'open positions': 'posiciones abiertas', 'recent trades': 'operaciones recientes', 'market': 'mercado', 'closed PnL': 'PnL cerrado',
    'reading positions…': 'leyendo posiciones…', 'no trades': 'sin operaciones', 'live from Hyperliquid': 'en vivo desde Hyperliquid', 'no data': 'sin datos',
    'loading official history from Hyperliquid…': 'cargando historial oficial de Hyperliquid…', 'no PnL history for this period': 'sin historial de PnL en este periodo',
    'on thrive': 'en thrive', 'its trade history is below.': 'su historial está abajo.', 'it has no recent trades.': 'no tiene operaciones recientes.',
    // ---------- pie ----------
    'connected': 'conectado', 'positions': 'posiciones', 'language': 'idioma', 'favorite': 'favorito', 'sign in to thrive': 'entra a thrive', 'reconnecting': 'reconectando', 'data: hyperliquid · geckoterminal': 'datos: hyperliquid · geckoterminal',
    // ---------- landing ----------
    'on every screen': 'en todas tus pantallas', 'the full terminal.': 'la terminal completa.', 'right in your pocket.': 'también en tu bolsillo.',
    'open a position on your phone and close it on your computer, all from one account.': 'abre una posición en tu teléfono y ciérrala en tu computadora, todo en una sola cuenta.',
    'never miss a move': 'que nada se te escape', 'the trading app built around people, not just charts': 'la app de trading construida alrededor de las personas, no solo de gráficos',
    'climb the leaderboard and earn your spot': 'sube en la tabla y gánate tu lugar', 'discover and follow the traders who actually win': 'encuentra y sigue a los traders que sí ganan',
    'instant alerts on what the best are buying': 'avisos al instante de lo que compran los mejores', 'get started fast': 'empieza rápido', 'your account, ready in seconds': 'tu cuenta lista en segundos',
    'MetaMask · Rabby · Coinbase': 'MetaMask · Rabby · Coinbase', 'Phantom · Solflare · Backpack': 'Phantom · Solflare · Backpack', 'signature request': 'solicitud de firma',
    'Sign in to thrive.': 'Entra a thrive.', 'no fees · no funds moved': 'sin comisiones · no se mueven fondos', 'welcome, andre.trades': 'bienvenido, andre.trades',
    'no email': 'sin correo', 'no password': 'sin contraseña', 'signed in ~2s': 'entras en ~2 s', 'every market': 'todos los mercados',
    'memecoins, perps, indices and stocks in one place': 'memecoins, perps, índices y acciones en un solo lugar', 'live prices': 'precios en vivo',
    'self-custody': 'sin custodia', 'trade for real from your wallet, or practice for free': 'opera real desde tu wallet, o practica gratis', 'max': 'máx',
    'connect wallet': 'conectar wallet', 'practice with $10,000': 'practicar con $10,000', 'a trading app': 'una app de trading', 'for the rest of us': 'para todos nosotros',
    'join the traders who trade together, follow each other and share every move in real time.': 'únete a los traders que operan juntos, se siguen y comparten cada movimiento en vivo.',
    'real 24h PnL on Hyperliquid': 'PnL real de 24 h en Hyperliquid', 'product': 'producto', 'terminal': 'terminal', 'social feed': 'feed social', 'install app': 'instalar app',
    'nasdaq 100': 'nasdaq 100', 'bitcoin': 'bitcoin', 'solana memecoins': 'memecoins de solana', 'learn': 'aprende', 'help center': 'centro de ayuda', 'trading for real': 'operar en real',
    'fees': 'comisiones', 'company': 'empresa', 'about': 'nosotros', 'contact': 'contacto', 'legal': 'legal', 'terms': 'términos', 'privacy': 'privacidad', 'risk disclosure': 'aviso de riesgo', 'risk': 'riesgo',
    'trading perpetuals and crypto assets involves risk of loss. past performance does not guarantee future results.': 'operar perpetuos y criptoactivos implica riesgo de pérdida. el desempeño pasado no garantiza resultados futuros.',
    '© 2026 Thrive by NorthPoint · a NorthPoint Capital project': '© 2026 Thrive by NorthPoint · un proyecto de NorthPoint Capital',
    'install Thrive by NorthPoint': 'instala Thrive by NorthPoint', 'the full terminal on your home screen. no app store needed.': 'la terminal completa en tu pantalla de inicio. sin tiendas de apps.',
    'on iPhone or iPad': 'en iPhone o iPad', 'on Android or desktop': 'en Android o computadora', 'open this page in': 'abre esta página en', 'tap the': 'toca el botón',
    'share': 'compartir', 'button': '', 'choose': 'elige', 'add to home screen': 'agregar a inicio', 'open the browser menu': 'abre el menú del navegador',
    // nombres de mercados
    'gold': 'oro', 'silver': 'plata', 'WTI crude': 'petróleo WTI', 'brent crude': 'petróleo brent', 'copper': 'cobre', 'natural gas': 'gas natural', 'platinum': 'platino', 'palladium': 'paladio',
    'japanese yen': 'yen japonés', 'euro': 'euro', 'US 2-year treasury': 'bono EE.UU. a 2 años', 'US 10-year treasury': 'bono EE.UU. a 10 años', 'US 30-year treasury': 'bono EE.UU. a 30 años',
    'gold miners ETF': 'ETF de mineras de oro', 'semiconductor ETF': 'ETF de semiconductores', 'software ETF': 'ETF de software', 'semiconductors 3× ETF': 'ETF semiconductores 3×',
    'south korea 3× ETF': 'ETF Corea del Sur 3×', 'crypto market cap ex-BTC': 'cap. cripto sin BTC', 'altcoins index': 'índice de altcoins', 'bitcoin dominance': 'dominancia de bitcoin', 'bitcoin volatility index': 'índice de volatilidad de bitcoin'
  };
  // frases con datos variables
  const RX = [
    [/^following (.+)$/, 'siguiendo a $1'], [/^×(\d+) max$/, '×$1 máx'], [/^tap follow on any trader in the leaderboard, or paste their wallet above\.$/, 'toca seguir en cualquier trader de la clasificación, o pega su wallet arriba.'],
    [/^we sent a sign-in link to (.+)\. open it on this device and you’re in\.$/, 'te mandamos un link a $1. ábrelo en este dispositivo y listo.'], [/^welcome, (.+)$/, 'bienvenido, $1'], [/^welcome$/, 'bienvenido'],
    [/^(.+) · practice money, real prices$/, '$1 · dinero de práctica, precios reales'], [/^(.+) · real trade on Hyperliquid$/, '$1 · trade real en Hyperliquid'],
    [/^(.+) · closed short · (.+)$/, '$1 · cerró short · $2'], [/^(.+) · closed long · (.+)$/, '$1 · cerró long · $2'], [/^(.+) · opened (long|short) · (.+)$/, '$1 · abrió $2 · $3'],
    [/^step (\d+) of (\d+)$/, 'paso $1 de $2'], [/^if (.+) moves 1% your way$/, 'si $1 se mueve 1% a tu favor'], [/^if (.+) rises 1%$/, 'si $1 sube 1%'],
    [/^(\d+) seconds$/, '$1 segundos'], [/^(\d+) minutes$/, '$1 minutos'], [/^([\d.]+) hours$/, '$1 horas'], [/^([\d.]+) days$/, '$1 días'], [/^avg hold (.+)$/, 'retención prom. $1'],
    [/^(.+) recent trades$/, '$1 trades recientes'], [/^active since (.+)$/, 'activo desde $1'], [/^(\d+) perps · (\d+) tokens · exposure (.+)$/, '$1 perps · $2 tokens · exposición $3'],
    [/^you are in$/, 'estás en'], [/^clan created: (.+)$/, 'clan creado: $1'], [/^start trading$/, 'empezar a operar'],
    [/^(\d+[smhd]) ago$/, 'hace $1'], [/^(.+?) · (\d+[smhd]) ago$/, '$1 · hace $2'], [/^(\d+[smhd]) ago · (.+)$/, 'hace $1 · $2'],
    [/^real PnL on Hyperliquid · updated (\d+[smhd]) ago$/, 'PnL real en Hyperliquid · actualizado hace $1'], [/^real PnL on Hyperliquid$/, 'PnL real en Hyperliquid'],
    [/^account (.+) · ROI (.+)$/, 'cuenta $1 · ROI $2'], [/^(\d+) markets · 24\/7 perpetuals on Hyperliquid$/, '$1 mercados · perpetuos 24/7 en Hyperliquid'],
    [/^\((\d+) wallets in the last (\d+) trades\)$/, '($1 wallets en las últimas $2 operaciones)'], [/^(\d+)\+ markets$/, '$1+ mercados'],
    [/^(\d+) traders on thrive · ranked by Hyperliquid account value$/, '$1 traders en thrive · ordenados por valor de cuenta en Hyperliquid'],
    [/^(.+) · (\d+) theses$/, '$1 · $2 tesis'], [/^(\d+) · exposure (.+)$/, '$1 · exposición $2'], [/^#(\d+) on the 30-day leaderboard · (.*)$/, '#$1 en la clasificación de 30 días · $2'],
    [/^ROI (.+) · vol (.+)$/, 'ROI $1 · vol $2'], [/^vol (.+)$/, 'vol $1'], [/^perps (.+) · rest in spot\/vaults$/, 'perps $1 · el resto en spot/vaults'],
    [/^about (.+)$/, 'acerca de $1'], [/^buy (\S+)$/, 'comprar $1'], [/^sell (\S+)$/, 'vender $1'], [/^buy (\S+) · REAL$/, 'comprar $1 · REAL'], [/^sell (\S+) · REAL$/, 'vender $1 · REAL'],
    [/^you don’t have (\S+)$/, 'no tienes $1'], [/^you don’t hold (\S+)$/, 'no tienes $1'], [/^your (\S+)$/, 'tu $1'],
    [/^you bought (.+) of (.+) at (.+)$/, 'compraste $1 de $2 a $3'], [/^you sold (.+) of (.+) · $/, 'vendiste $1 de $2 · '], [/^you closed (.+):$/, 'cerraste $1:'],
    [/^practice deposit: (.+)$/, 'depósito de práctica: $1'], [/^(.+) saved to favorites$/, '$1 guardado en favoritos'], [/^you unfollowed (.+)$/, 'dejaste de seguir a $1'],
    [/^you’re now following$/, 'ahora sigues a'], [/^\. we’ll alert you on every trade\.$/, '. te avisaremos de cada operación.'], [/^username saved:$/, 'usuario guardado:'],
    [/^what's your thesis on (.+)\? entry, target, why…$/, '¿cuál es tu tesis sobre $1? entrada, objetivo, por qué…'], [/^share your view on (.+) with every trader watching it\.$/, 'comparte tu visión sobre $1 con todos los que lo siguen.'],
    [/^· (\d+) trades$/, '· $1 operaciones'], [/^spread (.+)$/, 'spread $1'], [/^size \((.+)\)$/, 'tamaño ($1)'], [/^(\d+) traders followed$/, '$1 traders seguidos'],
    [/^up to (\S+)$/, 'hasta $1'], [/^(.+) · perpetual on Hyperliquid(.*)$/, '$1 · perpetuo en Hyperliquid$2'], [/^hyperliquid(.*) · 24\/7 perpetual$/, 'hyperliquid$1 · perpetuo 24/7'],
    [/^(.+) perpetual$/, '$1 perpetuo'], [/^updated (.+) ago$/, 'actualizado hace $1'], [/^sign in with (\S+)$/, 'entra con $1'],
    [/^this account is empty right now: no balance and no open positions on Hyperliquid\.(.*)$/, 'esta cuenta está vacía ahora: sin saldo ni posiciones abiertas en Hyperliquid.$1'],
    [/^(\d+) theses$/, '$1 tesis'], [/^([\d:]+) local time$/, '$1 hora local'], [/^(.+) cash$/, '$1 efectivo'], [/^(.+) available$/, '$1 disponible'], [/^long (\S+) (\d+×)$/, 'long $1 $2'], [/^short (\S+) (\d+×)$/, 'short $1 $2'], [/^(.+) on X$/, '$1 en X']
  ];
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'CODE', 'svg', 'SVG']);
  function tr(s) {
    const t = s.trim(); if (!t || t.length > 400) return s;
    let r = ES[t];
    if (r === undefined) { for (const [re, rep] of RX) { if (re.test(t)) { r = t.replace(re, rep); break; } } }
    if (r === undefined || r === t) return s;
    return s.replace(t, r);
  }
  function node(n) {
    if (n.nodeType === 3) { const p = n.parentNode; if (!p || SKIP.has(p.nodeName) || p.closest?.('[data-noi18n]')) return; const v = n.nodeValue, w = tr(v); if (w !== v) n.nodeValue = w; return; }
    if (n.nodeType !== 1 || SKIP.has(n.nodeName)) return;
    for (const a of ['placeholder', 'title', 'aria-label']) { const v = n.getAttribute && n.getAttribute(a); if (v) { const w = tr(v); if (w !== v) n.setAttribute(a, w); } }
    if (n.nodeName === 'INPUT' && (n.type === 'button' || n.type === 'submit') && n.value) n.value = tr(n.value);
    const it = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let c; while ((c = it.nextNode())) { if (c.nodeType === 3) node(c); else if (!SKIP.has(c.nodeName)) { for (const a of ['placeholder', 'title', 'aria-label']) { const v = c.getAttribute(a); if (v) { const w = tr(v); if (w !== v) c.setAttribute(a, w); } } } }
  }
  // selector EN | ES (cualquier elemento con data-langtoggle)
  function toggles() {
    document.querySelectorAll('[data-langtoggle]').forEach(el => {
      if (el.dataset.done) return; el.dataset.done = 1; el.setAttribute('data-noi18n', '');
      el.innerHTML = ['en', 'es'].map(l => `<button type="button" data-setlang="${l}" class="${l === lang ? 'on' : ''}" aria-pressed="${l === lang}">${l.toUpperCase()}</button>`).join('');
    });
  }
  document.addEventListener('click', e => { const b = e.target.closest('[data-setlang]'); if (!b) return; try { localStorage.setItem(KEY, b.dataset.setlang); } catch (x) {} const u = new URL(location.href); u.searchParams.delete('lang'); location.replace(u.toString()); });
  window.I18N = { lang, t: s => (lang === 'es' ? tr(s) : s) };
  function start() {
    toggles();
    if (lang !== 'es') return;
    document.documentElement.lang = 'es';
    document.title = tr(document.title).replace('Terminal', 'Terminal');
    node(document.body);
    new MutationObserver(ms => { for (const m of ms) { if (m.type === 'characterData') node(m.target); else { m.addedNodes.forEach(node); if (m.type === 'attributes') node(m.target); } } toggles(); })
      .observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
