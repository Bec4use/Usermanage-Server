import express from "express";

const router = express.Router();

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ logoutStatus: true, message: "Logout success!" });
  } catch (error) {
    return res.json({ logoutStatus: false, message: "Logout failed!" });
  }
});

export { router as logoutRouter };
