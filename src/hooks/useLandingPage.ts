import { useState } from "react";

type UserData = {
  userName: string;
  password: string;
  confirmPassword: string;
};

export default function useLandingPage() {
  const [isSitter, setIsSitter] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeUserdata = function (event: any) {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };

  const changeIsSitter = function (isSitter: boolean) {
    setIsSitter(isSitter);
  };

  return {
    isSitter,
    setIsSitter,
    userData,
    setUserData,
    onChangeUserdata,
    changeIsSitter,
  };
}
