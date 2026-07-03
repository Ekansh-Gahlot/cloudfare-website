import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Glossary } from "./Glossary";
import { GLOSSARY } from "../data/glossary";

describe("Glossary", () => {
  it("lists every glossary term", () => {
    render(
      <MemoryRouter>
        <Glossary />
      </MemoryRouter>
    );
    GLOSSARY.forEach((term) => {
      expect(screen.getByText(term.term)).toBeInTheDocument();
    });
  });

  it("filters terms by search input", async () => {
    render(
      <MemoryRouter>
        <Glossary />
      </MemoryRouter>
    );
    const target = GLOSSARY[0];
    const other = GLOSSARY.find((t) => t.id !== target.id)!;
    await userEvent.type(screen.getByRole("searchbox", { name: /search glossary/i }), target.term);
    expect(screen.getByText(target.term)).toBeInTheDocument();
    expect(screen.queryByText(other.term)).not.toBeInTheDocument();
  });

  it("links a term to its walkthrough stage via ?stage=", () => {
    render(
      <MemoryRouter>
        <Glossary />
      </MemoryRouter>
    );
    const term = GLOSSARY[0];
    const stageId = term.linkedStageIds[0];
    const link = screen.getAllByRole("link", { name: new RegExp(`See in walkthrough`) })[0];
    expect(link.getAttribute("href")).toContain(`stage=${stageId}`);
  });
});
