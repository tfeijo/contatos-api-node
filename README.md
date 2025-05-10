# contatos-api-node

API de gerenciamento de contatos desenvolvida com Node.js, Express e PostgreSQL. Utiliza Prisma ORM, autenticação com JWT e validação com Zod. Arquitetura moderna, extensível e preparada para produção com Docker e integração contínua.

## 📚 Descrição

Projeto de backend para o **Sistema A**, responsável pelo cadastro, autenticação e gerenciamento de contatos. Ideal para aplicações com estrutura RESTful e foco em segurança e validação robusta de dados.

## 🚀 Tecnologias

- **Node.js** + **ESM Modules**
- **Express** (framework web)
- **Prisma ORM** (acesso a dados)
- **PostgreSQL**
- **JWT** (autenticação)
- **Zod** (validação)
- **Docker/Docker Compose**
- **ESLint + Prettier** (padronização)

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/contatos-api-node.git
cd contatos-api-node
npm install
cp .env_example .env
```

Configure seu banco PostgreSQL e atualize as variáveis no `.env`.

## 🔧 Scripts

| Comando            | Ação                                            |
|--------------------|-------------------------------------------------|
| `npm run dev`      | Inicia em modo desenvolvimento com `nodemon`   |
| `npm start`        | Aplica migrations e inicia o servidor           |
| `npm run lint`     | Executa o ESLint                                |
| `npm run lint:fix` | Corrige problemas automaticamente               |
| `npm run prettier` | Formata o código com Prettier                   |

## 🧬 Banco de Dados

- PostgreSQL
- Gerenciado por Prisma (Schema + Migrations)
- Rode migrations com:

```bash
npx prisma migrate dev
```

## 🐳 Docker

Você pode rodar toda a aplicação com:

```bash
docker-compose up
```

Inclui banco de dados e suporte à orquestração local.

## 🔐 Autenticação

Autenticação via JWT.
As rotas protegidas devem receber o token no cabeçalho `Authorization`:

```
Authorization: Bearer <seu_token>
```

## 🧰 Estrutura do Projeto

```
src/
├── server.js           # ponto de entrada
├── routes/             # definição das rotas
├── controllers/        # lógica de negócio
├── middlewares/        # autenticação, validações
├── services/           # lógica de aplicação
├── prisma/             # schema e client Prisma
```

## ✅ Boas Práticas

- Uso de ESM com `"type": "module"`
- Validação robusta com Zod
- Segurança com JWT
- Estrutura modular
- Linting e formatação padronizados

## 📄 Licença

[MIT](./LICENSE)

---

Desenvolvido por Thiago Feijó
