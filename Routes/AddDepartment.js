// categoryRouter.js
import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add_department", authenticate, async (req, res) => {
  const { department } = req.body;

  try {
    const newDepartment = await prisma.department.create({
      data: {
        name: department,
      },
    });

    res.json({
      Status: true,
      message: "Category created!",
      category: newDepartment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while creating the category.",
    });
  }
});

export { router as AddDepartment };
