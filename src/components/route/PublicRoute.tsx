import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../utils/functions/headerFunctions";


const PublicRoute = () => {
  const token = getAccessToken();
  const isAuthenticated = !!token;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
