import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Team } from "@prisma/client";

interface gameState {
  score: number;
  currentTeam: Team;
  teamsLeft: number;
  timeRemaining: number;
  gameOngoing: boolean;
}

const initialState: gameState = {
  score: 0,
  currentTeam: {
    id: "1",
    name: "1",
    alternativeName: "1",
    stadium: "1",
    capacity: 1,
    latitude: 1,
    longitude: 1,
  },
  teamsLeft: 20,
  timeRemaining: 180,
  gameOngoing: false,
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
    updateTeam(state, action: PayloadAction<Team | undefined>) {
      if (typeof action.payload !== "undefined")
        state.currentTeam = action.payload;
    },
    removeTeamLeft(state) {
      if (state.teamsLeft) state.teamsLeft--;
    },
    updateTimeRemaining(state) {
      if (!state.gameOngoing) {
        state.timeRemaining = 0;
      } else {
        state.timeRemaining--;
      }
    },
    setGameOngoing(state, action: PayloadAction<boolean>) {
      state.gameOngoing = action.payload;
    },
    resetZoom(state) {
      state.currentTeam = {
        ...state.currentTeam,
      };
    },
  },
});

export const {
  incrementScore,
  decrementScore,
  updateTeam,
  removeTeamLeft,
  updateTimeRemaining,
  setGameOngoing,
  resetZoom,
} = gameSlice.actions;
export default gameSlice.reducer;
