# 📡 API de Contatos – Sistema A

API RESTful para cadastro, listagem, atualização e remoção de contatos empresariais.

---

## 🚀 Tecnologias

- Node.js + Express
- Prisma ORM + PostgreSQL
- JWT para autenticação
- Zod para validação de dados
- Postman para testes automatizados

---

## ⚙️ Instalação e uso

```bash
git clone git@github.com:tfeijo/contatos-api-node.git
cd contatos-api-node

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env_example .env

# Iniciar aplicação
npm start
```

---

## 🔐 Autenticação

Todas as rotas são protegidas por **JWT**.

- Enviar o token via header:

```
Authorization: Bearer <seu_token>
```

- Gere o token manualmente com:

```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({ sistema: 'contatos-api' }, 'sua-chave-secreta', { expiresIn: '1h' });
```

---

## 📌 Endpoints

### 🔸 POST `/contatos`

Cria um novo contato.

#### Body JSON

```json
{
  "nome": "Empresa Exemplo",
  "email": "empresa@exemplo.com",
  "cnpj": "12345678000195"
}
```

#### Respostas

- `201 Created` – sucesso
- `409 Conflict` – e-mail ou CNPJ em uso
- `400 Bad Request` – validação falhou

---

### 🔸 GET `/contatos?page=1&limit=30`

Lista contatos com paginação.

#### Resposta

```json
{
  "data": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 30,
    "totalPages": 4
  }
}
```

---

### 🔸 PUT `/contatos/:id`

Atualiza um contato existente.

#### Body JSON

```json
{
  "nome": "Novo Nome",
  "email": "novo@email.com",
  "cnpj": "98765432000101"
}
```

---

### 🔸 DELETE `/contatos/:id`

Remove o contato.

#### Resposta

- `204 No Content` – excluído com sucesso
- `404 Not Found` – contato não existe

---

## ✅ Variáveis de ambiente (.env)

```env
PORT=3000
DATABASE_URL=postgres://usuario:senha@localhost:5432/contatos
JWT_SECRET=sua-chave
```

---

## 🧪 Testes via Postman

- Utilize a coleção Postman disponível em `/docs/postman_collection.json`
- Configure a variável `{{token}}` com o JWT válido
- Requisições de teste: criar, listar, editar e excluir contatos

---

## 📄 Licença

Este projeto está sob a licença MIT.