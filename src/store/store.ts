import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/game/game-slice";
import timerReducer from "./features/timer/timer-slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    timer: timerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
