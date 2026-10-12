import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";
import planReducer from "./planSlice";

export const store = configureStore({
  reducer: { destinations: destinationReducer, plan: planReducer }
});
