import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//import mysql from "mysql";
// import dotenv from "dotenv";
// dotenv.config();

const salt = 10;

const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use(cors());
app.use(cookieParser());

// // Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "petadoption",
// });

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  port: process.env.MYSQLPORT || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "railway",
  ssl: {
    rejectUnauthorized: false // إجباري لـ Railway!
  },
  connectTimeout: 10000,
  charset: 'utf8mb4'

});

db.connect((err) => {
  if (err) {
    console.log("DB connection error:", err);
  } else {
    console.log("Connected to DB");
  }
});

const port = process.env.PORT || 5000;

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "you are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "token does not exist" });
      } else {
        req.name = decoded.name;
        req.email = decoded.email;
        // req.pet_id = decoded.pet_id;
        next();
      }
    });
  }
};
app.get("/auth", verifyUser, (req, res) => {
  return res.json({
    Status: "Success",
    name: req.name,
    email: req.email,
    // pet_id: req.pet_id,
  });
});

app.post("/signup", (req, res) => {
  console.log("Request body:", req.body);

  // Hash password
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) {
      console.log("Bcrypt error:", err);
      return res.json({ Error: "Error hashing password" });
    }

    const sql = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
    const values = [req.body.name, req.body.email, hash];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log("DB insert error:", err);
        return res.json({ Error: "Error inserting data in DB" });
      }

      console.log("User inserted:", result);
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE email=?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "password hash error" });
          if (response) {
            const name = data[0].name;
            const email = data[0].email;
            const token = jwt.sign({ name, email }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "password does not match" });
          }
        }
      );
    } else {
      return res.json({ Error: "Account does not exist, please signup first" });
    }
  });
});

app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM pets";
  db.query(sql, (err, results) => {
    if (err) return res.json({ Error: err });
    return res.json(results);
  });
});

app.post("/adopt", (req, res) => {
  const { pet_id, user_name, user_email, address, reason } = req.body;
  const checkSql = "SELECT available FROM pets WHERE id=?";

  db.query(checkSql, [pet_id], (err, data) => {
    if (err) return res.json({ Error: err });
    if (data.length === 0) return res.json({ Error: "pet not found" });
    if (data[0].available === 0)
      return res.json({ Error: "Pet is not available" });

    const sql =
      "INSERT INTO adoptions (pet_id, user_name, user_email, address, reason) VALUES (?,?,?,?,?)";
    db.query(
      sql,
      [pet_id, user_name, user_email, address, reason],
      (err2, result) => {
        if (err2) return res.json({ Error: err2 });

        const updateSql = "UPDATE pets SET available=0 WHERE id=?";
        db.query(updateSql, [pet_id], (err3) => {
          if (err3) return res.json({ Error: err3 });
          return res.json({
            Status: "Success",
            Message: "Thank you for your time, We will contact you soon",
            pet_id: req.pet_id,
          });
        });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
