import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The form control vocabulary, in one place.
 *
 * These are the exact values the approved homepage quick enquiry already used;
 * they were lifted here so the contact page and the enquiry page cannot drift
 * into a second set of inputs. Every control is 52px or taller, labels are
 * always visible rather than being replaced by placeholders, and each error is
 * wired to its control through `aria-describedby` and `aria-invalid`.
 */

const CONTROL =
  "mt-2.5 block w-full rounded-control border border-border-strong bg-ground px-3.5 text-base text-ink " +
  "transition-colors duration-150 ease-standard placeholder:text-ink-muted hover:border-ink-muted aria-invalid:border-ink";

export const LABEL = "block text-base font-medium text-ink";

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-base text-ink">
      {message}
    </p>
  );
}

/** Text input with its label, error and the wiring between them. */
export function Field({
  id,
  label,
  error,
  hint,
  optional,
  ...input
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-napaka`;
  const hintId = `${id}-namig`;

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional ? (
          <span className="ml-2 text-sm font-normal text-ink-muted">
            neobvezno
          </span>
        ) : null}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          cn(error && errorId, hint && hintId).trim() || undefined
        }
        className={cn(CONTROL, "h-13")}
        {...input}
      />
      {hint ? (
        <p id={hintId} className="mt-2 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  error,
  optional,
  ...textarea
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const errorId = `${id}-napaka`;

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional ? (
          <span className="ml-2 text-sm font-normal text-ink-muted">
            neobvezno
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, "resize-y py-3")}
        {...textarea}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

export function Select({
  id,
  label,
  error,
  children,
  ...select
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const errorId = `${id}-napaka`;

  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(CONTROL, "h-13 appearance-none pr-11")}
          {...select}
        >
          {children}
        </select>
        {/* Drawn rather than imported: a chevron here is two lines, and the
            native control already owns the interaction. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 mt-1.5 size-2.5 -translate-y-1/2 rotate-45 border-r-2 border-b-2 border-ink-muted"
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** The privacy consent checkbox. Never pre-ticked. */
export function Consent({
  id,
  error,
  children,
  ...input
}: {
  id: string;
  error?: string;
  children: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-napaka`;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 py-1.5 text-sm text-ink-muted"
      >
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-5 shrink-0 accent-brand-strong"
          {...input}
        />
        <span className="max-w-prose">{children}</span>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/**
 * A group of checkboxes drawn as selectable chips.
 *
 * Real `<input type="checkbox">` elements inside a `<fieldset>` with a
 * `<legend>`, so the group is announced as a group, every option is announced
 * as a checkbox with its own label and state, and Tab plus Space work without a
 * single key handler. The input is visually hidden rather than replaced, which
 * is what keeps all of that true; the chip is its label, and the focus ring is
 * drawn on the chip from the input's own `:focus-visible`.
 *
 * The paint lives in `.select-chip` in globals.css rather than in
 * `peer-checked:` utilities here. The chip needs a background and a border in
 * both states, and a base utility and its own peer-checked variant end up
 * fighting over the same property; keeping both states in one component rule
 * makes the result independent of utility order.
 */
export function CheckboxChips({
  legend,
  hint,
  options,
  error,
  id,
  ...input
}: {
  legend: string;
  hint?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  error?: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const errorId = `${id}-napaka`;
  const hintId = `${id}-namig`;

  return (
    <fieldset>
      <legend className={LABEL}>{legend}</legend>

      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="checkbox"
              value={option.value}
              aria-describedby={
                cn(error && errorId, hint && hintId).trim() || undefined
              }
              className="peer sr-only"
              {...input}
            />
            <span className="select-chip inline-flex min-h-11 items-center gap-2 rounded-control px-4 text-base transition-colors duration-150 ease-standard">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                // The two opacity states live in `.select-chip` with the rest of the
                // chip. A utility here would win the cascade against them, because
                // Tailwind puts utilities in a layer above components.
                className="size-4 shrink-0 text-brand-strong transition-opacity duration-150 ease-standard"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10.5 8 14.5 16 6" />
              </svg>
              {option.label}
            </span>
          </label>
        ))}
      </div>

      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
