const express = require('express');
const prisma = require('../database/prisma');

const { validate: isUUID } = require('uuid');

const router = express.Router();

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
    const status  = 400
    const message = 'Identificador inválido.'
    return res.status(status).json({ error: message })
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
