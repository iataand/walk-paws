/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "./pages/LandingPage";

const clickRegisterButton = () => {
  screen.getByRole("button", {
    name: /register/i,
  });
  const registerButton = screen.getByRole("button", {
    name: /register/i,
  });
  fireEvent.click(registerButton);
};

test("title is displayed correctly", () => {
  render(<LandingPage />);
  const title = screen.getByText(/WalkPaws/i);
  expect(title).toBeInTheDocument();
});

describe("LandingPage", () => {
  beforeEach(() => render(<LandingPage />));

  describe("test switch between dog sitter and owner", () => {
    it("should have dog sitter selected", () => {
      const dogSitter = screen.getByText(/i want to walk a dog/i);
      fireEvent.click(dogSitter);
      expect(dogSitter).toHaveClass("selected-switch");
    });

    it("should have dog owner selected", () => {
      const dogOwner = screen.getByText(/i want a dog sitter/i);
      fireEvent.click(dogOwner);
      expect(dogOwner).toHaveClass("selected-switch");
    });
  });

  describe("form validation tests", () => {
    describe("register will al fields empty", () => {
      beforeEach(() => {
        clickRegisterButton();
      });

      it('should display "empty email" error message', () => {
        const errorEmptyEmail = screen.getByText(
          "Emaill address can't be empty"
        );
        expect(errorEmptyEmail).toBeInTheDocument();
      });

      it('should display "empty password" error message', () => {
        const errorEmptyPassword = screen.getByText("Password can't be empty");
        expect(errorEmptyPassword).toBeInTheDocument();
      });

      it('should display "empty password" error message', () => {
        const errorEmptyConfirmPassword = screen.getByText(
          "Confirm password can't be empty"
        );
        expect(errorEmptyConfirmPassword).toBeInTheDocument();
      });
    });

    describe("register with invalid email address", () => {
      beforeEach(() => {
        const emailInput = screen.getByLabelText("Email");
        fireEvent.change(emailInput, {
          target: { value: "invalid email address" },
        });

        clickRegisterButton();
      });

      it('should display "invalid email address" error message', () => {
        const invalidEmailAddress = screen.getByText("Invalid email address");
        expect(invalidEmailAddress).toBeInTheDocument();
      });
    });

    describe("register not matching passwords", () => {
      beforeEach(() => {
        const passwordInput = screen.getByLabelText("Password");
        const confirmPasswordInput = screen.getByLabelText("Confirm Password");

        fireEvent.change(passwordInput, {
          target: { value: "aaaabbbbcccc" },
        });

        fireEvent.change(confirmPasswordInput, {
          target: { value: "123123123" },
        });

        clickRegisterButton();
      });

      it('should display "passwords don\'t match" error message', () => {
        const errorPasswordsDontMatch = screen.getByText(
          "Passwords don't match"
        );
        expect(errorPasswordsDontMatch).toBeInTheDocument();
      });
    });
  });
});
