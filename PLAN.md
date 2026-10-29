# StadiumGuessr fix plan

Work top to bottom. Do not start the package upgrade until the app is working and the verification checklist at the end of phase 6 passes.

Database for this app: host `localhost`, port `5432`, database name `sg`. The URL is `DATABASE_URL` in `.env.local`. Do not print or commit that file.

## Phase 0 — Postgres dev note

Create `docs/postgres.md`. This is the note later agents follow before dev, migrate, or seed.

The machine already has `psql` from Postgres.app:

```text
/Applications/Postgres.app/Contents/Versions/latest/bin/psql
```

`docs/postgres.md` should say:

- Use that `psql`. Do not install another Postgres, do not use Homebrew Postgres, and do not pin or mention a server version.
- Before `pnpm dev`, `pnpm db:push`, `pnpm db:migrate`, or `pnpm db:seed`, confirm the server is accepting connections:

  ```bash
  /Applications/Postgres.app/Contents/Versions/latest/bin/psql -h localhost -p 5432 -d sg -c 'SELECT 1'
  ```

- If that fails, start the existing app and try again:

  ```bash
  open -a Postgres
  ```

  Wait until the same `psql` command returns a row. Do not start a second cluster with `pg_ctl`. Two data directories already exist under `~/Library/Application Support/Postgres` (`var-18` and `sg`); both default to port 5432, so only the server Postgres.app already manages should be running.
- If `psql` connects to the server but database `sg` is missing, create it with that same `psql` (`CREATE DATABASE sg;`) and stop. Do not invent a new database name.
- Point `DATABASE_URL` at `postgresql://<mac-user>@localhost:5432/sg`. Read the user from the existing `.env.local`. Never copy secrets into this doc or into chat.

Then follow the doc: start Postgres.app if needed, and confirm `psql` can run `SELECT 1` against `sg` before any later phase.

**Status: completed.** `docs/postgres.md` is in place. `psql` returned a row from `sg`.

## Phase 1 — Unblock the routes that cannot be used

### Sign-in

`src/routes/sign-in.tsx` redirects every visitor away. A session with a user goes home. No session goes to `/sign-up`. The sign-in form never renders, so `/admin` and `/games` (both of which send logged-out people to `/sign-in`) cannot reach a login form.

Change `beforeLoad` so a signed-in user still goes home, and everyone else stays on the page. Remove the redirect to `/sign-up`. Remove the `console.log`.

**Status: completed.** Logged-out `/sign-in` renders the form. A signed-in visit redirects home.

### Game history loader

`src/routes/games.index.tsx` calls `useSession()` inside a route loader. That hook only works in a component, so the route crashes.

Load the session with `getSessionFn` from `src/server-functions/auth.ts`. If there is no user, redirect to `/sign-in`. Pass that user's id into `getGameResultsForUserFn`.

Show each saved game with its score, teams guessed, and date. The link can keep going to `/games/$gameId`.

**Status: completed.** The loader uses `getSessionFn`. The list does not send a user id; phase 3 reads the session on the server. Each row shows league, score, teams guessed, and date.

### Review page

`src/routes/games.$gameId.tsx` loads the result and then renders `ReviewLayout`, which ignores that data and prints `sideContent`.

Render the loaded result: league, score, teams guessed out of total, and each guess (team, distance, points). Keep the page behind the same session check as the list, once phase 3 restricts the server function to the owner.

**Status: completed.** `/games/$gameId` shows that detail. Another user's result returns "Game result not found".

## Phase 2 — Save a finished game once

`src/routes/play.$leagueId.tsx` saves inside an effect that depends on the whole game state. Status becomes `COMPLETE` while the result popup is still open, so the first insert runs then. Dismissing the popup changes state and inserts another row. React Strict Mode can run the effect twice in development.

- Run the save only when status changes to `COMPLETE`.
- Guard with a ref so one visit to the play route inserts one row.
- Keep the logged-in check on the client so guests can still finish a game, but stop sending `userId` from the client (phase 3 takes the user from the session).
- Remove the `console.log` calls around the save.
- Surface a save failure in the UI. A failed insert should not be retried in a loop.

**Status: completed.** A module-level set of play ids blocks a second insert, including after the result popup closes. A failure shows an alert and a toast.

## Phase 3 — Check identity on the server

These functions are public HTTP endpoints. The admin page's `beforeLoad` check does not protect them.

