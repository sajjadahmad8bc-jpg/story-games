import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hum direct ID 1 ko hit karenge kyunki sara data wahin nested hai
const BASE_URL = "https://69b7c533ffbcd02860961cc8.mockapi.io/crud/1"; 

// ✅ Fetch Books
export const fetchBooks = createAsyncThunk("writer/fetchBooks", async () => {
  const res = await axios.get(BASE_URL);
  return res.data.books || []; // nested books array nikalna
});

// ✅ Fetch Chapters
export const fetchChapters = createAsyncThunk("writer/fetchChapters", async () => {
  const res = await axios.get(BASE_URL);
  // Agar chapters books ke andar hain to wahan se nikalein, 
  // filhal main books return kar raha hoon taake error na aaye
  return res.data.books || []; 
});

// ✅ Fetch Characters
export const fetchCharacters = createAsyncThunk("writer/fetchCharacters", async () => {
  const res = await axios.get(BASE_URL);
  return res.data.characters || []; // nested characters array nikalna
});

// ✅ Fetch Favourite
export const fetchFavourite = createAsyncThunk("writer/fetchFavourite", async () => {
  const res = await axios.get(BASE_URL);
  return res.data.favourite || []; // nested favourite array nikalna
});

const initialState = {
  books: [],
  chapters: [],
  characters: [],
  favourite: [],   
  loading: false,
  error: null,
};

const writerSlice = createSlice({
  name: "writer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Chapters
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.chapters = action.payload;
      })

      // Fetch Characters
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
      })

      // Fetch Favourite
      .addCase(fetchFavourite.fulfilled, (state, action) => {
        state.favourite = action.payload;
      });
  },
});

export default writerSlice.reducer;