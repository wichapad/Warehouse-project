import React, { useEffect, useState } from "react";
import { fetchProduct } from "../../utility/apiService";
import "./inventory.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProduct(setProducts);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInventory = products.filter((item) =>
    item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table style={{ width: "80%" }}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th style={{ width: "500px" }}>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              {filteredInventory.map((item) => (
                <tbody key={item.product_id}>
                  <tr>
                    <td>{item.product_id}</td>
                    <td>{item.product_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.status}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
