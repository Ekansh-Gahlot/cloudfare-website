import type { Engine } from "../data/pipeline";

interface EngineBadgeProps {
  engine: Engine;
}

export function EngineBadge({ engine }: EngineBadgeProps) {
  const label = engine === "VDH" ? "VDH · Discovery" : "VVS · Validation & Scoring";
  return <span className={`engine-badge engine-badge--${engine.toLowerCase()}`}>{label}</span>;
}
