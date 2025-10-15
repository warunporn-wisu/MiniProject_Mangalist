import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { Manga } from "../types/manga";

type MangaState = {
  items: Manga[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  count: number;
  limit: number;
  offset: number;
  query: string;
  ordering: string;
};

const initialState: MangaState = {
  items: [],
  status: "idle",
  count: 0,
  limit: 20,
  offset: 0,
  query: "",
  ordering: "",
};

export const fetchManga = createAsyncThunk<
  { data: Manga[]; count?: number },
  { offset?: number; limit?: number }
>(
  "manga/fetchManga",
  async ({ offset = 0, limit = 20 }) => {
    const page = offset / limit + 1;
    const url = `https://api.jikan.moe/v4/manga?page=${page}&limit=${limit}`;
    const res = await axios.get(url, { timeout: 15000 });
    return { data: res.data.data, count: 1000 };
  }
);

const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManga.pending, (state) => {
        state.status = "loading";
        state.error = undefined;
      })
      .addCase(fetchManga.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.data;
        state.count = action.payload.count ?? state.items.length;
      })
      .addCase(fetchManga.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetch failed";
      });
  },
});

export const { setOffset, setQuery, setOrdering, reset } = mangaSlice.actions;
export default mangaSlice.reducer;
