import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Landing } from "./Landing";

describe("Landing", () => {
  it("renders the hero heading and a CTA link to the walkthrough", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Vuln Harness, explained/i);
    expect(screen.getByRole("link", { name: /walk through the pipeline/i })).toHaveAttribute(
      "href",
      "/walkthrough"
    );
  });

  it("renders Discover, Validate, and Fix summary cards", () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: "Discover" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Validate" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Fix" })).toBeInTheDocument();
  });
});
