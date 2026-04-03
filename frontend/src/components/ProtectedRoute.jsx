import { Navigate } from "react-router-dom";

/*
Prevent unauthorized access
*/

const ProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");

  if (!token) {
     return <Navigate to="/login" />;
   
  }

  return children;
};

export default ProtectedRoute;