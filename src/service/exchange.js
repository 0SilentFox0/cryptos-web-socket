const handlers = new Set();

const API_KEY = 'a801944ea45390b52bc89d39048e2e91eb76b783348479d27de39ad0d56b273f';
const CRYPTOS = {
    BTC: "Bitcoin",
    ETH: "Ethereum",
    XRP: "Ripple",
    LTC: "Lightcoin",
    BCH: "Bitcoin Cash",
    LINK: "Chainlink",
    XLM: "Stellar",
    WBTC: "Wrapped Bitcoin",
    EOS: "EOS",
    UNI: "Uniswap",
    AAVE: "Aave",
    XTZ: "Tezos",
    ATOM: "Cosmos",
    DAI: "Dai",
    MKR: "Maker",
};
export default CRYPTOS;


let ws;
export function connect(tickers) {
    ws = new WebSocket(`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`);
    ws.addEventListener("open", () => {
        const subs = Array.from(tickers).map(
            (ticker) => `0~Coinbase~${ticker}~USD`
        );
        ws.send(
            JSON.stringify({
                action: "SubAdd",
                subs
            })
        );
    });
    
    ws.addEventListener("error", () => {
        connect();
    });
    
    ws.addEventListener("message", (e) => {
        handlers.forEach((h) => h(JSON.parse(e.data)));
    });
}

export function subscribe(fn) {
    handlers.add(fn);
    return function unsubscribe() {
        handlers.delete(fn);
    };
}
