import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface gameState {
  score: number;
  currentTeamId: string | null;
}

const initialState: gameState = {
  score: 0,
  currentTeamId: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
    decrementScore(state, action: PayloadAction<number>) {
      state.score -= action.payload;
    },
    setCurrentTeamId(state, action: PayloadAction<string>) {
      state.currentTeamId = action.payload;
    },
  },
});

export const { incrementScore, decrementScore } = gameSlice.actions;
export default gameSlice.reducer;
