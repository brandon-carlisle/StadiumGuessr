import { z } from "zod";

export type LeagueNameOpts = "Premier League" | "EFL Championship";
export type LeagueCodeOpts = "EPL" | "EFL";

export interface Team {
  // https://liaison.reuters.com/tools/sports-team-codes
  code: string;
  clubName: string;
  stadiumNames: string[];
  locaction: Locaction;
}

interface Locaction {
  lat: number;
  lng: number;
}

export interface League {
  code: LeagueCodeOpts;
  leagueName: LeagueNameOpts;
  teams: Team[];
}

// Need to keep this matched with LeagueCodeOpts
export const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL"),
]);
