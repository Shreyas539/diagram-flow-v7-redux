import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./slices/topologySlice";

export const store = configureStore({
  reducer: {
    flow: flowReducer,
  },
  // Remove the middleware concatenation
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(historyMiddleware),
});
