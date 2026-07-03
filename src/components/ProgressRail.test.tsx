import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProgressRail } from "./ProgressRail";
import { PIPELINE_STAGES } from "../data/pipeline";

describe("ProgressRail", () => {
  it("calls onSelect with the clicked stage id", async () => {
    const onSelect = vi.fn();
    render(
      <ProgressRail stages={PIPELINE_STAGES} currentStageId={PIPELINE_STAGES[0].id} onSelect={onSelect} />
    );
    await userEvent.click(screen.getByRole("button", { name: new RegExp(PIPELINE_STAGES[2].name) }));
    expect(onSelect).toHaveBeenCalledWith(PIPELINE_STAGES[2].id);
  });
});
