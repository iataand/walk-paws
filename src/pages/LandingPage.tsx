import { Box, Button, Card, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./styles.css";
import useLandingPage from "../hooks/useLandingPage";
import SitterSwitch from "../components/SitterSwitch";

export default function LandingPage() {
  const { onChangeUserdata } = useLandingPage();

  return (
    <Card className="card-wrapper">
      <Typography variant="h3" className="text-center">
        WalkPaws
      </Typography>
      <SitterSwitch />

      <TextField label="Email" name="email" onChange={onChangeUserdata} />
      <TextField label="Password" name="password" onChange={onChangeUserdata} />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        onChange={onChangeUserdata}
      />

      <Box className="text-center">
        <Button>
          <GoogleIcon className="cursor-pointer" />
        </Button>
      </Box>
    </Card>
  );
}
