const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const uncategorizedBudget = await prisma.budget.upsert({
    where: { name: "Uncategorized" }, 
    update: {},
    create: {
      name: "Uncategorized",
      max: 0,
    },
  });
  console.log({ uncategorizedBudget });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
