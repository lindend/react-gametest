import {
  configureStore,
  createListenerMiddleware,
  ListenerEffectAPI,
  TypedAddListener,
  TypedStartListening,
} from "@reduxjs/toolkit";
import cardSlotsReducer from "./model/cardSlotSlice";
import gameReducer from "./model/gameSlice";
import animationReducer from "./model/animationSlice";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    cardSlots: cardSlotsReducer,
    game: gameReducer,
    animation: animationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;
