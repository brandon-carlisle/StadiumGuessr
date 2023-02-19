import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Team } from "@prisma/client";

interface gameState {
  score: number;
  currentTeam: Team | null;
}

const initialState: gameState = {
  score: 0,
  currentTeam: null,
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
    updateTeam(state, action: PayloadAction<Team>) {
      state.currentTeam = action.payload;
    },
  },
});

export const { incrementScore, decrementScore, updateTeam } = gameSlice.actions;
export default gameSlice.reducer;
