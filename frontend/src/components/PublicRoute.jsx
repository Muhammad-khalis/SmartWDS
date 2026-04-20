import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Agar user pehle se login hai (token mojood hai), 
  // toh usay wapis login page par na jane do, seedha dashboard bhej do.
  if (token) {
    return <Navigate to="/" replace />;
  }

  // Agar login nahi hai, toh page (Login/Register) dikha do.
  return children;
};

export default PublicRoute;