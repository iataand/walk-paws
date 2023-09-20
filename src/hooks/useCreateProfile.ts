import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../api/getDogBreeds";
import { SelectChangeEvent } from "@mui/material";
import { createDogProfile, createImageURL } from "../api/createDogProfile";
import { DogProfileData } from "../types/createProfileTypes";
import { auth, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useCreateProfile = function () {
  const [isWeightInKg, setIseWeightInKg] = useState(true);
  const [dogProfileData, setDogProfileData] = useState<DogProfileData>({
    name: "",
    breed: "",
    age: null,
    weight: null,
    weightUnit: "kg",
    temperament: "",
    description: "",
  });
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(
    null
  );

  const { data, error, status } = useQuery({
    queryKey: ["dogBreeds"],
    queryFn: getBreeds,
  });

  useEffect(() => {
    setDogProfileData({
      ...dogProfileData,
      weightUnit: isWeightInKg === true ? "kg" : "lbs",
    });
  }, [isWeightInKg]);

  useEffect(() => {
    if (data?.message && data.message[dogProfileData.breed]?.length > 0) {
      setSubBreeds(data.message[dogProfileData.breed]);
    } else {
      const dogDataCopy = { ...dogProfileData };
      setSubBreeds([]);
      delete dogDataCopy.subBreed;

      setDogProfileData(dogDataCopy);
    }
  }, [dogProfileData.breed]);

  const handleChangeDogProfileData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDogProfileData({ ...dogProfileData, [name]: value });
  };

  const handleChangeDogBreed = (value: any) => {
    setDogProfileData({
      ...dogProfileData,
      breed: value || "",
    });
  };

  const handleChangeSubBreed = (value: string | null) => {
    setDogProfileData({ ...dogProfileData, subBreed: value || "" });
  };

  const handleChangeTemperament = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;

    setDogProfileData({ ...dogProfileData, temperament: value || "" });
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setSelectedImage(selectedFiles[0]);
  };

  const handleDeletePicture = () => {
    selectedImage && setSelectedImage(null);
  };

  const handleCreateProfile = async () => {
    const imageUrl = await createImageURL(selectedImage as File);

    await createDogProfile(
      dogProfileData.name,
      dogProfileData.breed,
      dogProfileData.description,
      dogProfileData.temperament,
      dogProfileData.weight,
      dogProfileData.age,
      dogProfileData.weightUnit,
      imageUrl
    );
  };

  const validateProfileData = () => {
    if (!dogProfileData.name) {
      return false;
    }
    if (!dogProfileData.breed) {
      return false;
    }
    if (!dogProfileData.description) {
      return false;
    }
    if (!dogProfileData.temperament) {
      return false;
    }
    if (!dogProfileData.weight) {
      return false;
    }
    if (!dogProfileData.age) {
      return false;
    }
    if (!selectedImage) {
      return false;
    }

    return true;
  };

  return {
    isWeightInKg,
    setIseWeightInKg,
    handleChangeDogProfileData,
    dogProfileData,
    handleChangeDogBreed,
    data,
    error,
    status,
    subBreeds,
    handleChangeSubBreed,
    handleChangeTemperament,
    selectedImage,
    setSelectedImage,
    handleChangeImage,
    handleDeletePicture,
    handleCreateProfile,
    validateProfileData,
  };
};
