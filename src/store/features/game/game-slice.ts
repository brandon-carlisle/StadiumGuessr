import { type Team } from '@prisma/client';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialTeam: Team = {
  id: '',
  name: '',
  alternativeName: '',
  stadium: '',
  alternativeStadium: '',
  capacity: 0,
  latitude: 0,
  longitude: 0,
};

interface gameState {
  teams: Team[];
  currentTeam: Team;
  teamsRemaining: number;

  score: number;
  timeRemaining: number;
  userHasFinishedGame: boolean;
}

const initialState: gameState = {
  teams: [initialTeam],
  currentTeam: initialTeam,
  teamsRemaining: 20,

  score: 0,
  timeRemaining: 60,
  userHasFinishedGame: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    /**
     * Takes in an array of Teams
     * to be set into current game state.
     */
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },

    /**
     * Sets current team to the payload.
     */
    setCurrentTeam(state, action: PayloadAction<Team>) {
      state.currentTeam = action.payload;
    },

    /**
     * Sets current team to the next team unless already at last team.
     */
    incrementCurrentTeam(state) {
      const nextTeamIndex =
        state.teams.findIndex((team) => team.id === state.currentTeam.id) + 1;

      if (nextTeamIndex === state.teams.length - 1) return;

      if (state.teams[nextTeamIndex]) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.currentTeam = state.teams[nextTeamIndex]!;
      } else return;
    },

    /**
     * Adds payload to the current score.
     */
    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },

    /**
     * Sets teams left based on payload.
     */
    setTeamsRemaining(state, action: PayloadAction<number>) {
      state.teamsRemaining = action.payload;
    },

    /**
     * Decrements teams left by 1.
     */
    decrementTeamsRemaining(state) {
      if (state.teamsRemaining > 0) state.teamsRemaining--;
    },

    /**
     * Decrements timeRemaining by 1.
     */
    decrementTimeRemaining(state) {
      state.timeRemaining--;
    },

    /**
     * Resets zoom level by recreating currentTeam state.
     *
     * (This is hacky)
     */
    resetZoom(state) {
      state.currentTeam = {
        ...state.currentTeam,
      };
    },

    /**
     * Sets userHasFinishedGame based on payload
     */
    setUserHasFinishedGame(state, action: PayloadAction<boolean>) {
      state.userHasFinishedGame = action.payload;
    },

    /**
     * Resets game state to inital state
     */
    resetGame(state) {
      state.teams = initialState.teams;
      state.currentTeam = initialState.currentTeam;
      state.teamsRemaining = initialState.teamsRemaining;
      state.score = initialState.score;
      state.timeRemaining = initialState.timeRemaining;
      state.userHasFinishedGame = initialState.userHasFinishedGame;
    },
  },
});

export const {
  setTeams,
  setCurrentTeam,
  incrementCurrentTeam,
  incrementScore,
  setTeamsRemaining,
  decrementTeamsRemaining,
  decrementTimeRemaining,
  resetZoom,
  setUserHasFinishedGame,
  resetGame,
} = gameSlice.actions;
export default gameSlice.reducer;
