import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [pwd, setpwd] = React.useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log(email, pwd);

    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, pwd }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please Enyter a Correct result");
    }
  };

  React.useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

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
                onChange={(e) => setpwd(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleLogin}
              type="submit"
              className="btn btn-primary w-25 "
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
