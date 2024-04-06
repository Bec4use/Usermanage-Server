import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/profile/:id", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "jwtsecretkey");
  const id = decoded.id;

  console.log(id);
  try {
    const user = await prisma.admin.findUnique({
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

export { router as getProfileById };
