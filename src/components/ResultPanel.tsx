import type { Result } from "../types";

export function ResultPanel({ result }: { result: Result }) {
  return <>
    <div className="status-box">
      {result.score && <span className="score">{result.score}</span>}
      <h3>{result.title}</h3>
      <p>{result.message}</p>
      {result.summary.length > 0 && <ul className="summary-list">
        {result.summary.map((item) => <li key={item}>{item}</li>)}
      </ul>}
    </div>
    <div className="button-row">
      <button className="button button-secondary" type="button" data-action="back">Back</button>
      <button className="button button-primary" type="button" data-action="copy">Copy summary for EMR</button>
    </div>
  </>;
}

