const pool = require("../config");

// Add product
const addProduct = async (req, res) => {
  try {
    const { product_name, description, quantity } = req.body;

    await pool.query("BEGIN");

    // INSERT ข้อมูลลง database
    const result = await pool.query(
      "INSERT INTO products(product_name,description) VALUES($1,$2) RETURNING *",
      [product_name, description]
    );

    const product_id = result.rows[0].product_id;

    await pool.query(
      "INSERT INTO inventory(product_id,quantity,create_at,last_update,status)VALUES($1,$2,NOW(),NOW(),$3)",
      [product_id, quantity, "in"]
    );

    await pool.query("COMMIT");
    res.status(200).json({ success: true, product: result.rows[0] });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ success: false, error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    // เริ่ม transaction
    await pool.query('BEGIN');

    // ตรวจสอบว่าสินค้ามีอยู่ในฐานข้อมูลหรือไม่
    const result = await pool.query(
      "SELECT quantity FROM inventory WHERE product_id = $1 AND status = 'in'",
      [product_id]
    );

    if (result.rows.length === 0) {
      throw new Error("Product not found or already withdrawn");
    }

    const currentQuantity = result.rows[0].quantity;
    const newQuantity = currentQuantity + quantity;

    // อัพเดทข้อมูล inventory
    await pool.query(
      `UPDATE inventory SET quantity = $1, last_update = NOW() WHERE product_id = $2 AND status = 'in'`,
      [newQuantity, product_id]
    );

    // Commit transaction
    await pool.query('COMMIT');

    res.status(200).json({ success: true, message: "Product quantity updated successfully" });
  } catch (error) {
    // Rollback transaction ในกรณีที่เกิดข้อผิดพลาด
    await pool.query('ROLLBACK');
    console.error("Error updating product quantity", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = { addProduct, updateProduct };
