import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/game/game-slice";
import mapReducer from "./features/map/map-slice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    map: mapReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
