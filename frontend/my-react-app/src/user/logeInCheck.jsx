import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./loader";

export function CheckAuth() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null)
  const {endPoint} = useContext(Context)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(endPoint+"api/user", {
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
    return <Loader />; 
  }

  return isAuth ? <Outlet /> : null;
}

