const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // query ข้อมูลจาก table users ที่ feild username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    // ถ้าไม่พบ user
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = result.rows[0];
    // Match password จาก database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      //ถ้า password match กับ database
      const token = jwt.sign(
        { userId: user.userid },
        process.env.CLIENT_JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token,
        user: { userId: user.userid, username: user.username },
      });
    } else {
      //  ถ้า password ไม่ถูกต้อง
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // อายุ token อยู่ได้ 7 วัน
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { login };
