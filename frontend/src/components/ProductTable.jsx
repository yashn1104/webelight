// ProductTable.js
import React from "react";
import { Link } from "react-router-dom";

const ProductTable = ({ products, handleDelete }) => {
  return (
    <tbody>
      {products?.length > 0 ? (
        products?.map((data, index) => (
          <tr key={data._id}>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{data.price}</td>
            <td>{data.company}</td>
            <td>{data.category}</td>
            <td className="">
              <Link to={`/update/${data._id}`}>
                <button className="m-1 bg-success text-light" type="submit">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(data._id)}
                className="bg-danger text-light"
                type="submit"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6">Result Not found !</td>
        </tr>
      )}
    </tbody>
  );
};

export default ProductTable;
