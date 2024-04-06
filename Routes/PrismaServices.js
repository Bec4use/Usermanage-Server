import { PrismaClient } from "@prisma/client";

class PrismaService {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getPrismaInstance() {
    return this.prisma;
  }
}

export default PrismaService;
