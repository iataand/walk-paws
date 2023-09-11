import { useState } from "react";
import {
  ErrorsType,
  FieldNamesType,
  UserFormType,
} from "../types/landingPageTypes";

const userNameInUse = function () {
  //Promise that simulates backend call for email taken error after 1 second delay

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Email adress already in use");
    }, 1000);
  });
};

const validEmail = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

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
  const [errorsArray, setErrorsArray] = useState<string[]>([]);

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

  const validateForm = async () => {
    const { userEmail, password, confirmPassword } = userFormData.values;
    const errors: ErrorsType = {};
    setErrorsArray([]);

    if (userEmail === "") {
      errors.userEmail = "Email address can't be empty";
    }

    if (userEmail && !validEmail.test(userEmail)) {
      errors.userEmail = "Invalid email address";
    }

    if (userEmail && validEmail.test(userEmail)) {
      setIsLoading(true);
      const isEmailInUse = await userNameInUse();
      setIsLoading(false);

      !isEmailInUse && (errors.userEmail = "Email address already in use");
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
    Object.values(errors).length > 0 && setErrorsArray(Object.values(errors));
  };

  const handleClearError = (fieldName: FieldNamesType) => {
    const { errors } = userFormData;

    errors[fieldName] && delete errors[fieldName];
    setUserFormData({ ...userFormData, errors });
  };

  return {
    isSitter,
    setIsSitter,
    userFormData,
    setUserFormData,
    onChangeUserForm,
    validateForm,
    handleClearError,
    isLoading,
    errorsArray,
  };
}
