import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 4.1 SELECT ข้อมูล STORE ที่มี Region เป็น East
router.get("/stores/east", async (req, res) => {
  const stores = await prisma.store.findMany({
    where: {
      region: "East",
    },
  });
  res.json(stores);
});

// 4.2 SELECT ข้อมูล PRODUCT ที่ขายใน STORE New York
router.get("/products/new-york", async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      SalesFact: {
        where: {
          store: {
            city: "New York",
          },
        },
      },
    },
  });
  res.json(products);
});

// 4.3 SELECT ยอดรวม Profit ของ STORE New York
router.get("/profit/new-york", async (req, res) => {
  const totalProfit = await prisma.salesFact.aggregate({
    where: {
      store: {
        city: "New York",
      },
    },
    _sum: {
      profit: true,
    },
  });
  res.json({ totalProfit: totalProfit._sum.profit });
});

// 4.4 DELETE ข้อมูล SALE FACT ที่ PRODUCT มี Brand เป็น Wolf
router.delete("/sales-fact/wolf", async (req, res) => {
  await prisma.salesFact.deleteMany({
    where: {
      product: {
        brand: "Wolf",
      },
    },
  });
  res.json({ message: "Wolf sales facts deleted" });
});

// 4.5 UPDATE Brand ของ PRODUCT ที่มี Description เป็น Toy Story ให้เป็น W
router.put("/products/toy-story", async (req, res) => {
  await prisma.product.updateMany({
    where: {
      description: "Toy Story",
    },
    data: {
      brand: "W",
    },
  });
  res.json({ message: "Toy Story product brands updated to W" });
});

export { router as prismaRouter };
