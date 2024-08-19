import type { Stadium } from "@prisma/client";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_TEAM: Stadium = {
  id: "",
  names: [""],
  club: "",
  capacity: 0,
  latitude: 0,
  longitude: 0,
  league: null,
};

interface GameState {
  stadiums: Stadium[];
  currentStadium: Stadium;
  stadiumsRemaining: number;

  score: number;
  timeRemaining: number;
  userHasFinishedGame: boolean;

  correctStadiumIds: string[];
  incorrectStadiumIds: string[];
}

const initialState: GameState = {
  stadiums: [INITIAL_TEAM],
  currentStadium: INITIAL_TEAM,
  stadiumsRemaining: 20,

  score: 0,
  timeRemaining: 90,
  userHasFinishedGame: false,

  correctStadiumIds: [],
  incorrectStadiumIds: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStadiums(state, action: PayloadAction<Stadium[]>) {
      state.stadiums = action.payload;
    },

    setCurrentStadium(state, action: PayloadAction<Stadium>) {
      state.currentStadium = action.payload;
    },

    incrementCurrentStadium(state) {
      const nextStadiumIndex =
        state.stadiums.findIndex(
          (stadium) => stadium.id === state.currentStadium.id,
        ) + 1;

      if (nextStadiumIndex === state.stadiums.length - 1) return;

      if (state.stadiums[nextStadiumIndex]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.currentStadium = state.stadiums[nextStadiumIndex]!;
      } else return;
    },

    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },

    setStadiumsRemaining(state, action: PayloadAction<number>) {
      state.stadiumsRemaining = action.payload;
    },

    decrementStadiumsRemaining(state) {
      if (state.stadiumsRemaining > 0) state.stadiumsRemaining--;
    },

    decrementTimeRemaining(state) {
      state.timeRemaining--;
    },

    resetZoom(state) {
      state.currentStadium = {
        ...state.currentStadium,
      };
    },

    setUserHasFinishedGame(state, action: PayloadAction<boolean>) {
      state.userHasFinishedGame = action.payload;
    },

    addCorrectStadiumId(state, action: PayloadAction<string>) {
      state.correctStadiumIds.push(action.payload);
    },

    addIncorrectStadiumId(state, action: PayloadAction<string>) {
      state.incorrectStadiumIds.push(action.payload);
    },

    resetGame(state) {
      state.stadiums = initialState.stadiums;
      state.currentStadium = initialState.currentStadium;
      state.stadiumsRemaining = initialState.stadiumsRemaining;
      state.score = initialState.score;
      state.timeRemaining = initialState.timeRemaining;
      state.userHasFinishedGame = initialState.userHasFinishedGame;
    },
  },
});

export const {
  setStadiums,
  setCurrentStadium,
  incrementCurrentStadium,
  incrementScore,
  setStadiumsRemaining,
  decrementStadiumsRemaining,
  decrementTimeRemaining,
  resetZoom,
  setUserHasFinishedGame,
  addCorrectStadiumId,
  addIncorrectStadiumId,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
