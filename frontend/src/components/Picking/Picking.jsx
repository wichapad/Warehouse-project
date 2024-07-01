import React from 'react'
import './picking.css'

const Picking = () => {
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
          <select name="picking" id="picking">
            <option value="item1">item1</option>
            <option value="item2">item2</option>
            <option value="item3">item3</option>
          </select>
        </div>
        <div className="input_picking">
          <p>Quaitity</p>
          <input type="number" />
        </div>
        {/* confirm picking */}
        <div className="button_picking">
          <button>confirm picking</button>
        </div>
      </div>

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
        <div className="confirm_picking">
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
  )
}

export default Picking