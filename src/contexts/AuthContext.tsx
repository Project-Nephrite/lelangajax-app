// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import type { IUserResource } from "../interfaces/IUser";
import { useNavigate } from "react-router";

type AuthContextType = {
  user: IUserResource;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      AuthService.getCurrentUser()
        .then(setUser)
        .catch(() => AuthService.logout());
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await AuthService.login(email, password);
    } catch (error) {
      throw error;
    }
    const me = await AuthService.getCurrentUser();
    setUser(me);
    return;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
