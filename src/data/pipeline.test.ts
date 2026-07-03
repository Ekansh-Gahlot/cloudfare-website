import { describe, expect, it } from "vitest";
import { PIPELINE_STAGES } from "./pipeline";

describe("PIPELINE_STAGES", () => {
  it("has exactly 11 stages", () => {
    expect(PIPELINE_STAGES).toHaveLength(11);
  });

  it("has unique ids", () => {
    const ids = PIPELINE_STAGES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has sequential order starting at 0", () => {
    PIPELINE_STAGES.forEach((stage, index) => {
      expect(stage.order).toBe(index);
    });
  });

  it("splits into 8 VDH stages and 3 VVS stages", () => {
    const vdh = PIPELINE_STAGES.filter((s) => s.engine === "VDH");
    const vvs = PIPELINE_STAGES.filter((s) => s.engine === "VVS");
    expect(vdh).toHaveLength(8);
    expect(vvs).toHaveLength(3);
  });
});
