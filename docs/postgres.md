# Postgres for local dev

Use the `psql` that ships with Postgres.app:

```text
/Applications/Postgres.app/Contents/Versions/latest/bin/psql
```

Do not install another Postgres. Do not use Homebrew Postgres. Do not pin or mention a server version.

Before `pnpm dev`, `pnpm db:push`, `pnpm db:migrate`, or `pnpm db:seed`, confirm the server is accepting connections:

```bash
/Applications/Postgres.app/Contents/Versions/latest/bin/psql -h localhost -p 5432 -d sg -c 'SELECT 1'
```

If that fails, start the existing app and try again:

```bash
open -a Postgres
```

Wait until the same `psql` command returns a row. Do not start a second cluster with `pg_ctl`. Two data directories already exist under `~/Library/Application Support/Postgres` (`var-18` and `sg`). Both default to port 5432, so only the server Postgres.app already manages should be running.

If `psql` connects to the server but database `sg` is missing, create it with that same `psql`:

```sql
CREATE DATABASE sg;
```

Stop there. Do not invent a new database name.

`DATABASE_URL` in `.env.local` must point at `postgresql://<mac-user>@localhost:5432/sg`. Read the user from the existing `.env.local`. Never copy secrets from that file into this doc or into chat.
