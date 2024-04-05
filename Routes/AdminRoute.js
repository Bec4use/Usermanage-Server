import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!admin) {
      return res.json({ loginStatus: false, message: "Login failed!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.json({ loginStatus: false, message: "Invalid password!" });
    }

    const token = jwt.sign(
      { role: "admin", email: admin.email },
      "jwtsecretkey",
      { expiresIn: "24h" }
    );
    res.cookie("token", token);
    return res.json({ loginStatus: true, message: "Login success!" });
  } catch (error) {
    return res.json({ loginStatus: false, message: "Login failed!" });
  }
});

export { router as adminRouter };
