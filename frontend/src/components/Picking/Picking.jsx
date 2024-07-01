import React, { useEffect, useState } from "react";
import { fetchProduct } from "../../utility/apiService";
import "./picking.css";
import axios from "axios";

const Picking = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [pickingProduct, setPickingProduct] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    fetchProduct(setProducts);
  }, []);

  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedProductId || quantity <= 0) {
      setResponseMessage("Failed to picking");
      setPickingProduct(null);
      setIsSuccess(false);
      return;
    }

    const selectedProduct = products.find(
      (product) => product.product_id === parseInt(selectedProductId, 10)
    );
    const productName = selectedProduct ? selectedProduct.product_name : "";

    try {
      const response = await axios.post(
        "http://localhost:5500/withdraw-product",
        {
          product_id: parseInt(selectedProductId, 10),
          quantity: parseInt(quantity, 10),
        }
      );
      if (response.data.success) {
        // ส่งข้อมูลไปยัง ช่อง แสดงสถานะว่ามีการเบิกออกสำเร็จหลังกด confirm
        setPickingProduct({
          productName,
          quantity: parseInt(quantity, 10),
        });
        setResponseMessage("Picking finish");
        setIsSuccess(true);
        fetchProduct(setProducts); //  Refesh ข้อมูลสินค้าหลังจากเบิกสินค้า
      } else {
        setPickingProduct(null);
        setIsSuccess(false);
        setResponseMessage("fail to pick: " + response.data.error);
      }
    } catch (error) {
      setPickingProduct(null);
      setIsSuccess(false);
      setResponseMessage("Out of product");
    }
  };

  return (
    <div className="container_picking">
      <div className="items_picking">
        {/* Header */}
        <div className="header_picking">
          <p>picking</p>
        </div>
        <div>
          {/* output items */}
          <div className="input_picking">
            <p>Product</p>
            <select
              name="picking"
              id="picking"
              value={selectedProductId}
              onChange={handleProductChange}
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>
          <div className="input_picking">
            <p>Quaitity</p>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          {/* confirm picking */}
          <div className="button_picking">
            <button onClick={handleSubmit}>confirm picking</button>
          </div>
        </div>

        {/* message picking */}
        {responseMessage && (
          <div className="message_picking">
            <p
              style={{
                backgroundColor: isSuccess ? "green" : "red",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {responseMessage}
            </p>
          </div>
        )}

        {/* แสดงสถานะเบิกออก */}
        <div style={{ padding: "1rem" }}>
          {/* หัวเรื่อง items เบิกออกสำเร็จ */}
          <div className="confirm_picking">
            <div>
              <p>SKU</p>
            </div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <p>Quantity</p>
            </div>
          </div>
          {/* แสดง items เบิกออก */}
          {pickingProduct && (
            <div className="confirm_picking">
              <div>
                <p>{pickingProduct.productName}</p>
              </div>
              <div style={{ width: "100%", textAlign: "left" }}>
                <p>{pickingProduct.quantity}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Picking;
