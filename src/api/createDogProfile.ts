import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const createDogProfile = (
  name: string,
  breed: string,
  description: string,
  temperament: string,
  weight: number
) => {
  const currentUserUid = auth?.currentUser?.uid;

  return addDoc(collection(db, "dog-profiles"), {
    name,
    breed,
    description,
    temperament,
    weight,
    createdBy: currentUserUid,
  });
};
