// BalanceSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notes } from "./types";
export interface NotesState {
  notes: Notes[];
}

const initialState: NotesState = {
  notes: [
    {
      id: "2",
      title: "Build Layo soon",
      done: false,
    },
  ],
};

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Notes[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Notes>) => {
      state.notes.push(action.payload);
    },
    toggleNote: (state, action: PayloadAction<string>) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.done = !note.done;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
  },
});

export const { setNotes, addNote, toggleNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
