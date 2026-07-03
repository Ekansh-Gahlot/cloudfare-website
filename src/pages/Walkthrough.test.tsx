import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Walkthrough } from "./Walkthrough";
import { PIPELINE_STAGES } from "../data/pipeline";

function renderWalkthrough(initialEntries = ["/walkthrough"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Walkthrough />
    </MemoryRouter>
  );
}

describe("Walkthrough", () => {
  it("starts on the first stage by default", () => {
    renderWalkthrough();
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[0].name })).toBeInTheDocument();
  });

  it("starts on the requested stage when ?stage= is present", () => {
    renderWalkthrough([`/walkthrough?stage=${PIPELINE_STAGES[3].id}`]);
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[3].name })).toBeInTheDocument();
  });

  it("moves to the next stage on Next click", async () => {
    renderWalkthrough();
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[1].name })).toBeInTheDocument();
  });

  it("moves forward on ArrowRight and back on ArrowLeft", async () => {
    renderWalkthrough();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[1].name })).toBeInTheDocument();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[0].name })).toBeInTheDocument();
  });

  it("jumps to a stage when its rail item is clicked", async () => {
    renderWalkthrough();
    await userEvent.click(screen.getByRole("button", { name: new RegExp(PIPELINE_STAGES[4].name) }));
    expect(screen.getByRole("heading", { name: PIPELINE_STAGES[4].name })).toBeInTheDocument();
  });

  it("disables Previous on the first stage and Next on the last stage", async () => {
    renderWalkthrough([`/walkthrough?stage=${PIPELINE_STAGES[PIPELINE_STAGES.length - 1].id}`]);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });
});
