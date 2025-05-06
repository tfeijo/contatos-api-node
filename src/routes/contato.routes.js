const express = require('express');
const prisma = require('../database/prisma');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contatos = await prisma.contato.findMany();
    res.status(200).json(contatos);
  } catch (error) {
    console.error('Erro ao buscar contatos:', error);
    res.status(500).json({ error: 'Erro interno ao buscar contatos.' });
  }
});

module.exports = router;
