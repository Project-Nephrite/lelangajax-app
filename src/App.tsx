import { Routes, Route, BrowserRouter } from "react-router";
import "./App.css";
import Home from "./pages/home/HomePage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import { ThemeProvider } from "@mui/material";
import theme from "./modules/theme";
import RegisterPage from "./pages/auth/RegisterPage";
import MyListingPage from "./pages/selling/MyListingPage";
import type { ReactNode } from "react";
import MyListing_Create from "./pages/selling/MyListing_Create";
import MyListing_List from "./pages/selling/MyListing_List";
import ListingDetailPage from "./pages/listing/ListingDetailPage";

function ProtectedRoute({ children }: { children: ReactNode }) {
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
            <Route
              path="/myListing"
              element={
                <ProtectedRoute>
                  <MyListingPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<MyListing_List />} />
              <Route path="create" element={<MyListing_Create />} />
            </Route>
            <Route path="/listing/:id" element={<ListingDetailPage />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
