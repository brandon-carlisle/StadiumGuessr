import { z } from "zod";

export type LeagueNameOpts = "Premier League" | "EFL Championship";
export type LeagueCodeOpts = "EPL" | "EFL_CHAMPIONSHIP";

export interface StadiumLocal {
  // https://liaison.reuters.com/tools/sports-team-codes
  code: string;
  club: string;
  names: string[];
  locaction: Locaction;
}

interface Locaction {
  lat: number;
  lng: number;
}

export interface League {
  code: LeagueCodeOpts;
  leagueName: LeagueNameOpts;
  teams: StadiumLocal[];
}

// Need to keep this matched with LeagueCodeOpts
export const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL_CHAMPIONSHIP"),
]);
