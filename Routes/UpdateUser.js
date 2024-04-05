import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.put("/users/:id", async (req, res) => {
  const id = req.params.id;
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
    const updatedUser = await prisma.users.update({
      where: {
        id: id,
      },
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
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: false,
      message: "An error occurred while creating the user.",
    });
  }
});

export { router as UpdateUser };
