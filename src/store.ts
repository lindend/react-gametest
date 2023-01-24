import { configureStore } from "@reduxjs/toolkit";
import cardSlotsReducer from "./model/cardSlotSlice";
import gameReducer from "./model/gameSlice";

export const store = configureStore({
  reducer: {
    cardSlots: cardSlotsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
