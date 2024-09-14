import { type StadiumLocal } from "@/types/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_TEAM: StadiumLocal = {
  code: "",
  names: [""],
  club: "",
  locaction: {
    lng: 0,
    lat: 0,
  },
};

interface GameState {
  stadiums: StadiumLocal[];
  currentStadium: StadiumLocal;
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
    setStadiums(state, action: PayloadAction<StadiumLocal[]>) {
      state.stadiums = action.payload;
    },

    setCurrentStadium(state, action: PayloadAction<StadiumLocal>) {
      state.currentStadium = action.payload;
    },

    incrementCurrentStadium(state) {
      const nextStadiumIndex =
        state.stadiums.findIndex(
          (stadium) => stadium.code === state.currentStadium.code,
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
