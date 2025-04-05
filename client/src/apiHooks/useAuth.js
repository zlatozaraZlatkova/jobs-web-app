/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import { login, register, logout, verifyToken } from "../api/authApi";
import { AuthContext } from "../contexts/AuthContext";


export function useLogin() {
  const { changeAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginHandler = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await login(email, password);

      if (result.isError === true) {
        setError(result.message);
        return false;
      }

      changeAuthState({
        _id: result._id,
        email: result.email,
        role: result.role
      });

      return true;

    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changeAuthState,
    isLoading,
    loginHandler,
    error
  };
}


export function useRegister() {
  const { changeAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerHandler = async (name, email, password, role) => {

    try {
      setIsLoading(true);
      setError(null);

      const result = await register(name, email, password, role);
      //console.log("Registration successful:", result);

      if (result.isError === true) {
        setError(result.message);
        return false;
      }

      changeAuthState({
        _id: result._id,
        email: result.email,
        role: result.role
      });

      return result;

    } catch (err) {
      setError(err.message);
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    changeAuthState,
    isLoading,
    registerHandler,
    error
  };
}


export function useLogout() {
  const { changeAuthState } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await logout();

      if (response.isError === true) {
        setError(response.message);
        return false;
      }

      changeAuthState({});

      return true;

    } catch (err) {
      setError(err.message);
      return false;

    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    logoutHandler,
    error
  };
}

export function useInitializeAuth(changeAuthState) {

  useEffect(() => {
    let isMounted = true;

    const fetchCurrentUser = async () => {
      try {
        const validateToken = await verifyToken();

        if (validateToken && validateToken._id && isMounted) {
          console.log("Authentication successful:", validateToken);
          changeAuthState(validateToken);

        } else if (isMounted) {
          console.log("Invalid token response:", validateToken);
          changeAuthState({});
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