import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !pwd) {
      setError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, pwd }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json()
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="">
      <div className="d-flex justify-content-center mb-3">
        <h1>Register</h1>
      </div>
      <div className="form">
        <form>
          <div className="row mb-3">
            <label htmlFor="inputname" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error && !name && (
                <span className="text-danger d-block">Enter a valid name</span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && !email && (
                <span className="text-danger d-block ">
                  Enter a valid Email
                </span>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control px-5"
                id="inputPassword3"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              {error && !pwd && (
                <span className="text-danger d-block ">
                  Enter a valid password
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary w-25"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
