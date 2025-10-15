import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  ids: JSON.parse(localStorage.getItem("favorites") || "[]") as number[],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.ids.includes(id)) {
        // ลบออกถ้ามีอยู่แล้ว
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        // เพิ่มถ้ายังไม่มี
        state.ids.push(id);
      }
      // ✅ บันทึกลง localStorage
      localStorage.setItem("favorites", JSON.stringify(state.ids));
    },
    clearFavorites: (state) => {
      state.ids = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;