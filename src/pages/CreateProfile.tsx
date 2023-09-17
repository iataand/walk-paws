import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import SitterSwitch from "../components/SitterSwitch";
import { useCreateProfile } from "../hooks/useCreateProfile";

export default function CreateProfile() {
  const {
    isWeightInKg,
    setIseWeightInKg,
    dogProfileData,
    handleChangeDogProfileData,
  } = useCreateProfile();

  console.log(dogProfileData);
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
          <TextField
            name="breed"
            onChange={handleChangeDogProfileData}
            label="Dog breed"
            fullWidth
          />
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
          <TextField
            name="temperament"
            onChange={handleChangeDogProfileData}
            label="Dog temperament"
            fullWidth
          />
          <textarea
            name="description"
            onChange={handleChangeDogProfileData}
            placeholder="Description"
            className="h-[159px] border p-2"
          />
        </Box>
        <Box className="h-[600px] w-full border border-red-400">
          image goes here
        </Box>
      </Box>

      <Box className="pt-8 text-center">
        <Button variant="contained">Create Profile</Button>
      </Box>
    </Card>
  );
}
