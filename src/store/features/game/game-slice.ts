import { League, Team } from "@/data/leagues/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

type GameStatus = "IDLE" | "PLAYING" | "COMPLETE";

export interface GuessHistoryItem {
  teamCode: string;
  guessLat: number;
  guessLng: number;
  actualLat: number;
  actualLng: number;
  distance: number;
  points: number;
}

export interface GameState {
  league: League;
  teams: Team[];
  currentTeam: Team;
  score: number;
  teamsRemaining: number;
  status: GameStatus;
  guessHistory: GuessHistoryItem[];
  isPopupVisible: boolean;
}

const initialState: GameState = {
  league: {
    code: "EPL",
    leagueName: "Premier League",
    teams: [],
  },
  teams: [],
  currentTeam: {
    code: "",
    clubName: "",
    stadiumName: "",
    latitude: 0,
    longitude: 0,
  },
  score: 0,
  teamsRemaining: 0,
  status: "IDLE",
  guessHistory: [],
  isPopupVisible: false,
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

    setGameStatus(state, action: PayloadAction<GameStatus>) {
      state.status = action.payload;
    },

    registerLocationGuess(
      state,
      action: PayloadAction<{
        guessLat: number;
        guessLng: number;
        distance: number;
        points: number;
      }>,
    ) {
      if (state.teamsRemaining === 0) {
        return;
      }

      const { guessLat, guessLng, distance, points } = action.payload;
      const actualLat = state.currentTeam.latitude;
      const actualLng = state.currentTeam.longitude;

      // Add to guess history
      state.guessHistory.push({
        teamCode: state.currentTeam.code,
        guessLat,
        guessLng,
        actualLat,
        actualLng,
        distance,
        points,
      });

      // Update score
      state.score += points;

      // Update teams remaining
      state.teamsRemaining--;

      // Show popup
      state.isPopupVisible = true;
    },

    dismissPopup(state) {
      state.isPopupVisible = false;
      // Move to next team if there are more teams
      if (state.teamsRemaining > 0) {
        const nextTeamIndex =
          state.teams.findIndex(
            (team) => team.code === state.currentTeam.code,
          ) + 1;

        const lastIdx = state.teams.length - 1;

        if (nextTeamIndex <= lastIdx) {
          state.currentTeam = state.teams[nextTeamIndex];
        }
      }
    },

    resetGame: () => initialState,
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;

