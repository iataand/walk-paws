import { Box, Typography } from "@mui/material";

type PropTypes = {
  boolValue: boolean;
  boolSetter: (value: boolean) => void;
  leftText: string;
  rightText: string;
};

export default function SitterSwitch({
  boolValue,
  boolSetter,
  leftText,
  rightText,
}: PropTypes) {
  return (
    <Box className="flex cursor-pointer justify-center ">
      <Typography
        className={`w-full rounded-bl-3xl rounded-tl-3xl border border-gray-300 p-4 text-center ${
          boolValue ? "bg-blue-700 text-white" : ""
        }`}
        onClick={() => boolSetter(true)}
      >
        {leftText}
      </Typography>
      <Typography
        className={`w-full rounded-br-3xl rounded-tr-3xl border border-gray-300 p-4 text-center ${
          !boolValue ? "bg-blue-700 text-white" : ""
        }`}
        onClick={() => boolSetter(false)}
      >
        {rightText}
      </Typography>
    </Box>
  );
}
