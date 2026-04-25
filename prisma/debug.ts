import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function check() {
  const user = await prisma.users.findUnique({ where: { email: 'admin@gmail.com' } });
  console.log("User:", user);
  if (user) {
    const isValid = await bcrypt.compare('admin123', user.password);
    console.log("Is valid password 'admin123'?", isValid);
  }
}

check().then(() => process.exit(0)).catch(console.error);
