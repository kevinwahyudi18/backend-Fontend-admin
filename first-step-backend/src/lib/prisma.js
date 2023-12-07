const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

module.exports = prisma;
