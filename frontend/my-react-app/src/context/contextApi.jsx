import { createContext, useEffect, useState } from "react";

export const Context = createContext();

export const UserProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  const [token, setToken] = useState(null);
  const endPoint = "https://firstbackenddeploy.up.railway.app/";
  const checkAuth = async () => {
    try {
      const res = await fetch(endPoint + "api/user", {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}`},
      });

      if (res.ok) {
        const data = await res.json();
        setIsLogedIn(true);
        setAuthUserId(data);
      } else {
        setIsLogedIn(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsLogedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);



  return (
    <Context.Provider value={{ authUserId,setIsLogedIn, isLogedIn, endPoint, token, setToken,setAuthUserId }}>
      {children}
    </Context.Provider>
  );
};

export default UserProvider;
