// import package มาใช้งาน
const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors =require('cors')
require("dotenv").config();

// สร้างตัวแปร app ขึ้นมารับค่า express
const app = express();

// middleware จัดเก็บ req.body ที่ส่งมาจาก client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

// สร้างตัวแปรรับค่าจาก database.js
const pool = require('./config');

// เข็คว่า connect กับ postgreSQL ได้ไหม
pool.query("SELECT NOW()",(err,res)=>{
  if (err) {
    console.error("Error conecting to the database:",err)
  } else {
    console.log("Connect postgreSQL database successfully");
  }
})

// ตัวแปรรับค่ามาจาก route useres
const usersRouter = require("./routes/users")
app.use(usersRouter)

//ตัวแปรรับค่ามาจาก route auth
const authRouter = require("./routes/auth")
app.use(authRouter)

// สร้างตัวแปร port รับค่าจาก ไฟล์ .env
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server connect in port : ${port}`);
});

module.exports =app;
