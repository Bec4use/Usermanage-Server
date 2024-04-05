import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
  try {
    const user = await prisma.admin.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.json({
        registerStatus: false,
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await prisma.admin.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
      },
    });

    return res.json({
      registerStatus: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    return res.json({
      registerStatus: false,
      message: "User registration failed!",
    });
  }
});

export { router as registerRouter };
