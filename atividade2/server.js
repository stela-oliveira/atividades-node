import { createServer } from 'node:http';
import { URL } from 'node:url';

const hostname = 'localhost';
const port = 3000;
let count = 0;

// função primo
function isPrime(n) {
  if (!Number.isInteger(n) || n < 2) return null;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

// função CoinGecko
async function fetchBitcoinPrice(currency) {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Bitcoin price');
  const data = await response.json();
  return data.bitcoin[currency];
}

const server = createServer(async (req, res) => {
  const { method, url: reqUrl } = req;
  const parsedUrl = new URL(reqUrl, `http://${hostname}:${port}`);
  const pathname = parsedUrl.pathname;
  const query = Object.fromEntries(parsedUrl.searchParams);

  res.setHeader('Content-Type', 'application/json');

  // GET /health-check
  if (pathname === '/health-check' && method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
  }

  // GET /is-prime-number
  if (pathname === '/is-prime-number' && method === 'GET') {
    const number = parseInt(query.number, 10);
    if (isNaN(number)) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: 'Invalid input' }));
    }
    const result = isPrime(number);
    if (result === null) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: 'Invalid input' }));
    }
    res.writeHead(200);
    return res.end(JSON.stringify({ isPrime: result }));
  }

  // POST /count
  if (pathname === '/count' && method === 'POST') {
    if (req.headers['content-type'] !== 'application/json') {
      res.writeHead(415);
      return res.end(JSON.stringify({ error: 'Only application/json is allowed.' }));
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        const increment = parseInt(parsed.incrementBy, 10);
        if (!Number.isInteger(increment) || increment <= 0) throw new Error('Invalid input');
        count += increment;
        res.writeHead(200);
        res.end(JSON.stringify({ counter: count }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // GET /stock-insight
  if (pathname === '/stock-insight' && method === 'GET') {
    try {
      const currency = (query.currency || 'usd').toLowerCase();
      if (!['usd', 'brl'].includes(currency)) throw new Error('Invalid currency');

      const price = await fetchBitcoinPrice(currency);

      let suggestion = '';
      if (currency === 'brl') {
        if (price < 300000) suggestion = 'Bom momento para compra!';
        else if (price <= 450000) suggestion = 'Preço razoável. Avalie antes de comprar.';
        else suggestion = 'Bitcoin está caro. Pode ser melhor esperar.';
      } else {
        if (price < 60000) suggestion = 'Bom momento para compra!';
        else if (price <= 80000) suggestion = 'Preço razoável. Avalie antes de comprar.';
        else suggestion = 'Bitcoin está caro. Pode ser melhor esperar.';
      }

      res.writeHead(200);
      return res.end(JSON.stringify({ btc_price: price, currency, suggestion }));
    } catch (err) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
