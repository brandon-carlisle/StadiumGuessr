import { z } from "zod";
import { EFL_CHAMPIONSHIP } from "./efl-championship";
import { EPL } from "./epl";

type LeagueNameOpts = "Premier League" | "EFL Championship";
type LeagueCodeOpts = "EPL" | "EFL_CHAMPIONSHIP"

// Need to keep this matched with LeagueCodeOpts
export const LeagueCodeOptsSchema = z.union([
  z.literal("EPL"),
  z.literal("EFL_CHAMPIONSHIP")
])

export interface StadiumLocal {
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

export const allLeagues: League[] = [EPL, EFL_CHAMPIONSHIP]
