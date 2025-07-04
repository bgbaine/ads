import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'warn',
    },
    {
      emit: 'event',
      level: 'info',
    },
  ],
});

prisma.$on('query', (e) => {
  console.log(`[${new Date().toISOString()}] [QUERY] ${e.query}`);
});

prisma.$on('info', (e) => {
  console.log(`[${new Date().toISOString()}] [INFO] ${e.message}`);
});

prisma.$on('warn', (e) => {
  console.warn(`[${new Date().toISOString()}] [WARN] ${e.message}`);
});

prisma.$on('error', (e) => {
 console.error(`[${new Date().toISOString()}] [ERROR] ${e.message}`);
});

export default prisma;