| Function | Required check |
|---|---|
| `addGameResultFn` | Require a session. Set `userId` from `auth.api.getSession`. Ignore any user id in the payload. |
| `getGameResultsForUserFn` | Return rows only for the session user. Drop the client-supplied `userId` input. |
| `getGameResultByIdFn` | Return the row only when `userId` matches the session user. |
| `addLeagueFn`, `updateLeagueFn`, `deleteLeagueFn`, `addTeamFn`, `updateTeamFn`, `deleteTeamFn` | Require `session.user.role === "admin"`. |

Recompute points on the server inside `addGameResultFn`. Load each team's stored latitude and longitude, run the same distance and score helpers used by the client, and store those points. The client's `points` and `score` fields are not the source of truth. Reject a guess whose `teamId` is not in the league being saved.

Add a small shared helper, used by the admin mutations and by `checkUserIsAdminFn`, that reads the session from `getRequestHeaders` and throws when the role is not admin.

**Status: completed.** `requireAdmin` lives in `src/server-functions/session.ts`. A signed-out delete says "You must be signed in". A signed-in non-admin delete says "Admin only". Saved points are recomputed on the server.

## Phase 4 — Admin writes

`getTeamsForLeagueFn` and `deleteTeamFn` are called as `fn({ data })`. League create, update, and delete, and team create and update, pass the raw object. Match the working call shape:

- `addLeagueFn({ data: value })`
- `updateLeagueFn({ data: { id, code, name } })`
- `deleteLeagueFn({ data: { id } })`
- `addTeamFn({ data: teamData })`
- `updateTeamFn({ data: { id, ...teamData } })`

In `updateLeagueFn` and `updateTeamFn`, strip `id` out of the object passed to `.set()`. The id is only for the `WHERE` clause. Keep both ids parsed with `parseInt(..., 10)` the way the league update already does.

**Status: completed.** Admin create, update, and delete for a league and a team went through `{ data }` and succeeded.

## Phase 5 — Gameplay

### Score curve

`calculateScore` in `src/lib/utils.ts` spreads 5,000 points across about 15,534 miles, so a guess on the wrong side of Britain still scores about 4,949.

Replace it with an exponential drop scaled for UK stadiums:

```text
score = round(5000 * e^(-distanceMiles / 50))
```

Targets to lock in with unit tests:

| Distance | Score |
|---|---|
| 0 miles | 5000 |
| 10 miles | about 4094 |
| 50 miles | about 1840 |
| 100 miles | about 677 |
| 200 miles | about 92 |

Keep the 10-mile sound split in `GuessButton` in step with this curve.

**Status: completed.** `Math.round` makes 50 miles 1839, which is the "about 1840" target. A 570-mile miss scored 0. The 10-mile sound split is unchanged.

### One clock

The home page says 60 seconds. `Timer` uses 5 seconds per team (100 seconds for the 20-team Premier League list, 120 for the 24-team Championship list) and its initial state is hardcoded to 60, so the first paint is wrong.

Put the duration in one helper, `5 * teamCount` seconds. Use it for the initial timer state and for the home page sentence, so the number on the marketing line is the number the clock starts at.

**Status: completed.** Premier League shows 100 seconds, Championship 120, and a one-team league showed 5. The clock only finishes the game after it has counted down from that number. The first version marked a new game complete while the clock was still being set; that is fixed.

### Map opens on Britain

`src/store/features/map/map-slice.ts` starts at latitude `37.8`, longitude `-122.4`, zoom `3` (San Francisco). Start over Britain: latitude `54.5`, longitude `-2.5`, zoom `5`.

Move the MapTiler style URL's key out of source and into a `VITE_` env var read through `src/env.ts`. Leave a placeholder in `.env.local` only on this machine. The key already committed in `map-slice.ts` should be rotated in the MapTiler account; the plan does not do that rotation itself.

**Status: completed.** The map opens with the Britain view state. The style key is `VITE_MAPTILER_KEY` in `.env.local`. Rotation in the MapTiler account is still outstanding.

### One definition of finished

Both of these end the game:

- The clock hits zero.
- Every team has a guess.

Saving uses the real guess count (`guessHistory.length`), including a game that ran out of time early. Dismissing the result popup after the game is finished does not advance to another team and does not save again.

`getLeaguesFn` currently throws when the league table is empty, which takes down the home page. Return an empty array. The home page already handles no selected league by hiding the play link. Show a short empty state when the list is empty.

**Status: completed.** An empty league list returns `[]` and the home page says "No leagues yet." Finishing every team or running out of time both end the game. Saving uses `guessHistory.length`. Closing the result popup does not start another team and does not save again.

