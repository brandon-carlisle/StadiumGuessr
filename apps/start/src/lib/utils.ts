import { allLeagues } from "@/data/leagues";
import { type LeagueCode, leagueCodes, type Team } from "@/data/leagues/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function isLeagueCode(value: string): value is LeagueCode {
  return leagueCodes.includes(value as LeagueCode);
}

export function getLeagueTitle(code: LeagueCode) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    return "";
  }

  return league.leagueName;
}

export function getHint(team: Team) {
  return `This stadium belongs to ${team.clubName}`;
}

export function getLeague(code: LeagueCode) {
  const league = allLeagues.find((league) => league.code === code);

  if (!league) {
    throw new Error("No league found");
  }

  return league;
}

