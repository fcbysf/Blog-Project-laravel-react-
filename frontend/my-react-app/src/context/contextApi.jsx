import { createContext, useEffect, useState } from "react";

export const Context = createContext();


export const UserProvider = ({ children }) => {
  const [isLigedIn, setIsLogedIn] = useState(null);
  const [authUserId, setAuthUserId] = useState(null);
  useEffect(() => {
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
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLogedIn(false);
      }
    };

    checkAuth();
  }, []);
  return (
    <Context.Provider value={{authUserId, isLigedIn}}>
      {children}
    </Context.Provider>
  );
};

export default UserProvider;
