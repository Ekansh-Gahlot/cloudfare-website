import { useState } from "react";
import type { PipelineStage } from "../data/pipeline";
import { EngineBadge } from "./EngineBadge";
import { TermTooltip } from "./TermTooltip";

interface StageCardProps {
  stage: PipelineStage;
}

export function StageCard({ stage }: StageCardProps) {
  const [showTechnical, setShowTechnical] = useState(false);

  return (
    <article className="stage-card">
      <header className="stage-card__header">
        <EngineBadge engine={stage.engine} />
        <h2>{stage.name}</h2>
      </header>
      <p>{stage.plainEnglish}</p>
      <button
        type="button"
        className="stage-card__toggle"
        onClick={() => setShowTechnical((v) => !v)}
        aria-expanded={showTechnical}
      >
        {showTechnical ? "Hide technical detail" : "Show technical detail"}
      </button>
      {showTechnical && <p className="stage-card__technical">{stage.technicalDetail}</p>}
      {stage.glossaryTermIds.length > 0 && (
        <div className="stage-card__terms">
          {stage.glossaryTermIds.map((termId) => (
            <TermTooltip key={termId} termId={termId} />
          ))}
        </div>
      )}
    </article>
  );
}
