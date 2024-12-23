import { EPL } from "@/data/leagues/epl";
import { League, Team } from "@/data/leagues/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type GameStatus = "IDLE" | "PLAYING" | "COMPLETE";

interface GameState {
  league: League;
  teams: Team[];
  currentTeam: Team;
  score: number;
  finalTimeRemaining: number;
  teamsRemaining: number;
  status: GameStatus;
  correctTeamCodes: string[];
  incorrectTeamCodes: string[];
}

const initialState: GameState = {
  league: EPL,
  teams: EPL.teams,
  currentTeam: EPL.teams[0],
  score: 0,
  finalTimeRemaining: 90,
  teamsRemaining: EPL.teams.length,
  status: "IDLE",
  correctTeamCodes: [""],
  incorrectTeamCodes: [""],
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

    setLeague(state, action: PayloadAction<League>) {
      state.league = action.payload;
    },

    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },

    setCurrentTeam(state, action: PayloadAction<Team>) {
      state.currentTeam = action.payload;
    },

    incrementCurrentTeam(state) {
      const nextTeamIndex =
        state.league.teams.findIndex(
          (team) => team.code === state.currentTeam.code,
        ) + 1;

      if (nextTeamIndex === state.league.teams.length - 1) return;

      if (state.league.teams[nextTeamIndex]) {
        state.currentTeam = state.league.teams[nextTeamIndex];
      } else return;
    },

    incrementScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },

    setTeamsRemaining(state, action: PayloadAction<number>) {
      state.teamsRemaining = action.payload;
    },

    decrementTeamsRemaining(state) {
      if (state.teamsRemaining > 0) {
        state.teamsRemaining--;
      }
    },

    setFinalTimeRemaining(state, action: PayloadAction<number>) {
      state.finalTimeRemaining = action.payload;
    },

    setGameStatus(state, action: PayloadAction<GameStatus>) {
      state.status = action.payload;
    },

    addCorrectTeamCode(state, action: PayloadAction<string>) {
      state.correctTeamCodes.push(action.payload);
    },

    addIncorrectTeamCode(state, action: PayloadAction<string>) {
      state.incorrectTeamCodes.push(action.payload);
    },

    resetGame: () => initialState,
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
