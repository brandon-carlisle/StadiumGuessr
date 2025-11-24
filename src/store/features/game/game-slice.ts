import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
	GuessHistoryItem,
	LeagueWithTeams,
	TeamSelect,
} from "@/db/schema";

type GameStatus = "IDLE" | "PLAYING" | "COMPLETE";

export interface GameState {
	league: LeagueWithTeams;
	teams: TeamSelect[];
	currentTeam: TeamSelect;
	score: number;
	teamsRemaining: number;
	status: GameStatus;
	guessHistory: GuessHistoryItem[];
	isPopupVisible: boolean;
}

const initialState: GameState = {
	league: {
		id: 0,
		code: "",
		name: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		teams: [],
	},
	teams: [],
	currentTeam: {
		id: 0,
		code: "",
		clubName: "",
		stadiumName: "",
		latitude: 0,
		longitude: 0,
		leagueId: 0,
		createdAt: new Date(),
		updatedAt: new Date(),
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
			// Reset all game state before initializing
			state.score = 0;
			state.guessHistory = [];
			state.isPopupVisible = false;
			// Set new game state
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
				teamName: state.currentTeam.clubName,
				teamId: state.currentTeam.id,
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
