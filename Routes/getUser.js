import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json({
      Status: true,
      message: "Categories fetched successfully!",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while fetching the categories.",
    });
  }
});

export { router as getUsers };
