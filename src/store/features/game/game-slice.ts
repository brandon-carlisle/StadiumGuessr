import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
	GuessHistoryItem,
	LeagueSelect,
	LeagueWithTeams,
	TeamSelect,
} from "@/db/schema";

type GameStatus = "IDLE" | "PLAYING" | "COMPLETE";

type LeagueForGame = Omit<LeagueSelect, "createdAt" | "updatedAt"> & {
	teams: TeamForGame[];
};
type TeamForGame = Omit<TeamSelect, "createdAt" | "updatedAt">;

export interface GameState {
	league: LeagueForGame;
	teams: TeamForGame[];
	currentTeam: TeamForGame;
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
	},
	score: 0,
	teamsRemaining: 0,
	status: "IDLE",
	guessHistory: [],
	isPopupVisible: false,
};

type InitGame = {
	league: LeagueWithTeams;
	teams: TeamSelect[];
	teamsRemaining: number;
	currentTeam: TeamSelect;
	status: GameStatus;
};

const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		initialise(state, action: PayloadAction<InitGame>) {
			// Reset all game state before initializing
			state.score = 0;
			state.guessHistory = [];
			state.isPopupVisible = false;
			// Set new game state (strip date fields)
			const {
				createdAt: _leagueCreatedAt,
				updatedAt: _leagueUpdatedAt,
				...leagueWithoutDates
			} = action.payload.league;
			state.league = {
				...leagueWithoutDates,
				teams: action.payload.teams.map(
					({ createdAt: _createdAt, updatedAt: _updatedAt, ...team }) => team,
				),
			};
			state.teams = action.payload.teams.map(
				({ createdAt: _createdAt, updatedAt: _updatedAt, ...team }) => team,
			);
			state.teamsRemaining = action.payload.teamsRemaining;
			const {
				createdAt: _teamCreatedAt,
				updatedAt: _teamUpdatedAt,
				...currentTeamWithoutDates
			} = action.payload.currentTeam;
			state.currentTeam = currentTeamWithoutDates;
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
