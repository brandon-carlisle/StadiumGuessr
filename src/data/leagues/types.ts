import { z } from "zod";

export const leagueCodes = ["EPL", "EFL"] as const;
export type LeagueCodeOpts = typeof leagueCodes;
export type LeagueCode = LeagueCodeOpts[number];

export type LeagueNameOpts = "Premier League" | "EFL Championship";

export interface Team {
  // https://liaison.reuters.com/tools/sports-team-codes
  code: string;
  clubName: string;
  stadiumName: string;
  latitude: number;
  longitude: number;
}

export interface League {
  code: LeagueCode;
  leagueName: LeagueNameOpts;
  teams: Team[];
}

// Need to keep this matched with LeagueCodeOpts
export const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL"),
]);

