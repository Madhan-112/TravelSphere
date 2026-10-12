import { createSlice } from "@reduxjs/toolkit";

const getInitial = () => {
  try { return JSON.parse(localStorage.getItem("travelsphere-plan")) || { title: "My next adventure", destinationIds: [], days: 3, notes: "" }; }
  catch { return { title: "My next adventure", destinationIds: [], days: 3, notes: "" }; }
};

const planSlice = createSlice({
  name: "plan",
  initialState: getInitial(),
  reducers: {
    toggleDestination: (state, action) => {
      const id = action.payload;
      state.destinationIds = state.destinationIds.includes(id) ? state.destinationIds.filter(x => x !== id) : [...state.destinationIds, id];
    },
    updatePlan: (state, action) => Object.assign(state, action.payload),
    clearPlan: (state) => { state.title = "My next adventure"; state.destinationIds = []; state.days = 3; state.notes = ""; }
  }
});
export const { toggleDestination, updatePlan, clearPlan } = planSlice.actions;
export default planSlice.reducer;
