import {
  Box,
  Button,
  Card,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import useLandingPage from "../hooks/useLandingPage";
import SitterSwitch from "../components/SitterSwitch";
import ErrorAlerts from "../components/ErrorAlerts";
import { signInWithGoogle } from "../auth/createUser";

export default function LandingPage() {
  const {
    onChangeUserForm,
    validateForm,
    userFormData,
    isLoading,
    isSitter,
    setIsSitter,
    loginOrRegister,
    handleLoginSwitch,
  } = useLandingPage();

  return (
    <Card className="m-auto mt-[15vh] max-w-2xl p-8">
      <Typography variant="h3" className="text-center">
        WalkPaws
      </Typography>

      <Box className="py-2 text-center">
        Register
        <Switch
          checked={loginOrRegister === "login"}
          color="default"
          onChange={handleLoginSwitch}
        />
        Login
      </Box>

      <Box className="py-8">
        <SitterSwitch
          boolValue={isSitter}
          boolSetter={setIsSitter}
          leftText="I want to walk a dog"
          rightText="I want a dog sitter"
        />
      </Box>

      <Box className="flex flex-col gap-8 pb-8">
        <TextField
          error={!!userFormData.errors?.userEmail}
          label="Email"
          name="userEmail"
          value={userFormData.values.userEmail}
          onChange={onChangeUserForm}
        />
        <TextField
          error={!!userFormData.errors?.password}
          label="Password"
          name="password"
          onChange={onChangeUserForm}
          value={userFormData.values.password}
          type="password"
        />
        {loginOrRegister === "register" && (
          <TextField
            error={!!userFormData.errors?.confirmPassword}
            label="Confirm Password"
            name="confirmPassword"
            value={userFormData.values.confirmPassword}
            onChange={onChangeUserForm}
            type="password"
          />
        )}

        <Button
          name="registerButton"
          disabled={isLoading}
          onClick={validateForm}
          variant="contained"
        >
          {loginOrRegister === "login" ? "Login" : "Register"}
        </Button>
      </Box>

      <ErrorAlerts errorsArray={Object.values(userFormData.errors)} />

      <Box className="pt-2 text-center">
        <Button onClick={signInWithGoogle}>
          <GoogleIcon className="cursor-pointer" />
        </Button>
      </Box>
    </Card>
  );
}
