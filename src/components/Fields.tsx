import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, ...props }: InputProps) {
  return (
    <div className="field">
      <label htmlFor={props.id}>{label}</label>
      <input {...props} />
      {hint && <small className="field-hint">{hint}</small>}
    </div>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: [string, string][];
};

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <div className="field">
      <label htmlFor={props.id}>{label}</label>
      <select {...props}>
        <option value="">Select an option</option>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
    </div>
  );
}

type CheckProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function Check({ label, ...props }: CheckProps) {
  return (
    <label className="check-row" htmlFor={props.id}>
      <input {...props} type="checkbox" />
      <span>{label}</span>
    </label>
  );
}

export function Actions({ back = true, nextLabel = "Continue" }) {
  return (
    <div className="button-row">
      {back && <button className="button button-secondary" type="button" data-action="back">Back</button>}
      <button className="button button-primary" type="submit">{nextLabel}</button>
    </div>
  );
}

