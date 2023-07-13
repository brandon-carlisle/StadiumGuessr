import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/game/game-slice";

export const reduxStore = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppDispatch = typeof reduxStore.dispatch;
export type RootState = ReturnType<typeof reduxStore.getState>;
