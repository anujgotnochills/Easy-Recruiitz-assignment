import { useId, type ReactNode } from 'react';

export function Segment<T extends string>({ label, options, value, onChange, disabled }:
  { label: string; options: readonly { value: T; label: ReactNode }[]; value: T; onChange: (value: T) => void; disabled?: boolean }) {
  const name = useId();
  return <div className="segment" role="group" aria-label={label}>
    {options.map(option => <label key={option.value} className="segment-option">
      <input type="radio" name={name} checked={value === option.value} disabled={disabled} onChange={() => onChange(option.value)} />
      <span>{option.label}</span>
    </label>)}
  </div>;
}
