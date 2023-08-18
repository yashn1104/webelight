import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../redux/Actions/productActions";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    // const userId = JSON.parse(localStorage.getItem("user"))._id;
    // let result = await fetch("http://localhost:5000/add-product", {
    //   method: "post",
    //   body: JSON.stringify({ name, price, category, company, userId }),
    //   headers: {
    //     "Content-type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //   },
    // });
    // result = await result.json();
    dispatch(addProduct({ name, price, category, company }));
    navigate("/");
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center mb-3">
        <h1>Add Product</h1>
      </div>
      <div className="form">
        <form className="">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              id="exampleInputName"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            {error && !name && (
              <span className="text-danger d-block ">Enter a valid name</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              value={price}
              id="exampleInputPrice"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            {error && !price && (
              <span className="text-danger d-block ">Enter a valid price</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputCategory" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              value={category}
              id="exampleInputCategory"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            {error && !category && (
              <span className="text-danger d-block ">
                Enter a valid category
              </span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputCompany" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              value={company}
              id="exampleInputCompany"
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
            {error && !company && (
              <span className="text-danger d-block ">
                Enter a valid company
              </span>
            )}
          </div>

          <div className="d-flex justify-content-center">
            <button
              onClick={handleAddProduct}
              type="submit"
              className="btn btn-primary w-50 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
