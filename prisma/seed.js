const { PrismaClient } = require('@prisma/client');
const runAllSeeds = require('./seed/index');

const prisma = new PrismaClient();

runAllSeeds(prisma)
  .catch((e) => {
    console.error('Erro ao rodar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
