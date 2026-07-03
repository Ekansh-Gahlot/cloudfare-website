import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { StageCard } from "./StageCard";
import { PIPELINE_STAGES } from "../data/pipeline";

describe("StageCard", () => {
  const stage = PIPELINE_STAGES[0];

  it("shows plain-English text by default, technical detail after toggle", async () => {
    render(<StageCard stage={stage} />);
    expect(screen.getByText(stage.plainEnglish)).toBeInTheDocument();
    expect(screen.queryByText(stage.technicalDetail)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /technical detail/i }));
    expect(screen.getByText(stage.technicalDetail)).toBeInTheDocument();
  });
});
