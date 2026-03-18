// src/features/auth/auth.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://69b7c533ffbcd02860961cc8.mockapi.io/crud";
const savedUser = localStorage.getItem("user");

const initialState = {
  data: savedUser ? JSON.parse(savedUser) : {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

// SIGN UP
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, role }, thunkAPI) => {
    try {
      // existing users filter by email AND role
      const { data: existing } = await axios.get(API_URL, {
        params: { email },
      });

      // check if same role already exists
      const duplicate = existing.find((user) => user.role === role);
      if (duplicate) {
        return thunkAPI.rejectWithValue({
          error: "User with this email and role already exists!",
        });
      }

      // otherwise, create new user
      const response = await axios.post(API_URL, { email, password, role });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: "Signup failed!" });
    }
  }
);

// LOGIN

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, { params: { email } });
      const users = response.data;
      const foundUser = users.length ? users[0] : null;

      if (!foundUser) {
        return thunkAPI.rejectWithValue({ error: "User not found!" });
      }

      if (foundUser.password !== password) {
        return thunkAPI.rejectWithValue({ error: "Invalid password!" });
      }

      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      return userData;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: "Login failed!" });
    }
  }
);
// RESET PASSWORD

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, role, newPassword }, thunkAPI) => {
    try {
      const { data: users } = await axios.get(API_URL, { params: { email } });

      const user = users.find((u) => u.role === role);

      if (!user) {
        return thunkAPI.rejectWithValue({
          error: "User with this email and role not found!",
        });
      }

      const updatedUser = { ...user, password: newPassword };
      await axios.put(`${API_URL}/${user.id}`, updatedUser);

      return { message: "Password reset successfully!" };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: "Password reset failed!" });
    }
  }
);

// SLICE

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      localStorage.removeItem("user");
      return {
        data: {},
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
      })

      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;
