const express = require('express');
const {
  criarContato,
  atualizarContato,
  listarContatos,
  deletarContato,
} = require('../controllers/contato.controller');

const sanitizeCNPJMiddleware = require('../middlewares/sanitizeCNPJ');
const validateContato = require('../middlewares/validateContato');

const router = express.Router();

router.post('/', sanitizeCNPJMiddleware, validateContato, criarContato);
router.put('/:id', sanitizeCNPJMiddleware, validateContato, atualizarContato);
router.get('/', listarContatos);
router.delete('/:id', deletarContato);

module.exports = router;
