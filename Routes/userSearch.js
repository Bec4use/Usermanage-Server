import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (req, res) => {
  const { search } = req.query;
  try {
    const users = await prisma.users.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        department: true,
      },
    });
    res.json({ Status: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: false, message: "Internal server error" });
  }
});

export { router as userSearch };
