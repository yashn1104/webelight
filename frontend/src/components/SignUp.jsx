import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // const validateForm = () => {
  //   if (name.length == 0) {
  //     alert("Invalid Form, First Name can not be empty");
  //     return;
  //   }

  //   if (email.length == 0) {
  //     alert("Invalid Form, Email Address can not be empty");
  //     return;
  //   }
  //   if (pwd.length < 8) {
  //     alert(
  //       "Invalid Form, Password must contain greater than or equal to 8 characters."
  //     );
  //     return;
  //   }

  //   let countUpperCase = 0;
  //   let countLowerCase = 0;
  //   let countDigit = 0;
  //   let countSpecialCharacters = 0;

  //   for (let i = 0; i < pwd.length; i++) {
  //     const specialChars = [
  //       "!",
  //       "@",
  //       "#",
  //       "$",
  //       "%",
  //       "^",
  //       "&",
  //       "*",
  //       "(",
  //       ")",
  //       "_",
  //       "-",
  //       "+",
  //       "=",
  //       "[",
  //       "{",
  //       "]",
  //       "}",
  //       ":",
  //       ";",
  //       "<",
  //       ">",
  //     ];

  //     if (specialChars.includes(pwd[i])) {
  //       countSpecialCharacters++;
  //     } else if (!isNaN(pwd[i] * 1)) {
  //       countDigit++;
  //     } else {
  //       if (pwd[i] == pwd[i].toUpperCase()) {
  //         countUpperCase++;
  //       }
  //       if (pwd[i] == pwd[i].toLowerCase()) {
  //         countLowerCase++;
  //       }
  //     }
  //   }

  //   if (countLowerCase == 0) {
  //     alert("Invalid Form, 0 lower case characters in password");
  //     return;
  //   }

  //   if (countUpperCase == 0) {
  //     alert("Invalid Form, 0 upper case characters in password");
  //     return;
  //   }

  //   if (countDigit == 0) {
  //     alert("Invalid Form, 0 digit characters in password");
  //     return;
  //   }

  //   if (countSpecialCharacters == 0) {
  //     alert("Invalid Form, 0 special characters in password");
  //     return;
  //   }

  //   alert("Form is valid");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !pwd) {
      setError(true);
      return false;
    }
    
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, pwd }),
      headers: {
        "content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  };

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

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
                <span className="text-danger d-block ">Enter a valid name</span>
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
              className="btn btn-primary w-25 "
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
