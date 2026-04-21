const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeDupes() {
  const dests = await prisma.destination.findMany();
  const seen = new Set();
  let removed = 0;
  for (const d of dests) {
    if (seen.has(d.name)) {
      await prisma.booking.deleteMany({ where: { destinationId: d.id } });
      await prisma.destination.delete({ where: { id: d.id } });
      removed++;
      console.log(`Removed duplicate: ${d.name}`);
    } else {
      seen.add(d.name);
    }
  }
  console.log(`Done. Removed ${removed} duplicates.`);
}

removeDupes()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
