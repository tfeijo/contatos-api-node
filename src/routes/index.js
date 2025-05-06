const express = require('express');
const contatoRoutes = require('./contatos.routes');

const router = express.Router();

router.use('/contatos', contatoRoutes);

module.exports = router