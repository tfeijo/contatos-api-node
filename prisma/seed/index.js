const contatoSeed = require('./contato.seed');

async function runAllSeeds(prisma) {
  await contatoSeed(prisma);
  console.log('Seeding concluído com sucesso!');
}

module.exports = runAllSeeds;
