import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.log("Connection failed!");
  } else {
    console.log("Database connected");
  }
});

export default db;
