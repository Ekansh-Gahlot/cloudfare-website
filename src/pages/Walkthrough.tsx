import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PIPELINE_STAGES } from "../data/pipeline";
import { ProgressRail } from "../components/ProgressRail";
import { StageCard } from "../components/StageCard";

function indexForStageId(stageId: string | null): number {
  if (!stageId) return 0;
  const index = PIPELINE_STAGES.findIndex((s) => s.id === stageId);
  return index >= 0 ? index : 0;
}

export function Walkthrough() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(() => indexForStageId(searchParams.get("stage")));

  const currentStage = PIPELINE_STAGES[currentIndex];

  useEffect(() => {
    setSearchParams({ stage: currentStage.id }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage.id]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        setCurrentIndex((i) => Math.min(i + 1, PIPELINE_STAGES.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === PIPELINE_STAGES.length - 1;

  return (
    <div className="walkthrough">
      <ProgressRail
        stages={PIPELINE_STAGES}
        currentStageId={currentStage.id}
        onSelect={(stageId) => setCurrentIndex(indexForStageId(stageId))}
      />
      <div className="walkthrough__panel">
        <StageCard key={currentStage.id} stage={currentStage} />
        <div className="walkthrough__nav">
          <button type="button" disabled={isFirst} onClick={() => setCurrentIndex((i) => i - 1)}>
            Previous
          </button>
          <span className="walkthrough__position">
            Stage {currentIndex + 1} of {PIPELINE_STAGES.length}
          </span>
          <button type="button" disabled={isLast} onClick={() => setCurrentIndex((i) => i + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
