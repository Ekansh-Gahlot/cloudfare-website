import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TermTooltip } from "./TermTooltip";
import { GLOSSARY } from "../data/glossary";

describe("TermTooltip", () => {
  const term = GLOSSARY[0];

  it("shows the definition only after clicking", async () => {
    render(<TermTooltip termId={term.id} />);
    expect(screen.queryByText(term.definition)).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(term.term));
    expect(screen.getByText(term.definition)).toBeInTheDocument();
  });
});
