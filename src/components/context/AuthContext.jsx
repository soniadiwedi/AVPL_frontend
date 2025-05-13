import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/data";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      return null;
    }
  });



  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${baseUrl}/api/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (typeof response.data === "object" && response.data !== null) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } else {
        throw new Error("Invalid response format");
      }

      setError(null);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Failed to fetch user data.");
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, { email, password });
      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Missing token or user");
      }

      localStorage.setItem("token", (token));
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
