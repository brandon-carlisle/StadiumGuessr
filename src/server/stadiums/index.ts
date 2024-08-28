import { EFL_CHAMPIONSHIP } from "./efl-championship";
import { EPL } from "./epl";

type LeagueNameOpts = "Premier League" | "EFL Championship";
type LeagueCodeOpts = "EPL" | "EFL_CHAMPIONSHIP"

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

//export const STADIUMS = [...EPL_STADIUMS, ...E];
