import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/departments", async (req, res) => {
  try {
    const departments = await prisma.department.findMany();
    res.json({
      Status: true,
      message: "Categories fetched successfully!",
      data: departments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while fetching the categories.",
    });
  }
});

export { router as getDepartments };
