import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();
const prisma = new PrismaClient();

router.put("/profile/:id", async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, "jwtsecretkey");
  const id = decoded.id;

  const {
    image,
    firstName,
    lastName,
    birthday,
    gender,
    email,
    phone,
    address,
    password,
  } = req.body;

  let birthdayDate;
  if (birthday) {
    birthdayDate = new Date(birthday);
    if (isNaN(birthdayDate)) {
      return res.status(400).json({ message: "Invalid birthday format" });
    }
  }

  const dataToUpdate = {
    image,
    firstName,
    lastName,
    birthday: birthdayDate,

    email,
    phone,
    address,
  };
  if (gender) {
    dataToUpdate.gender = gender;
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = hashedPassword;
  }

  try {
    const updatedProfile = await prisma.admin.update({
      where: {
        id: id,
      },
      data: dataToUpdate,
    });

    res.json({
      Status: true,
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while updating the profile.",
    });
  }
});

export { router as UpdateProfile };
