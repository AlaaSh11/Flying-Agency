const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  await prisma.destination.updateMany({
    where: { code: 'ZRH-ALPS' },
    data: { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' }
  });
  await prisma.destination.updateMany({
    where: { code: 'KEF-AUR' },
    data: { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' } 
  });
  await prisma.destination.updateMany({
    where: { code: 'JFK-NYC' },
    data: { image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625' }
  });
  await prisma.destination.updateMany({
    where: { code: 'YYC-BNF' },
    data: { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' }
  });
  await prisma.destination.updateMany({
    where: { code: 'USH-ANT' },
    data: { image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b' } 
  });
  console.log('Fixed URLs in DB');
}
fix()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
