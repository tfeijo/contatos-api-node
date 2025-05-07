module.exports = async function (prisma) {
  await prisma.contato.create({
    data: {
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      cnpj: '12345678000190',
    },
  });

  await prisma.contato.create({
    data: {
      nome: 'Maria Souza',
      email: 'maria.souza@email.com',
      cnpj: '98765432000155',
    },
  });

  console.log('✅ Seed de contatos executado com sucesso!');
};
