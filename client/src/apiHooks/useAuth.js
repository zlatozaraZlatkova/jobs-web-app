import { useContext, useState } from "react";
import { login, register } from "../api/authApi";
import { AuthContext } from "../contexts/AuthContext";


export function useLogin() {
  const { changeAuthState} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true);

      const result = await login(email, password);
      changeAuthState(result);

      return true;

    } catch (err) {
      console.error("Error user login:", err);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    changeAuthState,
    isLoading,
    loginHandler,
  };
}


export function useRegister() {
  const { changeAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const registerHandler = async(name, email, password, role) => {

    try {
      setIsLoading(true);
      
      const result = await register(name, email, password, role);
      console.log("Registration successful:", result);
      
      changeAuthState(result)
      
      return result;

    } catch (err) {
      console.error("Registration error:", err);
      return null;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    changeAuthState,
    isLoading,
    registerHandler
  };
}
