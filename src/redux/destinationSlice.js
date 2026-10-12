import { createSlice } from "@reduxjs/toolkit";
import { starterDestinations } from "../data/destinations";

const saved = (() => {
  try { return JSON.parse(localStorage.getItem("travelsphere-destinations")); }
  catch { return null; }
})();

const destinationSlice = createSlice({
  name: "destinations",
  initialState: { items: Array.isArray(saved) && saved.length ? saved : starterDestinations },
  reducers: {
    addDestination: (state, action) => { state.items.unshift({ ...action.payload, id: Date.now(), rating: 4.7, highlights: action.payload.highlights || ["Explore local highlights"] }); },
    updateDestination: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteDestination: (state, action) => { state.items = state.items.filter(item => item.id !== action.payload); },
    resetDestinations: (state) => { state.items = starterDestinations; }
  }
});

export const { addDestination, updateDestination, deleteDestination, resetDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
