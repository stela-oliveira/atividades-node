# 📦 API Simples com Node.js (sem bibliotecas externas)

Esta API foi construída apenas com o módulo nativo `http` do Node.js (sem Express ou outras bibliotecas externas). Ela possui endpoints para verificação de saúde, checagem de números primos, contador e sugestão de compra de Bitcoin via CoinGecko.

---

## 🚀 Como rodar o servidor

```bash
node server.js
```

Você verá no terminal:
```
Server is running at http://localhost:3000
```

---

## 📌 Endpoints Disponíveis

### 1. `GET /health-check`

Verifica se o servidor está online.

**Exemplo de uso:**

```bash
curl http://localhost:3000/health-check
```

**Resposta esperada:**

```json
{
  "success": true,
  "timestamp": "2025-03-13T10:00:00.000Z"
}
```

---

### 2. `GET /is-prime-number?number=7`

Verifica se um número é primo.

**Exemplo de uso:**

```bash
curl "http://localhost:3000/is-prime-number?number=7"
```

**Respostas esperadas:**

- Se primo:
  ```json
  { "isPrime": true }
  ```

- Se não primo:
  ```json
  { "isPrime": false }
  ```

- Se inválido:
  ```json
  { "error": "Invalid input" }
  ```

---

### 3. `POST /count`

Incrementa um contador mantido no servidor.

**Exemplo de uso:**

```bash
curl -X POST http://localhost:3000/count ^
  -H "Content-Type: application/json" ^
  -d "{\"incrementBy\": 5}"
```

**Resposta esperada:**

```json
{
  "counter": 5
}
```

- Se input inválido:
  ```json
  { "error": "Invalid input" }
  ```

---

### 4. `GET /stock-insight?currency=usd`

Consulta o preço atual do Bitcoin e retorna uma sugestão de compra com base na moeda.

**Parâmetros de query:**

- `currency=usd` *(padrão)* ou `currency=brl`

**Exemplo de uso:**

```bash
curl "http://localhost:3000/stock-insight?currency=usd"
```

**Resposta esperada:**

```json
{
  "btc_price": 39500.75,
  "currency": "usd",
  "suggestion": "Bom momento para compra!"
}
```

---

## 📝 Requisitos

- Node.js v18 ou superior (para utilizar o `fetch` nativo)
  
---

😊 **Obrigada por ler!**
