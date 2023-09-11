import { Box, Typography } from "@mui/material";

type PropTypes = {
  isSitter: boolean;
  setIsSitter: (value: boolean) => void;
};

export default function SitterSwitch({ isSitter, setIsSitter }: PropTypes) {
  return (
    <Box className="flex justify-center cursor-pointer ">
      <Typography
        className={`switch switch-left ${isSitter ? "selected-switch" : ""}`}
        onClick={() => setIsSitter(true)}
      >
        I want to walk a dog
      </Typography>
      <Typography
        className={`switch switch-right  ${!isSitter ? "selected-switch" : ""}`}
        onClick={() => setIsSitter(false)}
      >
        I want a dog sitter
      </Typography>
    </Box>
  );
}
