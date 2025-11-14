import { use, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import styled from "styled-components";
import { Context } from "../context/contextApi";

const LogIn = () => {
  const navigate = useNavigate();
  const {endPoint} = useContext(Context)
  const [errors, setErrors] = useState("");
  useEffect(() => {
    if(localStorage.getItem('auth')=='true'){
      navigate('/')
      return
    }
    fetch(endPoint+"sanctum/csrf-cookie", {
      credentials: "include",
    })
  }, []);
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    fetch(endPoint+"login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        'X-Xsrf-Token': document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))?.split('=')[1]
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) return res.json();
        else {
          navigate("/publication");
          localStorage.setItem('auth', "true")
        }
      })
      .then((data) => (data.errors ? setErrors(data.errors) : setErrors("")));
  };
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(";").shift());
}

  return (
    <StyledWrapper className="test">
      <button className="button2" onClick={() => navigate("/")}>
        <svg
          height="16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 1024 1024"
        >
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
        </svg>
        <span>Back</span>
      </button>
      <form className="form" onSubmit={submit}>
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            viewBox="0 0 32 32"
            height={20}
          >
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            placeholder="Enter your Email"
            name="email"
            className="input"
            type="text"
          />
        </div>
        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            viewBox="-64 0 512 512"
            height={20}
          >
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            placeholder="Enter your Password"
            name="password"
            className="input"
            type="password"
          />
        </div>
        {errors && (
          <p style={{ color: "red" }}>email or password incorrect ! </p>
        )}
        <div className="flex-row">
          <div>
            <input type="radio" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button type="submit" className="button-submit">
          Sign In
        </button>
        <Link to={"/signup"}>
          <p className="p">
            Don't have an account? <span className="span">Sign Up</span>
          </p>
        </Link>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    margin: 50px auto;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }

  @media screen and (max-width: 768px) {
    .form {
      width: 80%;
    }
  }

  @media screen and (max-width: 480px) {
    .form {
      width: 95%;
    }
  }
`;

export default LogIn;
