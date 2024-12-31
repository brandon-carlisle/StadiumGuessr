import { EPL } from "@/data/leagues/epl";
import { League, Team } from "@/data/leagues/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type GameStatus = "IDLE" | "PLAYING" | "COMPLETE";

interface GameState {
  league: League;
  teams: Team[];
  currentTeam: Team;
  score: number;
  teamsRemaining: number;
  status: GameStatus;
  correctTeamCodes: string[] | null;
  incorrectTeamCodes: string[] | null;
}

const initialState: GameState = {
  league: EPL,
  teams: EPL.teams,
  currentTeam: EPL.teams[0],
  score: 0,
  teamsRemaining: EPL.teams.length,
  status: "IDLE",
  correctTeamCodes: null,
  incorrectTeamCodes: null,
};

type InitGame = Pick<
  GameState,
  "league" | "teams" | "teamsRemaining" | "currentTeam" | "status"
>;

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initialise(state, action: PayloadAction<InitGame>) {
      state.league = action.payload.league;
      state.teams = action.payload.teams;
      state.teamsRemaining = action.payload.teamsRemaining;
      state.currentTeam = action.payload.currentTeam;
      state.status = action.payload.status;
    },

    setCurrentTeamToNext(state) {
      const nextTeamIndex =
        state.teams.findIndex((team) => team.code === state.currentTeam.code) +
        1;

      const lastIdx = state.teams.length - 1;

      if (nextTeamIndex > lastIdx) {
        return;
      }

      state.currentTeam = state.teams[nextTeamIndex];
    },

    incrementScore(state) {
      state.score += 10;
    },

    setTeamsRemaining(state, action: PayloadAction<number>) {
      state.teamsRemaining = action.payload;
    },

    setGameStatus(state, action: PayloadAction<GameStatus>) {
      state.status = action.payload;
    },

    addIncorrectTeamCode(state, action: PayloadAction<string>) {
      if (!state.incorrectTeamCodes) {
        state.incorrectTeamCodes = [];
      }

      state.incorrectTeamCodes.push(action.payload);
    },

    registerCorrectGuess(state) {
      if (!state.correctTeamCodes) {
        state.correctTeamCodes = [];
      }

      if (state.teamsRemaining === 0) {
        return;
      }

      state.correctTeamCodes.push(state.currentTeam.code);
      state.score += 10;
      state.teamsRemaining--;
    },

    registerSkippedGuess(state) {
      if (!state.incorrectTeamCodes) {
        state.incorrectTeamCodes = [];
      }

      if (state.teamsRemaining === 0) {
        return;
      }

      state.incorrectTeamCodes.push(state.currentTeam.code);
      if (state.score > 0) {
        state.score -= 5;
      }
      state.teamsRemaining--;
    },

    resetGame: () => initialState,
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
