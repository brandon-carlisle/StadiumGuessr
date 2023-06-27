import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './features/game/game-slice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
