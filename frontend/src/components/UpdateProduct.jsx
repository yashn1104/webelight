import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const getProductDEtails = async () => {
    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  useEffect(() => {
    getProductDEtails();
  }, []);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center mb-3">
        <h1>Update Product</h1>
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
          </div>

          <div className="d-flex justify-content-center">
            <button
              onClick={handleUpdateProduct}
              type="submit"
              className="btn btn-primary w-50 "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
