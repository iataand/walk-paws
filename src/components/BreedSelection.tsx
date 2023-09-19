import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { useCreateProfile } from "../hooks/useCreateProfile";

export default function BreedSelection() {
  const {
    handleChangeDogBreed,
    handleChangeSubBreed,
    subBreeds,
    status,
    data,
    dogProfileData,
  } = useCreateProfile();

  return (
    <Box className="flex gap-2">
      {status === "loading" ? (
        <>loading...</>
      ) : (
        <Autocomplete
          onChange={(_, value) => handleChangeDogBreed(value)}
          options={Object.keys(data.message)}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Dog Breeds" />}
        />
      )}

      {subBreeds?.length > 0 && (
        <>
          Sub Breed:
          <Select
            value={dogProfileData.subBreed || ""}
            onChange={(e) => handleChangeSubBreed(e.target.value)}
            fullWidth
          >
            {subBreeds.map((subBreed, index) => (
              <MenuItem key={`${index}-${subBreed}`} value={subBreed}>
                {subBreed}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </Box>
  );
}
