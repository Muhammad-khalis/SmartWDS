import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast"; // Toast notifications ke liye

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Global Notifications */}
        <Toaster position="top-right" reverseOrder={false} />
        
        {/* All Application Routes */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;