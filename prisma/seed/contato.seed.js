module.exports = async function (prisma) {
  await prisma.contato.createMany({
    data: [
      {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        cnpj: '12345678000190',
      },
      {
        nome: 'Maria Souza',
        email: 'maria.souza@email.com',
        cnpj: '98765432000155',
      },
    ],
  });
  
  console.log("Seed de contatos executado");
};