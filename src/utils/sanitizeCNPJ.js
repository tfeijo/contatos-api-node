function sanitizeCNPJ(cnpj) {
  if (typeof cnpj !== 'string') return '';
  const cleaned = cnpj.replace(/[^\d]+/g, '');
  return cleaned.length === 14 ? cleaned : '';
}

module.exports = sanitizeCNPJ;
