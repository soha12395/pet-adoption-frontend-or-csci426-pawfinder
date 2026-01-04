import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

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
app.use(
  cors({
    origin: "proactive-nature-production.up.railway.app", // ⬅️ ضع frontend URL هنا
    credentials: true, // للسماح بالـ cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

// // Database connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "petadoption",
// });

// ⚡ الحل: استخدم معلومات Railway مباشرة
const db = mysql.createConnection({
  host: "mysql.railway.internal", // ⬅️ من معلوماتك
  port: 3306, // ⬅️ من معلوماتك
  user: "root", // ⬅️ من معلوماتك
  password: "rUdjTQuBxIrakkVHZnQluiUvkkeZKAYJ", // ⬅️ من معلوماتك
  database: "railway", // ⬅️ من معلوماتك
  ssl: { rejectUnauthorized: false },
});

// أو إذا ما اشتغل، جرب الـ Public URL:
// const db = mysql.createConnection({
//   host: "metro.proxy.rlwy.net",
//   port: 31247,
//   user: "root",
//   password: "rUdjTQuBxIrakkVHZnQluiUvkkeZKAYJ",
//   database: "railway",
//   ssl: { rejectUnauthorized: false }
// });

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Error:", err.message);
    console.log("Trying alternative connection...");

    // محاولة ثانية بالـ Public URL
    const db2 = mysql.createConnection({
      host: "metro.proxy.rlwy.net",
      port: 31247,
      user: "root",
      password: "rUdjTQuBxIrakkVHZnQluiUvkkeZKAYJ",
      database: "railway",
    });

    db2.connect((err2) => {
      if (err2) {
        console.error("❌ Also failed:", err2.message);
      } else {
        console.log("✅ Connected via Public URL!");
        // استبدال الاتصال
        Object.assign(db, db2);
      }
    });
  } else {
    console.log("✅ Connected to Railway MySQL!");
    console.log("📊 Database: railway");
  }
});

const PORT = process.env.PORT || 5000;

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
            res.cookie("token", token, {
              httpOnly: true,
              secure: true,
              sameSite: "none",
            });
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

// =========== TEST ROUTES ===========

// 1. Basic health check
app.get("/", (req, res) => {
  res.json({
    message: "Pet Adoption Backend API",
    status: "Live on Railway",
    url: "https://discerning-radiance-production.up.railway.app",
    timestamp: new Date().toISOString(),
    endpoints: {
      signup: "POST /signup",
      login: "POST /login",
      pets: "GET /pets",
      adopt: "POST /adopt",
      auth: "GET /auth",
    },
  });
});

// 2. Database test
app.get("/health", (req, res) => {
  db.query("SELECT NOW() as time, DATABASE() as db", (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "ERROR",
        backend: "Running",
        database: "Disconnected",
        error: err.message,
      });
    }
    return res.json({
      status: "HEALTHY",
      backend: "Running on Railway",
      database: "Connected",
      dbName: results[0].db,
      dbTime: results[0].time,
      serverTime: new Date().toISOString(),
    });
  });
});

// 3. Simple test
app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "✅ Backend is working!",
    service: "Pet Adoption API",
    environment: "Railway Production",
    check: "All systems operational",
  });
});

// =========== END TEST ROUTES ===========

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `🌐 Database: ${
      process.env.DB_NAME || process.env.MYSQLDATABASE || "petadoption"
    }`
  );
});
