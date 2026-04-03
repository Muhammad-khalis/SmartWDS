import { createContext, useState, useContext } from "react";

// 1. Context Create Kiya
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login logic
  const login = (data) => {
    if (data && data.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
    }
  };

  // Logout logic
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 2. Value object mein functions ko pass kiya
  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
