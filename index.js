import express from "express";
import cors from "cors";
import { adminRouter } from "./Routes/AdminRoute.js";
import { AddDepartment } from "./Routes/AddDepartment.js";
import cookieParser from "cookie-parser";
import { getDepartments } from "./Routes/Department.js";
import { AddUser } from "./Routes/AddUser.js";
import authenticate from "./middleware/authMiddleware.js";
import { getUsers } from "./Routes/getUser.js";
import { getUserById } from "./Routes/getUserbyId.js";
import { UpdateUser } from "./Routes/UpdateUser.js";
import { deleteUser } from "./Routes/Deleteuser.js";
import { adminCount } from "./Routes/Dashboard/adminCount.js";
import { userCount } from "./Routes/Dashboard/userCount.js";
import { departmentCount } from "./Routes/Dashboard/departmentCount.js";
import { userSearch } from "./Routes/userSearch.js";
import { registerRouter } from "./Routes/Register.js";
import { logoutRouter } from "./Routes/Logout.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use("/auth", adminRouter);
app.use("/auth", registerRouter);
app.use("/auth", logoutRouter);
app.use(cookieParser());
app.use("/api", AddDepartment);
app.use("/api", authenticate, getDepartments);
app.use("/api", AddUser);
app.use("/api", authenticate, getUsers);
app.use("/api", authenticate, getUserById);
app.use("/api", authenticate, UpdateUser);
app.use("/api", authenticate, deleteUser);
app.use("/api", authenticate, adminCount);
app.use("/api", authenticate, userCount);
app.use("/api", authenticate, departmentCount);
app.use("/api", authenticate, userSearch);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
