import { render, screen } from "@testing-library/react";
import HomePage from "../src/app/(routes)/home/page.tsx";

test("renders greeting message", () => {
  render(<HomePage />);
  const homePagetext = screen.getByText("Welcome to the home page!");
  expect(homePagetext).toBeInTheDocument();
});
