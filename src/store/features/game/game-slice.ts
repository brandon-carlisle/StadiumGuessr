import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Team } from "@prisma/client";

interface gameState {
  score: number;
  currentTeam: Team | null;
  teamsLeft: number;
  timeRemaining: number;
}

const initialState: gameState = {
  score: 0,
  currentTeam: null,
  teamsLeft: 20,
  timeRemaining: 120,
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
    removeTeamLeft(state) {
      if (state.teamsLeft) state.teamsLeft--;
    },
    updateTimeRemaining(state) {
      state.timeRemaining--;
    },
  },
});

export const {
  incrementScore,
  decrementScore,
  updateTeam,
  removeTeamLeft,
  updateTimeRemaining,
} = gameSlice.actions;
export default gameSlice.reducer;
