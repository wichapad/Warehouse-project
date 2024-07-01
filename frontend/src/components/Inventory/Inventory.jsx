import React from "react";
import "./inventory.css";

const Inventory = () => {
  return (
      
    // </div>
    <div className="contaner_stock">
    <div>
      {/* items stock */}
      <div className="items_stock">
        <div>
          <h1>inventory</h1>
        </div>
        <div className="stock_filter">
          <input type="text" placeholder="Search products..." />
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
          <table style={{ width: "80%" }}>
            <thead>
              <tr>
                <th >Product ID</th>
                <th style={{ width: "500px" }}>Product Name</th>
                <th >Quantity</th>
                <th >Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>product1</td>
                <td>1</td>
                <td>In</td>
              </tr>
              <tr>
                <td>2</td>
                <td>product2</td>
                <td>2</td>
                <td>In</td>
              </tr>
              <tr>
                <td>3</td>
                <td>product3</td>
                <td>3</td>
                <td>In</td>
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Inventory;
