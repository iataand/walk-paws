import { useState } from "react";
import { ErrorsType, UserFormType } from "../types/landingPageTypes";
import { createUser } from "../auth/createUser";
import { FirebaseError } from "firebase/app";

const AUTH_ERROR_CODES = {
  INVALID_EMAIL: "auth/invalid-email",
  EMAIL_TAKEN: "auth/email-already-in-use",
  INVALID_PASSWORD: "auth/weak-password",
};

export default function useLandingPage() {
  const [isSitter, setIsSitter] = useState(false);
  const [userFormData, setUserFormData] = useState<UserFormType>({
    values: {
      userEmail: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeUserForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { errors } = userFormData;

    if (errors.hasOwnProperty(name)) {
      delete errors[name as keyof typeof errors];
    }

    setUserFormData({
      ...userFormData,
      values: { ...userFormData.values, [name]: value },
      ...errors,
    });
  };

  const loginWithEmailAndPassword = async () => {
    const { userEmail, password } = userFormData.values;

    const handleEmailAlreadyInUse = () => {
      setUserFormData({
        ...userFormData,
        errors: {
          ...userFormData.errors,
          userEmail: "Email address already  in use",
        },
      });
    };

    const handleInvalidEmail = () => {
      setUserFormData({
        ...userFormData,
        errors: {
          ...userFormData.errors,
          userEmail: "Invalid email address",
        },
      });
    };

    const handleInvalidPassword = () => {
      setUserFormData({
        ...userFormData,
        errors: {
          ...userFormData.errors,
          password: "Password must contain at least six characters",
        },
      });
    };

    setIsLoading(true);
    try {
      await createUser(userEmail, password);
    } catch (e) {
      const typedError = e as FirebaseError;

      if (typedError.code === AUTH_ERROR_CODES.EMAIL_TAKEN) {
        handleEmailAlreadyInUse();
      } else if (typedError.code === AUTH_ERROR_CODES.INVALID_EMAIL) {
        handleInvalidEmail();
      } else if (typedError.code === AUTH_ERROR_CODES.INVALID_PASSWORD) {
        handleInvalidPassword();
      } else {
        console.error("something went wrong...");
      }
    }
    setIsLoading(false);
  };

  const validateForm = async () => {
    const { userEmail, password, confirmPassword } = userFormData.values;
    const errors: ErrorsType = {};

    if (userEmail === "") {
      errors.userEmail = "Email address can't be empty";
    }

    if (!password) {
      errors.password = "Password can't be empty";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password can't be empty";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setUserFormData({ ...userFormData, errors });

    if (Object.values(errors).length === 0) {
      loginWithEmailAndPassword();
    }
  };

  return {
    isSitter,
    setIsSitter,
    userFormData,
    setUserFormData,
    onChangeUserForm,
    validateForm,
    isLoading,
  };
}
