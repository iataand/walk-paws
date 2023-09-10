/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "./pages/LandingPage";

test("title is displayed correctly", () => {
  render(<LandingPage />);
  const title = screen.getByText(/WalkPaws/i);
  expect(title).toBeInTheDocument();
});

test("change between I want to walk a dog and I want a dog sitter", () => {
  render(<LandingPage />);

  const dogSitter = screen.getByText(/i want to walk a dog/i);
  fireEvent.click(dogSitter);
  expect(dogSitter).toHaveClass("selected-switch");

  const dogOwner = screen.getByText(/i want a dog sitter/i);
  fireEvent.click(dogOwner);
  expect(dogOwner).toHaveClass("selected-switch");
});

test("register with all fields empty", () => {
  render(<LandingPage />);

  const registerButton = screen.getByRole("button", {
    name: /register/i,
  });

  fireEvent.click(registerButton);

  const errorEmptyEmail = screen.getByText(/Emaill address can't be empty/i);
  const errorEmptyPassword = screen.getByText("Password can't be empty");
  const errorEmptyConfirmPassword = screen.getByText(
    "Confirm password can't be empty"
  );

  expect(errorEmptyEmail).toBeInTheDocument();
  expect(errorEmptyPassword).toBeInTheDocument();
  expect(errorEmptyConfirmPassword).toBeInTheDocument();
});

test("register with invalid email", () => {
  render(<LandingPage />);
  const emailInput = screen.getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "invalid email address" } });

  const registerButton = screen.getByRole("button", {
    name: /register/i,
  });

  fireEvent.click(registerButton);

  const errorInvalidEmail = screen.getByText("Invalid email address");
  expect(errorInvalidEmail).toBeInTheDocument();
});

test("passwords don't match", () => {
  render(<LandingPage />);
  const passwordInput = screen.getByLabelText("Password");
  const configmPasswordInput = screen.getByLabelText("Confirm Password");

  fireEvent.change(passwordInput, {
    target: { value: "aaaabbbbcccc" },
  });

  fireEvent.change(configmPasswordInput, {
    target: { value: "123123123" },
  });

  const registerButton = screen.getByRole("button", {
    name: /register/i,
  });

  fireEvent.click(registerButton);

  const errorPasswordsDontMatch = screen.getByText("Passwords don't match");
  expect(errorPasswordsDontMatch).toBeInTheDocument();
});
