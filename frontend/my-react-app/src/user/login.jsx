import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../context/contextApi";

const LogIn = () => {
  const navigate = useNavigate();
  const { endPoint } = useContext(Context);
  const [errors, setErrors] = useState("");

  // Fetch CSRF cookie before login
  const fetchCSRF = async () => {
    try {
      await fetch("/api/sanctum/csrf-cookie", {
        credentials: "include", // important to store cookies
      });
      console.log("CSRF cookie set");
    } catch (err) {
      console.error("CSRF error", err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/");
      return;
    }

    fetchCSRF(); // fetch CSRF token on mount
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await fetchCSRF(); // ensure CSRF token is fresh

      const res = await fetch("/login", {
        method: "POST",
        credentials: "include", // important for cookies
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        localStorage.setItem("auth", "true");
        setErrors("");
        navigate("/publication");
      } else {
        setErrors(json.errors || ["Login failed"]);
      }
    } catch (err) {
      console.error(err);
      setErrors(["Login failed"]);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={submit}>
        <label>Email</label>
        <input name="email" placeholder="Enter Email" type="text" />

        <label>Password</label>
        <input name="password" placeholder="Enter Password" type="password" />

        {errors && <p style={{ color: "red" }}>{errors[0] || errors}</p>}

        <button type="submit">Sign In</button>
        <Link to={"/signup"}>Sign Up</Link>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form { display:flex; flex-direction: column; gap: 10px; width: 400px; margin:auto; }
  input { padding: 8px; border-radius:5px; border:1px solid #ccc; }
  button { padding: 10px; margin-top:10px; background:black; color:white; border:none; border-radius:5px; cursor:pointer; }
`;

export default LogIn;
