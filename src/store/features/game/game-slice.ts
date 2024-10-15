import { type StadiumLocal } from "@/types/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface GameState {
  // this is our initial stadiums when the game first starts
  stadiums: StadiumLocal[] | null;
  currentStadium: StadiumLocal | null;
  stadiumsRemaining: number | null;
  score: number;
  timeRemaining: number;
  userHasFinishedGame: boolean;
  answers: string[];
  skipped: string[];
}

const initialState: GameState = {
  stadiums: null,
  currentStadium: null,
  stadiumsRemaining: null,
  score: 0,
  timeRemaining: 90,
  userHasFinishedGame: false,
  answers: [],
  skipped: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStadiums(state, action: PayloadAction<StadiumLocal[]>) {
      state.stadiums = action.payload;
    },

    setCurrentStadium(state, action: PayloadAction<StadiumLocal>) {
      state.currentStadium = action.payload;
    },

    incrementCurrentStadium(state) {
      if (!state.stadiums?.length) {
        console.error("Error incrementing current stadium");
        return;
      }

      const nextStadiumIndex =
        state.stadiums.findIndex(
          (stadium) => stadium.code === state.currentStadium?.code,
        ) + 1;

      if (nextStadiumIndex === state.stadiums.length - 1) return;

      if (state.stadiums[nextStadiumIndex]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.currentStadium = state.stadiums[nextStadiumIndex]!;
      }
    },

    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },

    setStadiumsRemaining(state, action: PayloadAction<number>) {
      state.stadiumsRemaining = action.payload;
    },

    decrementStadiumsRemaining(state) {
      if (!state.stadiumsRemaining) {
        console.error("Could not decrement stadiums");
        return;
      }

      if (state.stadiumsRemaining > 0) {
        state.stadiumsRemaining--;
      }
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

    addAnswer(state, action: PayloadAction<string>) {
      state.answers.push(action.payload);
    },

    addSkip(state, action: PayloadAction<string>) {
      state.skipped.push(action.payload);
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
  addAnswer,
  addSkip,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
