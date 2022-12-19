import { createContext } from "react";
import React,{useState} from "react";

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  return <AuthContext.Provider
  value={{
   isAuthenticated,
   currentMember:payload,
   register: async(data)=>{}

  }}>{children}</AuthContext.Provider>;
};
