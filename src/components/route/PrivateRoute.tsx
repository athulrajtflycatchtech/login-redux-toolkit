import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../utils/functions/headerFunctions";

export default function PrivateRoute() {
  const token = getAccessToken();
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
