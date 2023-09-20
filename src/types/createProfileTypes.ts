export type DogProfileData = {
  name: string;
  breed: string;
  subBreed?: string;
  age: number | null;
  weight: number | null;
  weightUnit: "kg" | "lbs";
  temperament: string;
  description: string;
};
