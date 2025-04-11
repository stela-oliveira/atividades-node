# 📦 API Simples com Node.js (sem bibliotecas externas)

Esta API foi desenvolvida utilizando apenas o módulo `http` nativo do Node.js. Ela possui três endpoints principais para fins educativos e de prática com Node puro.

---

## 🚀 Como subir a API

1. Certifique-se de que o Node.js está instalado (recomenda-se a versão 18+).
2. Clone este repositório.
3. No terminal, execute:

```bash
node server.js
```

4. Você verá a mensagem:

```
API rodando em http://localhost:3000
```

---

## 📡 Endpoints disponíveis e testes com `curl`

---

### ✅ 1. `GET /health-check`

**Descrição:** Verifica se a API está online.

**Comando:**

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

### 🔢 2. `GET /is-prime-number?number=7`

**Descrição:** Verifica se o número fornecido é primo.

**Exemplo com número primo:**

```bash
curl "http://localhost:3000/is-prime-number?number=7"
```

**Resposta:**

```json
{ "isPrime": true }
```

**Exemplo com número não primo:**

```bash
curl "http://localhost:3000/is-prime-number?number=10"
```

**Resposta:**

```json
{ "isPrime": false }
```

**Exemplo com valor inválido:**

```bash
curl "http://localhost:3000/is-prime-number?number=abc"
```

**Resposta:**

```json
{ "error": "Invalid input" }
```

---

### ➕ 3. `POST /count`

**Descrição:** Incrementa um contador mantido no servidor.

**Requisição com JSON válido:**

```bash
curl -X POST http://localhost:3000/count \
  -H "Content-Type: application/json" \
  -d '{"incrementBy": 5}'
```

**Resposta esperada:**

```json
{ "counter": 5 }
```

**Requisição com dado inválido:**

```bash
curl -X POST http://localhost:3000/count \
  -H "Content-Type: application/json" \
  -d '{"incrementBy": "abc"}'
```

**Resposta esperada:**

```json
{ "error": "Invalid input" }
```

---

## 📝 Observações

- O contador (`counter`) é mantido apenas em memória. Reiniciar o servidor faz o valor voltar para `0`.
- Os testes podem ser feitos com `curl` no terminal ou usando ferramentas como Postman, Insomnia etc.

---

😊 **Obrigada por ler!**
