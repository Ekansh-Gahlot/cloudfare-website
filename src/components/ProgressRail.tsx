import type { PipelineStage } from "../data/pipeline";

interface ProgressRailProps {
  stages: PipelineStage[];
  currentStageId: string;
  onSelect: (stageId: string) => void;
}

export function ProgressRail({ stages, currentStageId, onSelect }: ProgressRailProps) {
  return (
    <nav className="progress-rail" aria-label="Pipeline stages">
      <ol>
        {stages.map((stage) => (
          <li key={stage.id}>
            <button
              type="button"
              className={
                stage.id === currentStageId
                  ? "progress-rail__item progress-rail__item--active"
                  : "progress-rail__item"
              }
              aria-current={stage.id === currentStageId ? "step" : undefined}
              onClick={() => onSelect(stage.id)}
            >
              <span className="progress-rail__engine">{stage.engine}</span>
              <span className="progress-rail__name">{stage.name}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
