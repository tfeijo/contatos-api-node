# 📘 Documentação da API de Contatos

### 🔐 Autenticação
Os endpoints presumem autenticação via JWT, aplicada via middleware global (não visível diretamente neste arquivo).

---

## Endpoints

### `POST /`

**Descrição**: Cria um novo contato.

**Middlewares**:
- `sanitizeCNPJMiddleware`: sanitiza o campo CNPJ.
- `validateContato`: valida os campos do contato.

**Body esperado**:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "123456789",
  "cnpj": "12.345.678/0001-90"
}
```

**Respostas**:
- `201 Created`: Contato criado com sucesso.
- `400 Bad Request`: Erro de validação.

---

### `PUT /:id`

**Descrição**: Atualiza um contato existente pelo ID.

**Parâmetros**:
- `id` (path): ID do contato a ser atualizado.

**Middlewares**:
- `sanitizeCNPJMiddleware`
- `validateContato`

**Body esperado**: Igual ao POST.

**Respostas**:
- `200 OK`: Contato atualizado.
- `400 Bad Request` ou `404 Not Found`

---

### `GET /`

**Descrição**: Lista todos os contatos.

**Respostas**:
- `200 OK`: Retorna lista de contatos.

---

### `DELETE /:id`

**Descrição**: Remove um contato pelo ID.

**Parâmetros**:
- `id` (path): ID do contato a ser deletado.

**Respostas**:
- `204 No Content`: Contato deletado.
- `404 Not Found`: Contato não encontrado.