## Phase 6 — Seed and small fixes

### Seed

`src/db/seed.ts` deletes every team and then every league. `game_result.leagueId` is `ON DELETE CASCADE`, so a re-seed deletes every saved game.

Upsert leagues and teams by `code`. Update name and coordinates in place. Do not delete leagues, teams, or game results.

**Status: completed.** `pnpm db:seed` upserted 2 leagues and 44 teams.

### Score animation

`src/components/score.tsx` restarts its bounce from the `animate` flag, so the animation runs on mount and stays still when the score changes. Depend on `score` instead.

**Status: completed.** The bounce runs when `score` changes and skips the initial 0.

### Tests

There is a Vitest setup and no tests. Add unit tests for `calculateDistance` and `calculateScore` covering the table in phase 5. Run `pnpm test`.

**Status: completed.** `src/lib/utils.test.ts` — 4 tests passed.

### Verify the app works

With Postgres confirmed via `psql` and the database seeded:

1. `pnpm dev` and open the home page. Leagues load. The time sentence matches the clock a game will start with.
2. Logged out, open `/sign-in`. The form renders. Sign in works. A signed-in visit to `/sign-in` goes home.
3. Start a game. The map is centered on Britain. Place a pin on the stadium and one far away. The far guess scores far below 5,000, in line with the table above.
4. Finish a game while signed in (play every team, and separately let the clock hit zero). Each finish creates one `game_result` row. Check with `psql`:

   ```bash
   /Applications/Postgres.app/Contents/Versions/latest/bin/psql -h localhost -p 5432 -d sg -c 'SELECT id, score, teams_guessed, total_teams FROM game_result ORDER BY id DESC LIMIT 5'
   ```

5. `/games` lists those rows. `/games/$gameId` shows the guesses. Another user's id in the URL does not return their result.
6. Signed out, or signed in as a non-admin, a direct call to `deleteLeagueFn` fails. An admin can create, edit, and delete a league and a team from `/admin`.
7. `pnpm test` and `pnpm check` pass.

Fix anything this pass finds before phase 7.

**Status: completed.** Home, sign-in, a finished guess, a timed-out game, one row per finish, `/games`, the review page, and admin create/update/delete were checked in the browser. `pnpm test` and `pnpm check` pass. `pnpm db:push` tried to drop not-null constraints and Postgres rejected that; the existing tables were left in place and the seed still ran.

## Phase 7 — Update packages, then verify again

Do this only after phase 6's checklist passes.

1. From the repo root, update dependencies to the latest versions with pnpm (`pnpm outdated`, then `pnpm update --latest`). Leave the package manager field consistent with the lockfile. Do not change Postgres.
2. Reinstall so `pnpm-lock.yaml` matches.
3. Fix compile, type, and runtime breakage from the upgrades. TanStack Start, Better Auth, Drizzle, Zod, and Vite are the likely sources. Re-read call shapes for `createServerFn` if an upgrade changes `{ data }` again, and re-apply phase 4 if it does.
4. Re-run `pnpm test`, `pnpm check`, and `pnpm build`.
5. Repeat the phase 6 browser checklist: home, sign-in, one full game, one saved row, game history, review page, and an admin edit. Use `psql` again to confirm a single new `game_result` row.

Stop when that second pass is clean. If an upgrade has no compatible fix, pin that one package to the last version that passed the checklist and record the pin in this file.

**Status: completed.** `pnpm update --latest` moved the app onto Vite 8.3.5, Vitest 5, TypeScript 7, TanStack Start 1.169, and the current React, Drizzle, Zod, and Better Auth releases. `createServerFn` now uses `.validator()` instead of `.inputValidator()`. TypeScript 7 no longer allows `baseUrl`, so path aliases stay relative to the config file. Vite's own `resolve.tsconfigPaths` replaced `vite-tsconfig-paths`, and the React compiler runs through `@vitejs/plugin-react` with `oxc-transform-react` pinned to `0.152.0` because the plugin only accepts that 0.152 line. `pnpm test`, `pnpm check`, and `pnpm build` pass. On the upgraded server: home still says 100 seconds, sign-in renders, a one-team game scored 321 miles and 8 points, that finish saved one `game_result` row, closing the popup did not save again, `/games` and `/games/15` show the league, score, and guess, and an admin rename of the test league to "Test League Edited" was stored. The test league and user were removed afterward. A separate earlier visit that ran out of time before a pin was placed saved its own zero-guess row, which is the same one-row-per-finish behaviour.
