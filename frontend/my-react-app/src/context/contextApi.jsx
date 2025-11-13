import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const UserProvider = ({ children }) => {
  const [isLigedIn, setIsLogedIn] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  const endPoint = "http://localhost:8000/";

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        setAuthUserId(data);
        setIsLogedIn(true);
      } else {
        setIsLogedIn(false);
        setAuthUserId(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsLogedIn(false);
      setAuthUserId(null);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLigedIn !== null) {
      checkAuth();
    }
  }, [isLigedIn]);
  return (
    <Context.Provider value={{ authUserId, isLigedIn, checkAuth, endPoint }}>
      {children}
    </Context.Provider>
  );
};

export default UserProvider;
