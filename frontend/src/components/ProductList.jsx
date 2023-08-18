import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getProduct,
  deleteProduct,
  searchProduct,
} from "../redux/Slices/productSlice";
import ProductTable from "./ProductTable";
import ProductTableHeader from "./ProductTableHeader";
const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const searchHandle = async (e) => {
    // const key = e.target.value;
    // setSearchKey(key);

    // if (key) {

    //   const result = await fetch(`http://localhost:5000/search/${key}`, {
    //     headers: {
    //       authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //     },
    //   });
    //   const resultData = await result.json();
    //   if (resultData) {
    //     setSearchKey(resultData);
    //   }
    // } else {
    //   dispatch(getProduct());
    // }
    const key = e.target.value;
    setSearchKey(key);

    dispatch(searchProduct(key));
  };

  const handleDelete = async (productId) => {
    const response = await dispatch(deleteProduct(productId));
    if (response.meta.requestStatus === "fulfilled") {
      dispatch(getProduct());
    }
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="container">
      <div className="m-auto w-75 h-50  my-4">
        <input
          type="text"
          className="p-2 w-100 h-100 border"
          placeholder="Search Product"
          onChange={searchHandle}
          value={searchKey}
        />
      </div>
      <table className="table m-auto table-bordered text-center mt-4 h-25 w-75">
        {/* <thead className="table-dark">
          <tr>
            <th>Sr. No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Company</th>
            <th>Category</th>

            <th>Actions</th>
          </tr>
        </thead> */}
        {/* <tbody>
          {products?.length > 0 ? (
            products?.map((data, index) => {
              return (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.price}</td>
                  <td>{data.company}</td>
                  <td>{data.category}</td>
                  <td className="">
                    <Link to={`/update/${data._id}`}>
                      <button
                        className="m-1 bg-success text-light"
                        type="submit"
                      >
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
              );
            })
          ) : (
            <h1>Result Not found !</h1>
          )}
        </tbody> */}
        <ProductTableHeader />
        <ProductTable products={products} handleDelete={handleDelete} />
      </table>
    </div>
  );
};

export default ProductList;
