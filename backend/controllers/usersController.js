const bcrypt = require("bcryptjs");
const pool = require("../config");

//function check password
const validatePassword = (password) => {
  // check password ต้องมีอย่างน้อย 6 ตัว
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  // check password ต้องไม่เป็นตัวเลขทั้งหมด
  if (/^\d+$/.test(password)) {
    return "Password cannot be all numbers";
  }
  return null;
};

// POST create new user
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบความถูกต้องของ password
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    // Hash password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Query insert ข้อมูล users ลงใน database
    const result = await pool.query(
      "INSERT INTO users (username,password) VALUES ($1,$2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get all users
// exports.getUsers = (req, res) => {
//   pool.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       res.json(result.rows);
//     }
//   });
// };

// Get by username
const getUserbyUsername = async (req, res) => {
  try {
    const { username } = req.params;
    // Query ดึงข้อมูล username จาก database
    const result = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );
    // Check query
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Forget password
// exports.changePassword = async (req, res) => {
//   const { userid, oldPassword, newPassword } = req.body;

//   //check ความถูกต้อง password ใหม่
//   const passwordError = validatePassword(newPassword);
//   if (passwordError) {
//     return res.status(400).json({ error: passwordError });
//   }

//   try {
//     // ดึงข้อมูล user จาก database
//     const result = await pool.query(
//       "SELECT password FROM users WHERE userid = $1",
//       [userid]
//     );
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const user = result.rows[0];

//     //ยืนยัน password เก่า
//     const match = await bcrypt.compare(oldPassword, user.password);
//     if (!match) {
//       return res.status(400).json({ error: "Old password is incorrect" });
//     }

//     //hash new password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
//     // update new password in database
//     await pool.query("UPDATE users SET passowrd = $1 WHERE userid = $2", [
//       hashedPassword,
//       userid,
//     ]);
//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports = { createUser, getUserbyUsername };
