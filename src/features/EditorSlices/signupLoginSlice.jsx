import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ BASE URL (ID 1 ke saath taake nested data access ho sake)
const BASE_URL = "https://69b7c533ffbcd02860961cc8.mockapi.io/crud/1";

// ✅ LOGIN (NEW - Vercel compatible)
export const loginUser = createAsyncThunk(
  "loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      // Nested users array mein dhundna hai
      const users = data.users || [];
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      return user;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

// ✅ CREATE
export const createUser = createAsyncThunk(
  "createUser",
  async (userData, { rejectWithValue }) => {
    try {
      // 1. Pehle pura object mangwayein
      const res = await fetch(BASE_URL);
      const projectData = await res.json();
      
      // 2. Naya user array mein add karein
      const newUser = { ...userData, id: Date.now().toString() };
      const updatedData = { 
        ...projectData, 
        users: [...(projectData.users || []), newUser] 
      };

      // 3. Poora object wapis PUT karein
      const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to create");
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ READ
export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(BASE_URL);
    const res = await response.json();
    return res.users || []; // Sirf users ka array return karein
  } catch (error) {
    return rejectWithValue("Failed to fetch users");
  }
});

// ✅ UPDATE
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch(BASE_URL);
      const projectData = await res.json();

      const updatedUsers = projectData.users.map((ele) =>
        ele.id === data.id ? data : ele
      );

      const response = await fetch(BASE_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...projectData, users: updatedUsers }),
      });

      const result = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ SLICE
export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
    currentUser: null, // 👈 login user
  },
  reducers: {
    searchUsers: (state, action) => {
      state.searchData = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // READ
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
export const { searchUsers, logout } = userDetail.actions;