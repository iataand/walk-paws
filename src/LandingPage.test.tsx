/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "./pages/LandingPage";

test("title is displayed correctly", () => {
  render(<LandingPage />);
  const title = screen.getByText(/WalkPaws/i);
  expect(title).toBeInTheDocument();
});
