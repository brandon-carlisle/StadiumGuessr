// TODO: Use LeagueCodeOpts here
import { useRouter } from "next/router";
import { useState } from "react";

export default function GameModeSelect() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  async function handleGameModeSelect() {
    if (!selected) {
      return;
    }

    await router.push(`/play?mode=${selected}`);
  }
  return (
    <div className="card bg-base-100 shadow-xl w-full">
      <p>Select league</p>

      <select className="select select-accent w-full max-w-xs">
        <option disabled selected>
          Which league?
        </option>
        <option>Premier League</option>
        <option>Championship</option>
      </select>

      <div>
        <button
          className="btn btn-primary"
          onClick={() => handleGameModeSelect}
        >
          Let&apos;s play!
        </button>
      </div>
    </div>
  );
}
