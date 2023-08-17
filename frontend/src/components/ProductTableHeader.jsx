// ProductTableHeader.js
import React from "react";

const ProductTableHeader = () => {
  return (
    <thead className="table-dark">
      <tr>
        <th>Sr. No.</th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Company</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
};

export default ProductTableHeader;
