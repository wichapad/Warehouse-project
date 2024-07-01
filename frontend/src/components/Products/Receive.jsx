import React from "react";
import "../Inventory/inventory.css";
import "./receive.css";

const Receive = () => {
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
            <input type="text" />
          </div>
          <div className="input_receive">
            <p>Quaitity</p>
            <input type="number" />
          </div>
          {/* confirm receive */}
          <div className="button_receive">
            <button>confirm receive</button>
          </div>
        </div>

        {/* แสดงสถานะรับเข้า */}
        <div style={{ padding: "1rem" }}>
          {/* หัวเรื่อง items รับเข้าสำเร็จ */}
          <div className="confirm_receive">
            <div>
              <p>SKU</p>
            </div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <p>Quantity</p>
            </div>
          </div>
          {/* แสดง items รับเข้า */}
          <div className="confirm_receive">
            <div>
              <p>SKU</p>
            </div>
            <div style={{ width: "100%", textAlign: "left" }}>
              <p>Quantity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receive;
