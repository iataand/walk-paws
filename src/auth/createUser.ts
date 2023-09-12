import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export const createUser = function (email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
  // .then((userCredential) => {
  //   const user = userCredential.user;
  //   alert(user);
  // })
  // .catch((error) => {
  //   console.log(error);
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.error({ errorCode, errorMessage });
  //   // ..
  // });
};
