import { createAsyncThunk } from "@reduxjs/toolkit";
export const addUser = createAsyncThunk(
  "addUser",
  async ({ name, email, pwd }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "post",
        body: JSON.stringify({ name, email, pwd }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth));
        return result.result;
      } else {
        throw new Error("Registration Failed");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, pwd }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({ email, pwd }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const result = await response.json();
      console.log(result);

      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        return result;
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
