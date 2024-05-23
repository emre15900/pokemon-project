import { configureStore } from "@reduxjs/toolkit";
import savedCardsReducer from "./slices/savedCardsSlice";

const store = configureStore({
  reducer: {
    savedCards: savedCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
