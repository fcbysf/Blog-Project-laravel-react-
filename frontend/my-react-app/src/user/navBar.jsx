import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import LogOut from "../publication/logoutBtn";
import { Context } from "../context/contextApi";

const NavBar = () => {
  const { authUserId, isLogedIn, checkAuth,token } = useContext(Context);
  useEffect(() => {
    checkAuth();
  }, [isLogedIn,token]);


  const style = ({ isActive }) => {
    if (isActive) {
      return {
        boxShadow: "6px 6px 20px white , -6px -6Px 20px white ",
      };
    }
  };
  return (
    <StyledWrapper>
      <header>
        <nav>
          <div className="left">
            <h1>Bloggy</h1>
          </div>
          <div className="button-container">
            <NavLink to={"/"} style={style} className="button">
              <svg
                className="icon"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
              </svg>
            </NavLink>
            <NavLink to={"/publication"} style={style} className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-file-earmark-post"
                viewBox="0 0 16 16"
              >
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
                <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H4.5a.5.5 0 0 1-.5-.5" />
              </svg>
            </NavLink>
            <NavLink to={`/profile/${authUserId}`} style={style} className="button">
              <svg
                className="icon"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
              </svg>
            </NavLink>
            <NavLink to={"/test"} style={style} className="button">
              <svg
                className="icon"
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={9} cy={21} r={1} />
                <circle cx={20} cy={21} r={1} />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </NavLink>
          </div>

          <div className="right">
            {isLogedIn === false && <Link to={"/login"}>Login</Link>}
            {isLogedIn && <LogOut />}
          </div>
        </nav>
      </header>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button-container {
    display: flex;
    background-color: rgb(15, 13, 13);
    width: 530px;
    margin: 22px auto 0 auto;
    height: 55px;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
  }

  .button {
    outline: 0 !important;
    border: 0 !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }

  .button:hover {
    transform: translateY(-3px);
  }

  .icon {
    font-size: 20px;
  }

  @media screen and (max-width: 768px) {
    .button-container {
      width: 100%;
      flex-direction: column;
      height: auto;
      background-color: transparent;
    }

    .button {
      margin: 10px 0;
    }

    nav {
      flex-direction: column;
      align-items: center;
    }

    .right {
      margin-top: 20px;
    }
  }
`;

export default NavBar;
