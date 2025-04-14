import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { leagueRoute } from "./routes/league";

const app = new Hono();

// Middleware
app.use(logger());

app.route("/api/league", leagueRoute);

// Vite app
app.get("*", serveStatic({ root: "./static" }));
app.get("*", serveStatic({ path: "./static/index.html" }));

export default app;
