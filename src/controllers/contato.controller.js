const prisma = require('../database/prisma');
const { validate: isUUID } = require('uuid');
const handlePrismaError = require('../utils/handlePrismaError');
const { format: formatCNPJ } = require('@fnando/cnpj');

async function criarContato(req, res) {
  try {
    const { nome, email, cnpj } = req.body;

    const novoContato = await prisma.contato.create({
      data: { nome, email, cnpj },
    });

    return res.status(201).json(novoContato);
  } catch (error) {
    const { status, message } = handlePrismaError(error, 'Criar contato');
    return res.status(status).json({ error: message });
  }
}

async function atualizarContato(req, res) {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({ error: 'Identificador inválido.' });
  }

  const { nome, email, cnpj } = req.body;

  try {
    const contato = await prisma.contato.findUnique({ where: { id } });

    if (!contato) {
      return res.status(404).json({ error: 'Contato não encontrado.' });
    }

    const atualizado = await prisma.contato.update({
      where: { id },
      data: { nome, email, cnpj },
    });

    return res.status(200).json(atualizado);
  } catch (error) {
    const { status, message } = handlePrismaError(error, 'Atualizar contato');
    return res.status(status).json({ error: message });
  }
}

async function listarContatos(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  try {
    const [contatos, total] = await Promise.all([
      prisma.contato.findMany({
        skip,
        take: limit,
        orderBy: { nome: 'asc' },
        select: {
          nome: true,
          email: true,
          cnpj: true,
        },
      }),
      prisma.contato.count(),
    ]);

    totalPages = Math.ceil(total / limit);

    check_page_param(page, totalPages, res);

    const formatados = contatos.map((contato) => ({
      ...contato,
      cnpj: contato.cnpj ? formatCNPJ(contato.cnpj) : null,
    }));

    totalPages = Math.ceil(total / limit);

    res.status(200).json({
      data: formatados,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Erro ao listar contatos:', error);
    res.status(500).json({ error: 'Erro ao buscar contatos.' });
  }
}

function check_page_param(page, totalPages, res) {
  if (page > totalPages && totalPages !== 0) {
    return res.status(500).json({
      error: `Página ${page} não disponível. Total de páginas: ${totalPages}.`,
    });
  }
}

async function deletarContato(req, res) {
  const { id } = req.params;

  if (!isUUID(id)) {
    return res.status(400).json({ error: 'Identificador inválido.' });
  }

  try {
    await prisma.contato.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    const { status, message } = handlePrismaError(error, 'Deletar contato');
    return res.status(status).json({ error: message });
  }
}

module.exports = {
  criarContato,
  atualizarContato,
  listarContatos,
  deletarContato,
};
