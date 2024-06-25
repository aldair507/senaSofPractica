
import { Navigate } from "react-router-dom";
import { useAdmin } from "../hooks/context/AdminContext";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
