// TODO: Use LeagueCodeOpts here

export default function GameModeSelect() {
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
        <button className="btn btn-primary">Let&apos;s play!</button>
      </div>
    </div>
  );
}
