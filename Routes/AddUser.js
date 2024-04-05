import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/users", authenticate, async (req, res) => {
  const {
    image,
    firstName,
    lastName,
    gender,
    birthday,
    departmentId,
    address,
  } = req.body;

  try {
    const newUser = await prisma.users.create({
      data: {
        image,
        firstName,
        lastName,
        gender,
        birthday: new Date(birthday),
        departmentId,
        address,
      },
    });

    res.json({
      Status: true,
      message: "User created!",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while creating the user.",
    });
  }
});

export { router as AddUser };
