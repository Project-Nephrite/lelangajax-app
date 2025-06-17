import { Routes, Route, BrowserRouter } from "react-router";
import "./App.css";
import Home from "./pages/home/HomePage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeProvider } from "@mui/material";
import theme from "./modules/theme";
import RegisterPage from "./pages/auth/RegisterPage";

function ProtectedRoute({ children }: { children: Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
