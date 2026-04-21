const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/hash.util');
const prisma = new PrismaClient();

async function main() {
  const adminPass = await hashPassword('admin123');
  const userPass = await hashPassword('password123');

  const admin = await prisma.user.upsert({
    where: { email: 'adam@ctrlelite.com' },
    update: {},
    create: {
      email: 'adam@ctrlelite.com',
      password: adminPass,
      fullName: 'Adam Dayekh',
      role: 'admin',
      tier: 'tier_omega',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPass,
      fullName: 'John Doe',
      role: 'user',
      tier: 'basic',
    },
  });

  const dest1 = await prisma.destination.create({
    data: {
      name: 'Cyberpunk Neo Tokyo',
      country: 'Japan',
      code: 'NRT-CYBER',
      description: 'Experience the neon glow of 2077.',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf',
      price: 2500,
      popular: true,
      category: 'VIP',
    }
  });

  const dest2 = await prisma.destination.create({
    data: {
      name: 'Martian Colony',
      country: 'Mars',
      code: 'MARS-ONE',
      description: 'The definitive off-world experience.',
      image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4',
      price: 15000,
      popular: true,
      category: 'VIP',
    }
  });

  console.log({ admin, user, dest1, dest2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
