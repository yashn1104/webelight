import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/Actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, pwd);

    // try {
    //   const response = await fetch("http://localhost:5000/login", {
    //     method: "post",
    //     body: JSON.stringify({ email, pwd }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   });

    //   const result = await response.json();
    //   console.log(result);

    //   if (result.auth) {
    //     localStorage.setItem("user", JSON.stringify(result.user));
    //     localStorage.setItem("token", JSON.stringify(result.auth));
    //     navigate("/");
    //   } else {
    //     alert("Please Enter Correct Credentials");
    //   }
    // } catch (error) {
    //   console.error("Login Error:", error);
    // }

    dispatch(loginUser({ email, pwd }))
    .then((response) => {
      if (response.payload.auth) {
        localStorage.setItem("user", JSON.stringify(response.payload.user));
        localStorage.setItem("token", JSON.stringify(response.payload.auth));
        navigate("/");
      } else {
        alert("Please Enter Correct Credentials");
      }
    })
    .catch((error) => {
      console.error("Login Error:", error);
    });
  };
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <div className="d-flex justify-content-center mb-3">
        <h1>Login</h1>
      </div>
      <div className="form">
        <form>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control px-5"
                id="inputPassword3"
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleLogin}
              type="submit"
              className="btn btn-primary w-25"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
