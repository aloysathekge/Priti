import { configureStore } from "@reduxjs/toolkit";
import NotesReducer from "./BalanceSlice";
export const store = configureStore({
  reducer: {
    notes: NotesReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
