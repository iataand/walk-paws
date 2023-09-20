import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

const useAuth = () => {
  return !!auth.currentUser;
};

const ProtectedRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
