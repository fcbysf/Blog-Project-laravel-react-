import styled from "styled-components";
import { Context } from "../context/contextApi";
import { useContext } from "react";

export const Button = ({ id, fetching }) => {
   const {endPoint} = useContext(Context)
  const del = (id) => {
    fetch(endPoint+`api/publication/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
         accept: "application/json",
         'X-Xsrf-token': decodeURIComponent(document.cookie.split('=')[1])
       },
    }).then(res=>res.ok&&fetching());
  };
  return (
    <StyledWrapper>
      <button className="bin-button" onClick={() => del(id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 39 7"
          className="bin-top"
        >
          <line strokeWidth={4} stroke="white" y2={5} x2={39} y1={5} />
          <line
            strokeWidth={3}
            stroke="white"
            y2="1.5"
            x2="26.0357"
            y1="1.5"
            x1={12}
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 33 39"
          className="bin-bottom"
        >
          <mask fill="white" id="path-1-inside-1_8_19">
            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
          </mask>
          <path
            mask="url(#path-1-inside-1_8_19)"
            fill="white"
            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
          />
          <path strokeWidth={4} stroke="white" d="M12 6L12 29" />
          <path strokeWidth={4} stroke="white" d="M21 6V29" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 89 80"
          className="garbage"
        >
          <path
            fill="white"
            d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
          />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .bin-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    margin: auto;
    border-radius: 50%;
    background-color: rgb(255, 95, 95);
    cursor: pointer;
    border: 2px solid rgb(255, 201, 201);
    transition-duration: 0.3s;
    position: relative;
    overflow: hidden;
  }
  .bin-bottom {
    width: 15px;
    z-index: 2;
  }
  .bin-top {
    width: 17px;
    transform-origin: right;
    transition-duration: 0.3s;
    z-index: 2;
  }
  .bin-button:hover .bin-top {
    transform: rotate(45deg);
  }
  .bin-button:hover {
    background-color: rgb(255, 0, 0);
  }
  .bin-button:active {
    transform: scale(0.9);
  }
  .garbage {
    position: absolute;
    width: 14px;
    height: auto;
    z-index: 1;
    opacity: 0;
    transition: all 0.3s;
  }
  .bin-button:hover .garbage {
    animation: throw 0.4s linear;
  }
  @keyframes throw {
    from {
      transform: translate(-400%, -700%);
      opacity: 0;
    }
    to {
      transform: translate(0%, 0%);
      opacity: 1;
    }
  }
`;

export const Edit = () => {
  return (
    <StyledWrappe>
      <button className="editBtn">
        <svg height="1em" viewBox="0 0 512 512">
          <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
        </svg>
      </button>
    </StyledWrappe>
  );
};

const StyledWrappe = styled.div`
  .editBtn {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin: auto;
    border: none;
    background-color: rgb(93, 93, 116);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.123);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }
  .editBtn::before {
    content: "";
    width: 200%;
    height: 200%;
    background-color: rgb(102, 102, 141);
    position: absolute;
    z-index: 1;
    transform: scale(0);
    transition: all 0.3s;
    border-radius: 50%;
    filter: blur(10px);
  }
  .editBtn:hover::before {
    transform: scale(1);
  }
  .editBtn:hover {
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.336);
  }

  .editBtn svg {
    height: 17px;
    fill: white;
    z-index: 3;
    transition: all 0.2s;
    transform-origin: bottom;
  }
  .editBtn:hover svg {
    transform: rotate(-15deg) translateX(5px);
  }
  .editBtn::after {
    content: "";
    width: 25px;
    height: 1.5px;
    position: absolute;
    bottom: 19px;
    left: -5px;
    background-color: white;
    border-radius: 2px;
    z-index: 2;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease-out;
  }
  .editBtn:hover::after {
    transform: scaleX(1);
    left: 0px;
    transform-origin: right;
  }
`;
