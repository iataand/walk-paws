import {
  Box,
  Button,
  Card,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SitterSwitch from "../components/SitterSwitch";
import { useCreateProfile } from "../hooks/useCreateProfile";
import BreedSelection from "../components/BreedSelection";
import { createDogProfile } from "../api/createDogProfile";
import { auth } from "../../firebase";

export default function CreateProfile() {
  const {
    isWeightInKg,
    setIseWeightInKg,
    handleChangeDogProfileData,
    handleChangeTemperament,
    dogProfileData,
    selectedImage,
    setSelectedImage,
  } = useCreateProfile();

  const handleCreateProfile = async () => {
    await createDogProfile(
      "test",
      "bichon2",
      "description",
      "temperametn",
      100
    );
  };

  return (
    <Card className="m-auto mt-[15vh] max-w-[1200px] p-8">
      <Typography className="py-8 text-center" variant="h4">
        Create your first dog profile
      </Typography>

      <Box className="flex justify-between gap-4">
        <Box className="flex w-full flex-col gap-8">
          <TextField
            name="name"
            onChange={handleChangeDogProfileData}
            label="Dog name"
            fullWidth
          />

          <BreedSelection />

          <Box className="flex gap-6">
            <TextField
              name="age"
              onChange={handleChangeDogProfileData}
              label="Dog age"
              fullWidth
              type="number"
            />
          </Box>
          <Box className="flex gap-6">
            <TextField
              name="weight"
              onChange={handleChangeDogProfileData}
              label="Dog weight"
              fullWidth
              type="number"
            />
            <SitterSwitch
              boolValue={isWeightInKg}
              boolSetter={setIseWeightInKg}
              leftText="Kg"
              rightText="Lbs"
            />
          </Box>

          <Select
            value={dogProfileData.temperament}
            name="temperament"
            onChange={handleChangeTemperament}
          >
            <MenuItem value="Confident">Confident</MenuItem>
            <MenuItem value="Shy or Timid">Shy or Timid</MenuItem>
            <MenuItem value="Independent">Independent</MenuItem>
            <MenuItem value="Laidback, Happy">Laidback, Happy</MenuItem>
            <MenuItem value="Adaptable">Adaptable</MenuItem>
          </Select>

          <textarea
            name="description"
            onChange={handleChangeDogProfileData}
            placeholder="Description"
            className="h-[159px] border p-2"
          />
        </Box>

        <Box className="a flex h-[600px] w-full flex-col items-center justify-center border border-red-400">
          {selectedImage && (
            <>
              <img alt="not found" src={URL.createObjectURL(selectedImage)} />
            </>
          )}
          <TextField
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const selectedFiles = e.target.files as FileList;
              console.log("here");
              setSelectedImage(selectedFiles[0]);
            }}
          />
        </Box>
      </Box>

      <Box className="pt-8 text-center">
        <Button variant="contained" onClick={handleCreateProfile}>
          Create Profile
        </Button>
      </Box>
    </Card>
  );
}
