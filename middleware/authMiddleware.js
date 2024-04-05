// authMiddleware.js
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, "jwtsecretkey");
    req.admin = decoded;
    next();
  } catch (error) {
    console.error("Authentication error", error);
    return res.status(401).json({ message: "Not authenticated" });
  }
};

export default authenticate;
