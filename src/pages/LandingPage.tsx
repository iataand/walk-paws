import { Box, Button, Card, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./styles.css";
import useLandingPage from "../hooks/useLandingPage";
import SitterSwitch from "../components/SitterSwitch";
import ErrorAlerts from "../components/ErrorAlerts";

export default function LandingPage() {
  const {
    onChangeUserForm,
    validateForm,
    userFormData,
    isLoading,
    isSitter,
    setIsSitter,
  } = useLandingPage();

  return (
    <Card className="card-wrapper">
      <Typography variant="h3" className="text-center">
        WalkPaws
      </Typography>

      <SitterSwitch isSitter={isSitter} setIsSitter={setIsSitter} />

      <TextField
        error={!!userFormData.errors?.userEmail}
        label="Email"
        name="userEmail"
        onChange={onChangeUserForm}
      />
      <TextField
        error={!!userFormData.errors?.password}
        label="Password"
        name="password"
        onChange={onChangeUserForm}
        type="password"
      />
      <TextField
        error={!!userFormData.errors?.confirmPassword}
        label="Confirm Password"
        name="confirmPassword"
        onChange={onChangeUserForm}
        type="password"
      />
      <Button
        name="registerButton"
        disabled={isLoading}
        onClick={validateForm}
        variant="contained"
      >
        Register
      </Button>

      <ErrorAlerts errorsArray={Object.values(userFormData.errors)} />

      <Box className="text-center">
        <Button>
          <GoogleIcon className="cursor-pointer" />
        </Button>
      </Box>
    </Card>
  );
}
