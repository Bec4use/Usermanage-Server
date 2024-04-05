import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/departmentCount", async (req, res) => {
  try {
    const departmentCount = await prisma.department.count();
    res.json({
      Status: true,
      message: "Admin count fetched successfully!",
      data: departmentCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while fetching the admin count.",
    });
  }
});

export { router as departmentCount };
