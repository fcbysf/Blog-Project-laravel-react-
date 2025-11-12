import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function CheckAuth() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (res.ok ) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          navigate("/login");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuth(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuth === null) {
    return <p>Loading...</p>; 
  }

  return isAuth ? <Outlet /> : null;
}

