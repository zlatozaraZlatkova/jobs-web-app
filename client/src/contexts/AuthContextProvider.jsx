/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useInitializeAuth } from "../apiHooks/useAuth";

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  useInitializeAuth(changeAuthState);

  const contextData = {
    email: authState.email,
    _id: authState._id,
    role: authState.role,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  );
};
