import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Context } from "../context/contextApi";
const LogIn = () => {
  const navigate = useNavigate();
  const { endPoint } = useContext(Context);
  const [errors, setErrors] = useState("");
  // Configure Axios defaults
  axios.defaults.withCredentials = true;  // Keep for cookies
  axios.defaults.withXSRFToken = true;    // Auto-handles CSRF header
  axios.defaults.baseURL = endPoint;      // Backend URL
  // Fetch CSRF cookie using Axios (respects baseURL)
  const fetchCSRF = async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");  // Now goes to backend
      console.log("CSRF cookie set");
    } catch (err) {
      console.error("CSRF error", err);
    }
  };
  // On mount
  useEffect(() => {
    if (localStorage.getItem("auth") === "true") {
      navigate("/");
      return;
    }
},[])
  return (
    <StyledWrapper>
      <button className="button2" onClick={() => navigate("/")}>
        Back
      </button>

      <form className="form" onSubmit={submit}>
        <div className="flex-column">
          <label>Email</label>
        </div>
        <div className="inputForm">
          <input placeholder="Enter your Email" name="email" type="text" />
        </div>

        <div className="flex-column">
          <label>Password</label>
        </div>
        <div className="inputForm">
          <input placeholder="Enter your Password" name="password" type="password" />
        </div>

        {errors && <p style={{ color: "red" }}>{errors[0] || errors}</p>}

        <div className="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me</label>
          </div>
          <span className="span">Forgot password?</span>
        </div>

        <button type="submit" className="button-submit">Sign In</button>
        <Link to={"/signup"}>
          <p className="p">
            Don't have an account? <span className="span">Sign Up</span>
          </p>
        </Link>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form { display:flex; flex-direction: column; gap: 10px; background-color: #fff; padding:30px; margin:50px auto; width:450px; border-radius:20px; }
  .inputForm { border:1.5px solid #ecedec; border-radius:10px; height:50px; display:flex; align-items:center; padding-left:10px; }
  .inputForm input { border:none; margin-left:10px; width:100%; height:100%; border-radius:10px; }
  .inputForm:focus-within { border-color:#2d79f3; }
  .button-submit { margin:20px 0 10px 0; background:#151717; border:none; color:white; border-radius:10px; height:50px; width:100%; cursor:pointer; }
  .flex-row { display:flex; justify-content:space-between; align-items:center; gap:10px; }
  .span { color:#2d79f3; cursor:pointer; }
  .p { text-align:center; font-size:14px; margin:5px 0; }
`;

export default LogIn;
