const express = require('express');
const prisma = require('../database/prisma');
const { validate: isUUID, validate } = require('uuid');
const validateContato = require('../middlewares/validateContato');
const sanitizeCNPJMiddleware = require('../middlewares/sanitizeCNPJ');
const { format: formatCNPJ } = require('@fnando/cnpj');

const router = express.Router();

router.post('/', sanitizeCNPJMiddleware, validateContato, async (req, res) => {
  try {
    const { nome, email, cnpj } = req.body;

    const novoContato = await prisma.contato.create({
      data: { nome, email, cnpj },
    });
    return res.status(201).json(novoContato);
  } catch (error) {
    status = 500;
    message = 'Erro interno ao criar contato.';

    switch (error?.code) {
      case 'P2002':
        status = 409;
        message = `Usuário já existe`;
        break;
    }

    console.error('Erro ao criar contato:', error);
    return res.status(status).json({ error: message });
  }
});

router.put('/:id', async (req, res) => {
  // Atualização de contato
});

router.get('/', async (req, res) => {
  try {
    const contatos = await prisma.contato.findMany({
      select: {
        nome: true,
        email: true,
        cnpj: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });
    res.status(200).json(contatos);
  } catch (error) {
    const errorMsg = 'Erro ao buscar contatos.';
    console.error(errorMsg, error);
    res.status(500).json({ error: errorMsg });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({ error: 'Identificador inválido.' });
  }

  try {
    await prisma.contato.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    let status = 500;
    let message = 'Erro interno ao deletar contato.';

    switch (error?.code) {
      case 'P2025':
        status = 404;
        message = 'Contato não encontrado.';
        console.warn(`Contato não encontrado. ID: ${id}`);
        break;

      default:
        console.error('Erro inesperado ao deletar contato:', error);
        break;
    }
    return res.status(status).json({ error: message });
  }
});

module.exports = router;
