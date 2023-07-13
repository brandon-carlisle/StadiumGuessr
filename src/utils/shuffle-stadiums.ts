import type { Stadium } from "@prisma/client";

export function shuffleStadiumArray(arr: Stadium[]) {
  if (!arr) throw new Error("Could not shuffle stadiums");

  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
