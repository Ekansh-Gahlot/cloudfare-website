import { useState } from "react";
import { GLOSSARY } from "../data/glossary";

interface TermTooltipProps {
  termId: string;
}

export function TermTooltip({ termId }: TermTooltipProps) {
  const [open, setOpen] = useState(false);
  const term = GLOSSARY.find((t) => t.id === termId);
  if (!term) {
    throw new Error(`Unknown glossary term id: ${termId}`);
  }
  return (
    <span className="term-tooltip">
      <button
        type="button"
        className="term-tooltip__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {term.term}
      </button>
      {open && (
        <span role="note" className="term-tooltip__definition">
          {term.definition}
        </span>
      )}
    </span>
  );
}
