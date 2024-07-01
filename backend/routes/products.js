const express = require("express");
const router = express.Router();
const { addProduct, updateProduct } = require("../controllers/productsController");


router.post('/add-product',addProduct);
router.put('/update-product',updateProduct)

module.exports = router