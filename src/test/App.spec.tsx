import { describe, expect, it } from "vitest";
import { render, screen } from "../utils/test-utils";
import App from "../App";

describe("Portfolio app", () => {
  it("renders the portfolio interface without the terminal", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "Portfolio kỹ thuật viên điện lạnh",
      })
    ).toBeInTheDocument();
    expect(screen.queryByTitle("terminal-input")).not.toBeInTheDocument();
  });
});
