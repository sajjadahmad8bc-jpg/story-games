import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://68c02ee30b196b9ce1c3870f.mockapi.io/crud"; 

export const fetchBooks = createAsyncThunk("writer/fetchBooks", async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
});

export const fetchChapters = createAsyncThunk("writer/fetchChapters", async () => {
  const res = await axios.get(`${BASE_URL}/chapters`);
  return res.data;
});

export const fetchCharacters = createAsyncThunk("writer/fetchCharacters", async () => {
  const res = await axios.get(`${BASE_URL}/characters`);
  return res.data;
});

export const fetchFavourite = createAsyncThunk("writer/fetchFavourite", async () => {
  const res = await axios.get(`${BASE_URL}/favourite`);
  return res.data;
});
  const initialState ={
    books: [],
    chapters: [],
    characters: [],
    favourite: [],   
    loading: false,
    error: null,
  }
const writerSlice = createSlice({
  name: "writer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.chapters = action.payload;
      })

      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload;
      })

      .addCase(fetchFavourite.fulfilled, (state, action) => {
        state.favourite = action.payload;
      });
  },
});

export default writerSlice.reducer;
