import { Alert, Typography } from "@mui/material";
import { ErrorsType } from "../types/landingPageTypes";

export default function Toast({ errors }: { errors: ErrorsType }) {
  return (
    <Alert variant="filled" severity="error">
      {Object.values(errors).map((error) => (
        <Typography>{error}</Typography>
      ))}
    </Alert>
  );
}
