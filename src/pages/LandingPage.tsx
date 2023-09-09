import { Box, Button, Card, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./styles.css";
import useLandingPage from "../hooks/useLandingPage";
import SitterSwitch from "../components/SitterSwitch";

export default function LandingPage() {
  const { onChangeUserForm, validateForm, userFormData, handleClearError } =
    useLandingPage();

  console.log(userFormData.errors);

  return (
    <Card className="card-wrapper">
      <Typography variant="h3" className="text-center">
        WalkPaws
      </Typography>
      <SitterSwitch />

      <TextField
        error={!!userFormData.errors?.userEmail}
        label="Email"
        name="userEmail"
        onChange={onChangeUserForm}
        onClick={() => handleClearError("userEmail")}
      />
      <TextField
        error={!!userFormData.errors?.password}
        label="Password"
        name="password"
        onChange={onChangeUserForm}
        onClick={() => handleClearError("password")}
        type="password"
      />
      <TextField
        error={!!userFormData.errors?.confirmPassword}
        label="Confirm Password"
        name="confirmPassword"
        onChange={onChangeUserForm}
        onClick={() => handleClearError("confirmPassword")}
        type="password"
      />
      <Button onClick={validateForm} variant="contained">
        Register
      </Button>

      <Box className="text-center">
        <Button>
          <GoogleIcon className="cursor-pointer" />
        </Button>
      </Box>
    </Card>
  );
}
