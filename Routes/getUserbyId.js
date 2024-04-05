import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    res.json({
      Status: true,
      message: "User fetched successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while fetching the user.",
    });
  }
});

export { router as getUserById };
