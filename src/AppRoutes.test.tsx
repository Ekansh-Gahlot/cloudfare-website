import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppRoutes } from "./AppRoutes";

describe("AppRoutes", () => {
  it("renders Landing at /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/Vuln Harness, explained/i)).toBeInTheDocument();
  });

  it("redirects unknown paths to /", () => {
    render(
      <MemoryRouter initialEntries={["/nonexistent"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText(/Vuln Harness, explained/i)).toBeInTheDocument();
  });
});
