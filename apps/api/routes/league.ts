import { Hono } from "hono";

const epl = {
  id: "1235",
  name: "epl",
};

export const leagueRoute = new Hono()
  .get("/", (c) => c.json({ leagues: [epl] }))
  .post("/", (c) => c.json({}));
