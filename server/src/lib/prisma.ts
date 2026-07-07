import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // logs every single query!
});

export default prisma;