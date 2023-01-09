import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pending = await prisma.status.create({
    data: {
      name: 'PENDING',
    },
  });

  const approved = await prisma.status.create({
    data: {
      name: 'APPROVED',
    },
  });

  const rejected = await prisma.status.create({
    data: {
      name: 'REJECTED',
    },
  });

  const payment = await prisma.type.create({
    data: {
      name: 'PAYMENT',
    },
  });

  console.log({ pending, approved, rejected, payment });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
