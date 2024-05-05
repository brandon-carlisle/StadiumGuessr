import { z } from "zod";

export const LeagueOptionSchema = z
  .union([
    z.literal("EPL"),
    z.literal("LA_LIGA"),
    // z.literal("Ligue 1"),
  ])
  .nullable();

export type LeagueOption = z.infer<typeof LeagueOptionSchema>;
