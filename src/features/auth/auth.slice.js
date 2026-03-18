// src/features/auth/auth.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL ke aage /1 laga diya hai kyunki humara sara data ID 1 ke andar hai
const API_URL = "https://69b7c533ffbcd02860961cc8.mockapi.io/crud/1";
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
      // 1. Pehle poora data fetch karein
      const { data: projectData } = await axios.get(API_URL);
      const allUsers = projectData.users || [];

      // 2. Check karein if same role already exists
      const duplicate = allUsers.find((user) => user.email === email && user.role === role);
      
      if (duplicate) {
        return thunkAPI.rejectWithValue({
          error: "User with this email and role already exists!",
        });
      }

      // 3. Create new user object
      const newUser = { 
        id: Date.now().toString(), 
        email, 
        password, 
        role 
      };

      // 4. Update poora project object (PUT request)
      const updatedData = { 
        ...projectData, 
        users: [...allUsers, newUser] 
      };
      
      const response = await axios.put(API_URL, updatedData);
      
      // Return naya user taake state update ho sake
      return newUser;
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
      // 1. Data fetch karein (ID 1 se)
      const { data: projectData } = await axios.get(API_URL);
      const users = projectData.users || [];

      // 2. Manual filter karein kyunki params ab object mein kaam nahi karte
      const foundUser = users.find((u) => u.email === email && u.password === password);

      if (!foundUser) {
        return thunkAPI.rejectWithValue({ error: "User not found or invalid password!" });
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
      const { data: projectData } = await axios.get(API_URL);
      const allUsers = projectData.users || [];

      const userIndex = allUsers.findIndex((u) => u.email === email && u.role === role);

      if (userIndex === -1) {
        return thunkAPI.rejectWithValue({
          error: "User with this email and role not found!",
        });
      }

      // 1. Password update karein local array mein
      const updatedUsersArray = [...allUsers];
      updatedUsersArray[userIndex] = { ...updatedUsersArray[userIndex], password: newPassword };

      // 2. Wapis MockAPI par poora data object PUT karein
      await axios.put(API_URL, { ...projectData, users: updatedUsersArray });

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