const sanitizeCNPJ = require('../utils/sanitizeCNPJ');

function sanitizeCNPJMiddleware(req, res, next) {
  if (req.body && req.body.cnpj) {
    req.body.cnpj = sanitizeCNPJ(req.body.cnpj);
  }
  next();
}

module.exports = sanitizeCNPJMiddleware;
