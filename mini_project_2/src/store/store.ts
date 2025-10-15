import { configureStore } from "@reduxjs/toolkit";
import mangaReducer from "./mangaSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    manga: mangaReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
