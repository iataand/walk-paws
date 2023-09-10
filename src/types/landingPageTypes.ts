export type UserFormType = {
  values: {
    userEmail: string;
    password: string;
    confirmPassword: string;
  };
  errors: {
    userEmail?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export type ErrorsType = UserFormType["errors"];

export type FieldNamesType = "userEmail" | "password" | "confirmPassword";
