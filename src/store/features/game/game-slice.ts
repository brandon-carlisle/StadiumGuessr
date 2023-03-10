import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Team } from "@prisma/client";

interface gameState {
  score: number;
  currentTeam: Team;
  teamsLeft: number;
  timeRemaining: number;
  userHasFinishedGame: boolean;
}

const initialState: gameState = {
  score: 0,
  currentTeam: {
    id: "1",
    name: "1",
    alternativeName: "1",
    stadium: "1",
    alternativeStadium: "",
    capacity: 1,
    latitude: 1,
    longitude: 1,
  },
  teamsLeft: 20,
  timeRemaining: 120,
  userHasFinishedGame: false,
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
      state.teamsLeft--;
    },
    updateTimeRemaining(state) {
      state.timeRemaining--;
    },
    resetZoom(state) {
      state.currentTeam = {
        ...state.currentTeam,
      };
    },
    resetGame(state) {
      state.score = initialState.score;
      state.currentTeam = initialState.currentTeam;
      state.teamsLeft = initialState.teamsLeft;
      state.timeRemaining = initialState.timeRemaining;
      state.userHasFinishedGame = false;
    },
    updateUserHasFinishedGame(state, action: PayloadAction<boolean>) {
      state.userHasFinishedGame = action.payload;
    },
  },
});

export const {
  incrementScore,
  decrementScore,
  updateTeam,
  removeTeamLeft,
  updateTimeRemaining,
  resetZoom,
  resetGame,
  updateUserHasFinishedGame,
} = gameSlice.actions;
export default gameSlice.reducer;
