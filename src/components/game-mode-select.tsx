import { useRouter } from "next/router";
import { type FormEvent, useState, useRef } from "react";
import { allLeagues } from "@/data/stadiums";

export default function GameModeSelect() {
  const [selected, setSelected] = useState("");
  const router = useRouter();
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) {
      if (selectRef.current !== null) {
        selectRef.current.focus();
      }
      return;
    }

    console.log("trying to push to: ", selected);
    void router.push(`/play?mode=${selected}`);
  }
  return (
    <div className="card bg-base-100 w-full">
      <form onSubmit={(event) => handleSubmit(event)}>
        <select
          className="select select-accent w-full max-w-xs"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
          ref={selectRef}
        >
          <option disabled value="">
            Which league?
          </option>
          {allLeagues.map((league) => (
            <option key={league.code} value={league.code}>
              {league.leagueName}
            </option>
          ))}
        </select>

        <div className="mt-2">
          <button className="btn btn-primary" type="submit">
            Let&apos;s play!
          </button>
        </div>
      </form>
    </div>
  );
}
