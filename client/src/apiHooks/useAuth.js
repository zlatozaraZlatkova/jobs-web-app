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

    const fetchCurrentUser = async () => {
      try {
        const validateToken = await verifyToken();

        if (validateToken && validateToken._id) {

          changeAuthState(validateToken);

        } else {

          changeAuthState({});
        }
      } catch (error) {

        changeAuthState({});

      }
    };

    fetchCurrentUser();


  }, []);
}