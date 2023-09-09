import { useState } from "react";

type UserFormType = {
  values: {
    userEmail: string;
    password: string;
    confirmPassword: string;
  };
  errors?: {
    userEmail?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export const validEmail = new RegExp(
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
  });

  const onChangeUserForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      values: { ...userFormData.values, [name]: value },
    });
  };

  const changeIsSitter = (isSitter: boolean) => {
    setIsSitter(isSitter);
  };

  const validateForm = () => {
    const { userEmail, password, confirmPassword } = userFormData.values;
    const errors: {
      userEmail?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (userEmail === "") {
      errors.userEmail = "Emaill address can't be empty";
    }

    if (!password) {
      errors.password = "Password can't be empty";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Password can't be empty";
    }

    if (userEmail && !validEmail.test(userEmail)) {
      errors.userEmail = "Invalid email address";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    setUserFormData({ ...userFormData, errors });
  };

  return {
    isSitter,
    setIsSitter,
    userFormData,
    setUserFormData,
    onChangeUserForm,
    changeIsSitter,
    validateForm,
  };
}
