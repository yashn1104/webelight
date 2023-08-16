import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProduct, deleteProduct } from "../redux/Slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
      }
    } else {
      // getProducts();
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
        />
      </div>
      <table className="table m-auto table-bordered text-center mt-4 h-25 w-75">
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
        <tbody>
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
                      onClick={() => dispatch(deleteProduct(data._id))}
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
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
