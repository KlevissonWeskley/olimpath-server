import { prisma } from '../src/lib/prisma';
import { olympiadsData } from './olympiads';

async function seedContents() {
  for (const olympiadJson of olympiadsData) {
    // Buscar a olimpíada pelo nome no banco
    const olympiad = await prisma.olympiad.findUnique({
      where: { name: olympiadJson.name },
    });

    if (!olympiad) {
      console.log(`Olimpíada ${olympiadJson.name} não encontrada no banco.`);
      const newOlympiad = await prisma.olympiad.create({
        data: {
          name: olympiadJson.name
        }
      })

      console.log(`Olimpíada ${newOlympiad.name} cadastrada.`);
      return newOlympiad;
    }

    for (const content of olympiadJson.content) {
      // Cria o conteúdo (module)
      const createdContent = await prisma.content.create({
        data: {
          title: content.module,
          olympiadId: olympiad.id,
        },
      });

      // Cria os vídeos para o conteúdo criado
      for (const video of content.videos) {
        await prisma.video.create({
          data: {
            title: video.name,
            url: video.link,
            contentId: createdContent.id,
          },
        });
      }
    }
    console.log(`Conteúdos e vídeos cadastrados para a olimpíada ${olympiadJson.name}`);
  }
}

seedContents()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
