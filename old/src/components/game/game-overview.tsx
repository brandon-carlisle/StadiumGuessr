interface Props {
  leagueCode: string;
  score: number;
  maxPossibleScore: number;
  answers: string[];
  skipped: string[];
}

export default function GameOverview(props: Props) {
  return (
    <div className="card bg-base-100">
      <h2 className="card-title">Match Overview</h2>

      <div>
        <div className="badge badge-neutral">{props.leagueCode}</div>
        <div>
          {props.score} / {props.maxPossibleScore}
        </div>
        <div>
          <progress
            className="progress w-56"
            value={props.score}
            max={props.maxPossibleScore}
          ></progress>
        </div>
      </div>

      <div>
        <div className="bg-base-200">
          <span>Correct answers!</span>
          <ul>
            {props.answers.map((answer) => {
              return <li key={answer}>{answer}</li>;
            })}
          </ul>
        </div>
        <div className="bg-base-200">
          <span>You skipped</span>
          <ul>
            {props.skipped.map((answer) => {
              return <li key={answer}>{answer}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
