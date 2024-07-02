const pool = require("../config");

// Add product
const addProduct = async (req, res) => {
  try {
    const { product_name, description, quantity } = req.body;

    await pool.query("BEGIN");

    // ตรวจสอบว่ามีสินค้าที่มีชื่อเดียวกันอยู่ในฐานข้อมูลหรือไม่
    const existingProduct = await pool.query(
      `SELECT product_id FROM products WHERE product_name = $1`,
      [product_name]
    );

    if (existingProduct.rows.length > 0) {
      //ถ้ามีสินค้าอยู่แล้วให้เพิ่มปริมาณสินค้าใน inventory
      const product_id = existingProduct.rows[0].product_id;

      await pool.query(
        `UPDATE inventory SET quantity= quantity + $1, last_update = NOW(), status = 'in'
        WHERE product_id = $2 AND (status = 'in' OR status = 'out')`,
        [quantity, product_id]
      );
      // Commit transaction
      await pool.query("COMMIT");
      res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
        product: {
          product_id: product_id,
          product_name: product_name,
          quantity: quantity,
        },
      });
    } else {
      // INSERT ข้อมูลลง database
      const result = await pool.query(
        `INSERT INTO products(product_name,description) VALUES($1,$2) RETURNING *`,
        [product_name, description]
      );

      const product_id = result.rows[0].product_id;

      // เพิ่มข้อมูลลงใน tabale inventory
      await pool.query(
        `INSERT INTO inventory(product_id,quantity,create_at,last_update,status)VALUES($1,$2,NOW(),NOW(),$3)`,
        [product_id, quantity, "in"]
      );

      await pool.query("COMMIT");
      res.status(200).json({ success: true, product: result.rows[0] });
    }
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ success: false, error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  const { product_name, quantity } = req.body;

  try {
    // เริ่ม transaction
    await pool.query("BEGIN");

    // ตรวจสอบว่าสินค้ามีอยู่ในฐานข้อมูลหรือไม่
    const result = await pool.query(
      `SELECT product_id FROM products WHERE product_name = $1`,
      [product_name]
    );
    
    if (result.rows.length === 0) {
      throw new Error("Product not found");
    }

    const product_id = result.rows[0].product_id;

    // อัพเดทข้อมูล inventory
    await pool.query(
      `UPDATE inventory 
      SET quantity = quantity + $1, last_update = NOW(), status = 'in'
      WHERE product_id = $2 AND (status = 'in' OR status = 'out')`,
      [quantity, product_id]
    );

    // Commit transaction
    await pool.query("COMMIT");

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
    });
  } catch (error) {
    // Rollback transaction ในกรณีที่เกิดข้อผิดพลาด
    await pool.query("ROLLBACK");
    console.error("Error updating product quantity", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { addProduct, updateProduct };
