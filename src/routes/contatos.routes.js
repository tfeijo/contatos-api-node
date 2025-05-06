const express = require('express');
const prisma = require('../database/prisma');

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

module.exports = router;
