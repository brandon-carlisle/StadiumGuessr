import app from "./app";

Bun.serve({
  fetch: app.fetch,
});

console.log("Bun server is now running");
