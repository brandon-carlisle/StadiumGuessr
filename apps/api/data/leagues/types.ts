import { z } from "zod";

const leagueCodes = ["EPL", "EFL"] as const;
export type LeagueCode = (typeof leagueCodes)[number];

const leagueNameOpts = ["Premier League", "EFL Championship"] as const;
export type LeagueNameOpts = (typeof leagueNameOpts)[number];

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
  code: LeagueCode;
  leagueName: LeagueNameOpts;
  teams: Team[];
}

// Need to keep this matched with LeagueCodeOpts
export const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL"),
]);
