import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/Actions/productActions";

const UpdateProduct = () => {
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState("");
  // const [category, setCategory] = useState("");
  // const [company, setCompany] = useState("");
  const [updateData, setUpdateData] = useState();
  const { products, loading } = useSelector((state) => state.products);
  const { id } = useParams();

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const getProductDEtails = async () => {
  //   let result = await fetch(`http://localhost:5000/update/${params.id}`, {
  //     headers: {
  //       authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
  //     },
  //   });
  //   result = await result.json();
  //   setName(result.name);
  //   setPrice(result.price);
  //   setCategory(result.category);
  //   setCompany(result.company);
  // };

  // useEffect(() => {
  //   getProductDEtails();
  // }, []);

  useEffect(() => {
    if (id) {
      const singleUser = products.filter((ele) => ele._id === id);
      setUpdateData(singleUser[0]);
    }
  }, []);
  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  console.log("updated data", updateData);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // let result = await fetch(`http://localhost:5000/update/${params.id}`, {
    //   method: "put",
    //   body: JSON.stringify({ name, price, category, company }),
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
    //   },
    // });
    // result = await result.json();
    // if (result) {
    //   navigate("/");
    // }
    dispatch(updateProduct(updateData));
    navigate("/");
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
              value={updateData && updateData.name}
              id="exampleInputName"
              onChange={newData}
              name="name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              value={updateData && updateData.price}
              id="exampleInputPrice"
              onChange={newData}
              name="price"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputCategory" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              value={updateData && updateData.category}
              id="exampleInputCategory"
              onChange={newData}
              name="category"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputCompany" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              value={updateData && updateData.company}
              id="exampleInputCompany"
              onChange={newData}
              name="company"
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
