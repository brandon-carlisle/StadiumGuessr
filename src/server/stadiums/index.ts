export interface StadiumLocal {
  club: string;
  names: string[];
  locaction: Locaction;
  league: League;
}

interface Locaction {
  lat: number;
  lng: number;
}

type League = "EPL" | "EFL Championship";



export const STADIUMS = [...EPL_STADIUMS];
