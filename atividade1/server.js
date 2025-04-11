import { createServer } from 'node:http';

const hostname = 'localhost';
const port = 3000;
let counter = 0;

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${hostname}:${port}`);
  const { pathname, searchParams } = url;

  res.setHeader('Content-Type', 'application/json');

  // GET /health-check
  if (req.method === 'GET' && pathname === '/health-check') {
    res.writeHead(200);
    return res.end(JSON.stringify({
      success: true,
      timestamp: new Date().toISOString()
    }));
  }

  // GET /is-prime-number?number=...
  else if (req.method === 'GET' && pathname === '/is-prime-number') {
    const number = parseInt(searchParams.get('number'), 10);

    if (!number || isNaN(number) || number < 1) {
      res.writeHead(400);
      return res.end(JSON.stringify({ error: 'Invalid input' }));
    }

    res.writeHead(200);
    return res.end(JSON.stringify({ isPrime: isPrime(number) }));
  }

  // POST /count
  else if (req.method === 'POST' && pathname === '/count') {
    if (req.headers['content-type'] !== 'application/json') {
      res.writeHead(415); 
      return res.end(JSON.stringify({ error: 'Only application/json is allowed.' }));
    }

    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const increment = data.incrementBy;

        if (!Number.isInteger(increment) || increment < 1) {
          throw new Error('Invalid input');
        }

        counter += increment;
        res.writeHead(200);
        res.end(JSON.stringify({ counter }));
      } catch (err) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid input' }));
      }
    });
  }

  // para rota não encontrada
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`API rodando em http://${hostname}:${port}`);
});
