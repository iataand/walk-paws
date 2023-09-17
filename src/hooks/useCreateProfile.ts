import { useState } from "react";

type DogProfileData = {
  name: string;
  breed: string;
  age: number | null;
  weight: number | null;
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
    temperament: "",
    description: "",
  });

  const handleChangeDogProfileData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDogProfileData({ ...dogProfileData, [name]: value });
  };

  return {
    isWeightInKg,
    setIseWeightInKg,
    handleChangeDogProfileData,
    dogProfileData,
  };
};
