import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createDogProfile = (
  name: string,
  breed: string,
  description: string,
  temperament: string,
  weight: number | null,
  age: number | null,
  weightUnit: "kg" | "lbs",
  imageUrl: string
) => {
  const currentUserUid = auth?.currentUser?.uid;

  return addDoc(collection(db, "dog-profiles"), {
    name,
    breed,
    description,
    temperament,
    weight,
    age,
    weightUnit,
    createdBy: currentUserUid,
    imageUrl,
  });
};

export const createImageURL = async (file: File) => {
  const currentUserUid = auth?.currentUser?.uid;

  const storageRef = ref(
    storage,
    `dog-profile-pictures/${currentUserUid}/${file.name}`
  );
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  return imageUrl;
};
