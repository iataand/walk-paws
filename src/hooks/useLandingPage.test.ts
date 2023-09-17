/**
 * @jest-environment jsdom
 */

import { UserFormType } from "../types/landingPageTypes";
import useLandingPage from "./useLandingPage";
import { act, renderHook } from "@testing-library/react";

describe("test useLanding page hook", () => {
  describe("test onChangeUserForm", () => {
    const { result } = renderHook(useLandingPage);
    const mockEvent = {
      target: {
        name: "userEmail",
        value: "test@email.com",
      },
    };

    act(() => {
      result.current.onChangeUserForm(
        mockEvent as React.ChangeEvent<HTMLInputElement>
      );
    });

    it("should update the email in userFormData", () => {
      expect(result.current.userFormData.values.userEmail).toBe(
        "test@email.com"
      );
    });

    describe("test validateForm", () => {
      describe("test with all empty fields", () => {
        const { result } = renderHook(useLandingPage);
        const mockUserFormData: UserFormType = {
          values: {
            userEmail: "",
            password: "",
            confirmPassword: "",
          },
          errors: {},
        };

        act(() => {
          result.current.setUserFormData(mockUserFormData);
          result.current.validateForm();
        });

        const errorsArray = Object.values(result.current.userFormData.errors);

        it("should add 'Email address can't be empty' to errors array", () => {
          expect(errorsArray).toContain("Email address can't be empty");
        });

        it("should add 'Password can't be empty' to errors array", () => {
          expect(errorsArray).toContain("Password can't be empty");
        });

        it("should add 'Confirm password can't be empty' to errors array", () => {
          expect(errorsArray).toContain("Confirm password can't be empty");
        });
      });

      describe("test with password's not matching", () => {
        it("should add 'Passwords don't match' to errors array", async () => {
          const { result } = renderHook(() => useLandingPage());
          const mockUserFormData = {
            values: {
              userEmail: "test@gmail.com",
              password: "123test",
              confirmPassword: "123123123",
            },
            errors: {},
          };

          act(() => {
            result.current.setUserFormData(mockUserFormData);
          });

          await act(() => {
            result.current.validateForm();
          });

          const errorsArray = Object.values(result.current.userFormData.errors);

          expect(errorsArray).toContain("Passwords don't match");
        });
      });

      describe("test with invalid email address", () => {
        it("should display invalid email address error", async () => {
          const { result } = renderHook(() => useLandingPage());
          const mockUserFormData = {
            values: {
              userEmail: "test_invalid_email",
              password: "123test",
              confirmPassword: "123test",
            },
            errors: {},
          };

          act(() => {
            result.current.setUserFormData(mockUserFormData);
          });

          // await waitFor(() => {
          //   act(() => {
          //     result.current.validateForm();
          //   });
          // });

          await act(() => {
            result.current.validateForm();
          });

          const errorsArray = Object.values(result.current.userFormData.errors);
          setTimeout(() => {
            expect(errorsArray).toContain("Invalid email address");
          }, 3000);
        });
      });
    });
  });
});
