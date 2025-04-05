/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useInitializeAuth } from "../apiHooks/useAuth";

export const AuthContextProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    email: "",
    _id: "",
    role: "",
    isLoading: true
  });

  const logoutAuthState = () => {
    setAuthState({
      email: "",
      _id: "",
      role: "",
      isLoading: false
    });
  };


  const changeAuthState = (state) => {
    if (!state || Object.keys(state).length === 0) {
      setAuthState({
        email: "",
        _id: "",
        role: "",
        isLoading: false
      });
    } else {
      setAuthState({
        ...state,
        isLoading: false
      });
    }
  };

  useInitializeAuth(changeAuthState);


  const contextData = {
    email: authState.email,
    _id: authState._id,
    role: authState.role,
    isAuthenticated: !!authState.email,
    changeAuthState,
    logoutAuthState,
    isLoading: authState.isLoading,
  };

  return (
    <AuthContext.Provider value={contextData}>
        {children}
    </AuthContext.Provider>
  );
};
