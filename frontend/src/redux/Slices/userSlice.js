import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
        return result; // You can return the result here if needed
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      return rejectWithValue(error.message); // Pass the error message
    }
  }
);
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
