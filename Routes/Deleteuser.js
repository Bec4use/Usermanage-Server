import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await prisma.users.delete({
      where: {
        id: id,
      },
    });
    res.json({
      Status: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while deleting the user.",
    });
  }
});

export { router as deleteUser };
