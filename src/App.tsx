import { useState, type FormEvent, type MouseEvent } from "react";
import { ResultPanel } from "./components/ResultPanel";
import { stepForms } from "./components/StepForm";
import { submitStep } from "./pathway";
import type { PathwayState, Step } from "./types";

const initialState: PathwayState = { currentStep: "metabolic", history: [], answers: {} };
const titles: Record<Step, string> = {
  metabolic: "Assess metabolic syndrome",
  alcohol: "Screen alcohol consumption",
  alternate: "Exclude alternate diagnoses",
  enzymes: "Review aminotransferases",
  diabetes: "Check for type 2 diabetes",
  fib4: "Calculate FIB-4",
  app: "Calculate APP",
  elastography: "Enter elastography result",
  result: "Pathway recommendation",
};
const order: Step[] = ["metabolic", "alcohol", "alternate", "enzymes", "diabetes", "fib4", "app", "elastography", "result"];

export default function App() {
  const [state, setState] = useState<PathwayState>(initialState);
  const [copied, setCopied] = useState(false);
  const index = state.currentStep === "result" ? order.length : Math.max(1, order.indexOf(state.currentStep) + 1);
  const CurrentForm = state.currentStep === "result" ? undefined : stepForms[state.currentStep];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopied(false);
    setState(submitStep(state, Object.fromEntries(new FormData(event.currentTarget))));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function click(event: MouseEvent<HTMLFormElement>) {
    const action = (event.target as HTMLElement).dataset.action;
    if (action === "back") {
      const previous = state.history.at(-1);
      if (previous) setState({ ...state, currentStep: previous, history: state.history.slice(0, -1), result: undefined });
    }
    if (action === "copy" && state.result) {
      const summary = ["MASLD Clinical Care Pathway (development)", state.result.title, state.result.message, ...state.result.summary].join("\n");
      void navigator.clipboard.writeText(summary).then(() => setCopied(true));
    }
  }

  return <>
    <header className="site-header">
      <div className="header-content">
        <a className="brand" href="./" aria-label="MASLD pathway home">
          <span className="brand-mark">M</span>
          <span><strong>MASLD Clinical Care Pathway</strong><small>Development prototype</small></span>
        </a>
        <span className="privacy-pill">Anonymous session</span>
      </div>
    </header>
    <main className="app-shell">
      <section className="intro-panel" aria-labelledby="page-title">
        <p className="eyebrow">Primary care decision support</p>
        <h1 id="page-title">MASLD Clinical Care Pathway</h1>
        <p>Answer one set of questions at a time. This tool follows the pathway from suspected steatosis through screening, elastography, and referral.</p>
        <div className="notice"><strong>Development use only.</strong> Thresholds are configurable assumptions and require clinical validation before use in patient care. Do not enter identifying information.</div>
      </section>
      <section className="pathway-card" aria-live="polite">
        <div className="progress-row">
          <div><p className="step-label">{state.currentStep === "result" ? "Complete" : `Step ${index} of ${order.length - 1}`}</p><h2>{titles[state.currentStep]}</h2></div>
          <button className="button button-quiet" type="button" onClick={() => setState(initialState)}>Start over</button>
        </div>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${(index / order.length) * 100}%` }} /></div>
        <form id="pathway-form" key={state.currentStep} onSubmit={submit} onClick={click}>
          {state.result ? <ResultPanel result={state.result} /> : CurrentForm && <CurrentForm state={state} />}
          {copied && <p className="copy-confirmation">Copied to clipboard</p>}
        </form>
      </section>
      <footer>No data is saved or sent to a server. Recommendations are generated in this browser tab.</footer>
    </main>
  </>;
}

