import { Box, Typography } from "@mui/material";
import useLandingPage from "../hooks/useLandingPage";

export default function SitterSwitch() {
  const { isSitter, changeIsSitter } = useLandingPage();

  return (
    <Box className="flex justify-center cursor-pointer ">
      <Typography
        className={`switch switch-left ${isSitter ? "selected-switch" : ""}`}
        onClick={() => changeIsSitter(true)}
      >
        I want to walk a dog
      </Typography>
      <Typography
        className={`switch switch-right  ${!isSitter ? "selected-switch" : ""}`}
        onClick={() => changeIsSitter(false)}
      >
        I want a dog sitter
      </Typography>
    </Box>
  );
}
