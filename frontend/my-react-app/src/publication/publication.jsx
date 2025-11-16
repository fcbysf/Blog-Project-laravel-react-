import { useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import "./publication.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import styled from "styled-components";
import { Button, Edit } from "./deleteBtn";
import NavBar from "../user/navBar";

const Menu = ({ id, fetching }) => {
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  return (
    <StyledWrapper>
      <button className="button" onClick={showMenu}>
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z" />
        </svg>
      </button>
      {menu && (
        <div className="menu">
          <Button id={id} fetching={fetching} />
          <Edit />
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* works only on a dark background with these paremeters*/

  .button {
    border-radius: 50%;
    border: none;
    display: flex;
    place-items: center;
    background-color: transparent;
    cursor: pointer;
  }

  .button > svg {
    border-radius: inherit;
    padding: 0.5rem;
    fill: black;
    /* SVG color */
    width: 38px;
    /* default width 32px */
    height: 38px;
    /* default height 32px */
  }

  .button > svg:active {
    background-color: rgba(65, 65, 65, 0.5);
  }

  .button > svg:not(:active) {
    animation: fadeOut 0.9s;
  }

  @keyframes fadeOut {
    0% {
      outline: 1px solid rgba(90, 90, 90, 0.5);
      /* If you use border it will take space inside and slightly move the SVG */
    }

    100% {
      background-color: transparent;
    }
  }
`;

export default function Publiaction() {
  const navigate = useNavigate();
  const [pubOwner, setPubOwner] = useState(null);
  const [publication, setPublication] = useState([]);
  const [errors, setErrors] = useState({});
  const [adding, setAdding] = useState(false);
   const {endPoint,token} = useContext(Context)
  const [pubAdded, setPubAdded] = useState(false);
  console.log(token)
  function fetching() {
    fetch(endPoint+"api/publication", {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setPublication(data.publications.data);
        setPubOwner(data.userP);
        setAdding(false);
      });
  }
  useEffect(() => {
    fetching();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setPubAdded(false);
    }, 3000);
  }, [pubAdded]);
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch(endPoint+"api/publication", {
      method: "POST",
      credentials: "include",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          setPubAdded(true);
          setErrors({});
          fetching();
          e.target.reset();
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => (data.errors ? setErrors(data.errors) : null));
  };

  return (
    <>
      <NavBar />
      <div>
        {pubAdded && (
          <p
            style={{
              textAlign: "center",
              backgroundColor: "lightgreen",
              padding: "9px",
              color: "white",
            }}
          >
            blog Added ✅
          </p>
        )}

        <button
          className="btn"
          style={{ float: "right" }}
          onClick={() => setAdding(!adding)}
        >
          <span className="btn__text">Add Blog</span>
          <span className="btn__icon">
            <svg
              className="svg"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          </span>
        </button>
        {adding && (
          <form
            onSubmit={submit}
            style={{ float: "right" }}
            className="AddForm"
          >
            <input type="text" name="title" placeholder="Blog title" />
            {errors.title && <p style={{ color: "red" }}>{errors.title} </p>}
            <label htmlFor="file" style={{ textAlign: "center" }} className="svgimg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
              </svg> +
            </label>
            <input
              type="file"
              name="image"
              id="file"
              style={{ display: "none" }}
            />
            {errors.image && <p style={{ color: "red" }}>{errors.image} </p>}
            <button className="submit">Add Blog</button>
          </form>
        )}
        <div className="publications">
          {publication.map((p) => (
            <div className="publication" key={p.id}>
              <div className="top">
                <div className="topLeft">
                  <img
                    src={p.user.image}
                    alt=""
                    onClick={() => navigate(`/profile/${p.user.id}`)}
                  />
                  <span>
                    <h3
                      onClick={() => navigate(`/profile/${p.user.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      {p.user.name} <br />{" "}
                      <small style={{ opacity: 0.4 }}>
                        {dayjs(p.created_at).fromNow()}
                      </small>
                    </h3>
                  </span>
                </div>
                {p.user_id === pubOwner && (
                  <Menu id={p.id} fetching={fetching} />
                )}
              </div>
              <div className="main">
                <p>{p.title}</p>
                <img src={p.image} alt="" />
              </div>
              <div className="actions">
                <button
                  className="comment"
                  onClick={() => navigate(`/publication/${p.id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-chat"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                  </svg>
                  Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
