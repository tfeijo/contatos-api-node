const { z } = require('zod');
const cnpj = require('@fnando/cnpj');

const contatoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email é inválido'),
  cnpj: z
    .string()
    .refine((val) => cnpj.isValid(val), { message: 'CNPJ inválido' }),
});

function validateContato(req, res, next) {
  const result = contatoSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message);
    return res.status(400).json({ error: errors });
  }

  next();
}

module.exports = validateContato;
