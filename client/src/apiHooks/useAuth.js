import { useContext, useState, useEffect } from "react";
import { login, register, logout, verifyToken } from "../api/authApi";
import { AuthContext } from "../contexts/AuthContext";


export function useLogin() {
  const { changeAuthState} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true);

      const result = await login(email, password);

      changeAuthState({
        _id: result._id,
        email: result.email,
        role: result.role
      });

      return true;

    } catch (err) {
      console.error("Error user login:", err);
      throw err;

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
      
      changeAuthState({
        _id: result._id,
        email: result.email,
        role: result.role
      });
      
      return result;

    } catch (err) {
      console.error("Registration error:", err);
      throw err;

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


export function useLogout() {
  const { changeAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);

      await logout();
    
      changeAuthState({});  
      
      return true;

    } catch (err) {
      console.error("Error user logout:", err);
      throw err;
      
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    logoutHandler
  };
}

export function useInitializeAuth(changeAuthState) {

  useEffect(() => {
    let isMounted = true; 
    
    const fetchCurrentUser = async () => {
      try {
        const validateToken = await verifyToken();

        if (isMounted) {
          changeAuthState(validateToken);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (isMounted) {
          changeAuthState({});
        }
      }
    };

    fetchCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);
}