import React, { useState } from "react";
import axios from "axios";
import "../Inventory/inventory.css";
import "./receive.css";

const Receive = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [reciveedProduct, setReceivedProduct] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  // function event สำหรับ product_name
  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  // function event สำหรับ quantity
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  // post add-product
  const handleSubmit = async () => {
    // ถ้า productname และ qauntity เป็นค่าว่าง จะขึ้น errormessage
    if (!productName || quantity <= 0) {
      // message แสดงสถานะว่าการรับเข้าไม่สำเร็จ
      setResponseMessage("Failed to receive product");
      setReceivedProduct(null);
      setIsSuccess(false);
      return;
    }
    // response ข้อมูลด้วย POST ส่งข้อมูลไป database
    try {
      const response = await axios.post("http://localhost:5500/add-product", {
        product_name: productName,
        quantity: parseInt(quantity, 10),
      });
      // ส่งข้อมูลไปยัง ช่อง แสดงสถานะว่ามีการรับเข้าสำเร็จหลังกด confirm
      setReceivedProduct({
        productName,
        quantity: parseInt(quantity, 10),
      });
      // message แสดงสถานะว่ามีการรับเข้าสำเร็จ
      setResponseMessage("Finish receive the product");
      setIsSuccess(true);
    } catch (error) {
      setReceivedProduct(null);
      // message แสดงสถานะว่าเชื่อมต่อกับ database ไม่ได้
      setResponseMessage("error product");
      setIsSuccess(false);
    }
  };

  return (
    //   {/* รับเข้า items */}
    <div className="container_receive">
      <div className="items_receive">
        {/* Header */}
        <div className="header_receive">
          <p>Receive</p>
        </div>
        <div>
          {/* input items */}
          <div className="input_receive">
            <p>Product</p>
            <input
              type="text"
              value={productName}
              onChange={handleProductName}
            />
          </div>
          <div className="input_receive">
            <p>Quaitity</p>
            <input type="number" value={quantity} onChange={handleQuantity} />
          </div>

          {/* confirm receive */}
          <div className="button_receive">
            <button onClick={handleSubmit}>confirm receive</button>
          </div>
        </div>

        {/* message receive */}
        {responseMessage && (
          <div className="message_receive">
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

        {/* แสดงสถานะรับเข้า */}
        <div style={{ padding: "1rem" }}>
          {/* หัวเรื่อง items รับเข้าสำเร็จ */}
          <div className="confirm_receive">
            <div>
              <p>Product</p>
            </div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <p>Quantity</p>
            </div>
          </div>
          {/* แสดง items รับเข้า */}
          {reciveedProduct && (
            <div className="confirm_receive">
              <div>
                <p>{reciveedProduct.productName}</p>
              </div>
              <div style={{ width: "100%", textAlign: "left" }}>
                <p>{reciveedProduct.quantity}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Receive;
