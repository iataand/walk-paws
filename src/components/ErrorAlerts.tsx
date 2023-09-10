import { Alert, Typography } from "@mui/material";

type PropType = { errorsArray: string[] };

export default function ErrorAlerts({ errorsArray }: PropType) {
  if (!errorsArray.length) {
    return null;
  }

  return (
    <Alert severity="error">
      {errorsArray.map((error, index) => (
        <Typography key={`${error}-${index}`}>{error}</Typography>
      ))}
    </Alert>
  );
}
