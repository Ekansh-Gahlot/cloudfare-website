import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EngineBadge } from "./EngineBadge";

describe("EngineBadge", () => {
  it("renders the VDH label", () => {
    render(<EngineBadge engine="VDH" />);
    expect(screen.getByText(/VDH/)).toBeInTheDocument();
  });

  it("renders the VVS label", () => {
    render(<EngineBadge engine="VVS" />);
    expect(screen.getByText(/VVS/)).toBeInTheDocument();
  });
});
