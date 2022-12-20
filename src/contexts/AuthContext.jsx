import { createContext, useContext, useEffect } from "react";
import React, { useState } from "react";
import { login, regist } from "../api/auth";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setPayload(null);
      return;
    }
    setIsAuthenticated(true);
    const tempPayload = jwtDecode(token);
    // console.log(tempPayload);
    setPayload(tempPayload);
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
          const { success } = await regist({
            email: data.email,
            account: data.account,
            password: data.password,
            checkPassword: data.checkPassword,
            name: data.name,
          });
          return success;
        },
        login: async (data, role) => {
          const { status, token } = await login(
            {
              account: data.account,
              password: data.password,
            },
            role
          );
          const tempPayload = jwtDecode(token);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem("token", token);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return status;
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
