// TODO: Use LeagueCodeOpts here
import { useRouter } from "next/router";
import { type FormEvent, useState } from "react";

const opts = [
  {
    name: "Premier League",
    code: "EPL",
  },
  {
    name: "Championship",
    code: "EFL_CHAMPIONSHIP",
  },
];

export default function GameModeSelect() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) {
      console.log("could not push, state: ", selected);
      return;
    }

    console.log("trying to push to: ", selected);
    void router.push(`/play?mode=${selected}`);
  }
  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <p>Select league</p>
      <form onSubmit={(event) => handleSubmit(event)}>
        <select
          className="select select-accent w-full max-w-xs"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <option disabled value="">
            Which league?
          </option>
          {opts.map((op) => (
            <option key={op.code} value={op.code}>
              {op.name}
            </option>
          ))}
        </select>

        <div>
          <button className="btn btn-primary" type="submit">
            Let&apos;s play!
          </button>
        </div>
      </form>
    </div>
  );
}
