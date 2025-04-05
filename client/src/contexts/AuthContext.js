/* eslint-disable no-unused-vars */
import { createContext } from "react";

export const AuthContext = createContext({
    email: "",
    _id: "", 
    role: "",
    isLoading: true,
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    logoutAuthState: () => {}
});

