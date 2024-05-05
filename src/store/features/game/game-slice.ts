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
    /**
     * Takes in an array of Stadium
     * to be set into current game state.
     */
    setStadiums(state, action: PayloadAction<Stadium[]>) {
      state.stadiums = action.payload;
    },

    /**
     * Sets current stadium to the payload.
     */
    setCurrentStadium(state, action: PayloadAction<Stadium>) {
      state.currentStadium = action.payload;
    },

    /**
     * Sets current stadium to the next stadium unless already at last stadium.
     */
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

    /**
     * Adds payload to the current score.
     */
    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },

    /**
     * Sets stadiums left based on payload.
     */
    setStadiumsRemaining(state, action: PayloadAction<number>) {
      state.stadiumsRemaining = action.payload;
    },

    /**
     * Decrements stadiums left by 1.
     */
    decrementStadiumsRemaining(state) {
      if (state.stadiumsRemaining > 0) state.stadiumsRemaining--;
    },

    /**
     * Decrements timeRemaining by 1.
     */
    decrementTimeRemaining(state) {
      state.timeRemaining--;
    },

    /**
     * Resets zoom level by recreating currentStadium state.
     *
     * (This is hacky)
     */
    resetZoom(state) {
      state.currentStadium = {
        ...state.currentStadium,
      };
    },

    /**
     * Sets userHasFinishedGame based on payload
     */
    setUserHasFinishedGame(state, action: PayloadAction<boolean>) {
      state.userHasFinishedGame = action.payload;
    },

    /**
     * Adds a team id to correctStadiumIds based on payload
     */
    addCorrectStadiumId(state, action: PayloadAction<string>) {
      state.correctStadiumIds.push(action.payload);
    },

    /**
     * Adds a team id to incorrectStadiumIds based on payload
     */
    addIncorrectStadiumId(state, action: PayloadAction<string>) {
      state.incorrectStadiumIds.push(action.payload);
    },

    /**
     * Resets game state to inital state
     */
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
