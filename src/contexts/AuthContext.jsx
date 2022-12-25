import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";
import { checkPermmision, login, regist } from "../api/auth";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  regist: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    const checkToken = async () => {
      const { success } = await checkPermmision({ token });
      if (!success) {
        console.log("失敗");
        navigate("/layout/login");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      console.log("成功");
      setIsAuthenticated(true);
      const tempPayload = jwtDecode(token);
      // console.log(tempPayload);
      setPayload(tempPayload);
    };
    checkToken();
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.id,
          name: payload.name,
          role: payload.role,
        },
        regist: async (data) => {
          const { success, errorMessage } = await regist({
            email: data.email,
            account: data.account,
            password: data.password,
            checkPassword: data.checkPassword,
            name: data.name,
          });
          if (success) {
            return { success: true };
          } else {
            return { success: false, errorMessage: errorMessage };
          }
        },
        login: async (data, role) => {
          const { success, token } = await login(
            {
              account: data.account,
              password: data.password,
            },
            role
          );
          if (token) {
            const tempPayload = jwtDecode(token);
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          if (success) return { success: true };
          else return { success: false };
        },
        logout: () => {
          localStorage.removeItem("token");
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
