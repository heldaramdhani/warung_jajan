import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Password yang akan di-hash
  const adminPassword = await bcrypt.hash('admin123', 10);
  const kasirPassword = await bcrypt.hash('kasir123', 10);

  const adminEmail = 'admin@gmail.com'.toLowerCase();
  const kasirEmail = 'kasir@gmail.com'.toLowerCase();

  // Upsert Admin
  const admin = await prisma.users.upsert({
    where: { email: adminEmail },
    update: {
      password: adminPassword,
      role: 'admin',
      nama: 'admin',
    },
    create: {
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
      nama: 'admin',
    },
  });

  // Upsert Kasir
  const kasir = await prisma.users.upsert({
    where: { email: kasirEmail },
    update: {
      password: kasirPassword,
      role: 'kasir',
      nama: 'kasir',
    },
    create: {
      email: kasirEmail,
      password: kasirPassword,
      role: 'kasir',
      nama: 'kasir',
    },
  });

  console.log('Seeding completed.');
  console.log({ admin: admin.email, kasir: kasir.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
