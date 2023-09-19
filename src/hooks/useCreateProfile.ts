import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../api/getDogBreeds";

type DogProfileData = {
  name: string;
  breed: string;
  subBreed?: string;
  age: number | null;
  weight: number | null;
  weightUnit: "kg" | "lbs";
  temperament: string;
  description: string;
};

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
  }, [dogProfileData]);

  const handleChangeDogProfileData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDogProfileData({ ...dogProfileData, [name]: value });
  };

  const handleChangeDogBreed = (value: string | null) => {
    setDogProfileData({
      ...dogProfileData,
      breed: value || "",
    });
  };

  const handleChangeSubBreed = (value: string | null) => {
    setDogProfileData({ ...dogProfileData, subBreed: value || "" });
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
  };
};
