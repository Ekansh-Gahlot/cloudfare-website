import { describe, expect, it } from "vitest";
import { GLOSSARY } from "./glossary";
import { PIPELINE_STAGES } from "./pipeline";

describe("GLOSSARY", () => {
  const stageIds = new Set(PIPELINE_STAGES.map((s) => s.id));

  it("has unique term ids", () => {
    const ids = GLOSSARY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("links every term to at least one real stage", () => {
    GLOSSARY.forEach((term) => {
      expect(term.linkedStageIds.length).toBeGreaterThan(0);
      term.linkedStageIds.forEach((stageId) => {
        expect(stageIds.has(stageId)).toBe(true);
      });
    });
  });
});

describe("PIPELINE_STAGES glossary references", () => {
  const termIds = new Set(GLOSSARY.map((t) => t.id));

  it("only references glossary terms that exist", () => {
    PIPELINE_STAGES.forEach((stage) => {
      stage.glossaryTermIds.forEach((termId) => {
        expect(termIds.has(termId)).toBe(true);
      });
    });
  });
});
