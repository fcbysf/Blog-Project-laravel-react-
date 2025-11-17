import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./comments.css";
import { Context } from "../context/contextApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Comment() {
  const navigate = useNavigate();
  const { endPoint, token } = useContext(Context);
  const { id } = useParams();
  const [pub, setPub] = useState(null);
  function fetching() {
    fetch(endPoint + `api/publication/${id}`, {
      headers: { accept: "application/json", authorization: `Bearer ${token}` },
    })
      .then((res) => {
        return res.ok ? res.json() : null;
      })
      .then((data) => setPub(data));
  }
  useEffect(() => {
    fetching();
  }, []);
  const submit = (e) => {
    e.preventDefault();
    fetch(endPoint + "api/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Bearer ${token}`,
      },
      body: new FormData(e.target),
    })
      .then((res) => (res.ok && fetching()) || null)
      .then(() => e.target.reset());
  };
  return (
    pub && (
        <div className="cmtContainer">
          <div className="pub">
      <div
        className="allC"
        style={{ width: "100%"}}
      >
        <div className="backBtn">
          <button className="button2"  onClick={() => navigate("/publication")}>
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
        </div>
            <div className="top">
              <div className="topLeft">
                <img src={pub.user.image} alt="" />
                <span>
                  <h3>
                    {pub.user.name} <br />{" "}
                    <small>
                      {pub.created_at && pub.created_at.split("T")[0]}
                    </small>
                  </h3>
                </span>
              </div>
            </div>
            <div className="main2">
              <p>{pub.title}</p>
              <img src={pub.image} alt="" />
            </div>
            <div className="comments">
              <h2>comments({pub.comments.length})</h2>
              {pub.comments.map((c) => (
                <div className="cmt" key={c.id}>
                  <div className="cmtLeft">
                    <img src={c.user.image} alt="" />
                    <p>
                      <b>
                        {c.user.name}{" "}
                        <small>{dayjs(c.created_at).fromNow()}</small>{" "}
                        <DropDown
                          id={c.id}
                          fetching={fetching}
                          comment={c.comment}
                        />
                      </b>
                      <br />
                      {c.comment}
                    </p>
                  </div>
                </div>
              ))}
              <form onSubmit={submit} className="cmtForm">
                <input type="hidden" value={id} name="publication_id" />
                <textarea
                  type="text"
                  name="comment"
                  placeholder="leave a comment"
                ></textarea>
                <button className="send">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-send"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

import styled from "styled-components";

export const DropDown = ({ id, fetching, comment }) => {
  const [showMenu, setShowMenu] = useState(true);
  const { endPoint, token } = useContext(Context);
  
  const del = (id) => {
    fetch(endPoint + `api/comment/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          fetching();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <StyledWrapper>
      <label className="popup" onClick={() => setShowMenu(!showMenu)}>
        <input type="checkbox" />
        <div className="burger" tabIndex={0}>
          <span />
          <span />
          <span />
        </div>
        {showMenu && (
          <nav className="popup-window">
            <legend>Actions</legend>
            <ul>
              <li>
                <button onClick={() => navigator.clipboard.writeText(comment)}>
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect ry={2} rx={2} height={13} width={13} y={9} x={9} />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Copy</span>
                </button>
              </li>
              <li>
                <button>
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polygon points="16 3 21 8 8 21 3 21 3 16 16 3" />
                  </svg>
                  <span>Edit</span>
                </button>
              </li>
              <hr />
              <li>
                <button onClick={() => del(id)}>
                  <svg
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    height={14}
                    width={14}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line y2={18} x2={6} y1={6} x1={18} />
                    <line y2={18} x2={18} y1={6} x1={6} />
                  </svg>
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* The design is inspired from the mockapi.io */

  .popup {
    --burger-line-width: 1.125em;
    --burger-line-height: 0.125em;
    --burger-offset: 0.625em;
    --burger-bg: rgba(0, 0, 0, 0.15);
    --burger-color: #333;
    --burger-line-border-radius: 0.1875em;
    --burger-diameter: 2.125em;
    --burger-btn-border-radius: calc(var(--burger-diameter) / 2);
    --burger-line-transition: 0.3s;
    --burger-transition: all 0.1s ease-in-out;
    --burger-hover-scale: 1.1;
    --burger-active-scale: 0.95;
    --burger-enable-outline-color: var(--burger-bg);
    --burger-enable-outline-width: 0.125em;
    --burger-enable-outline-offset: var(--burger-enable-outline-width);
    /* nav */
    --nav-padding-x: 0.25em;
    --nav-padding-y: 0.625em;
    --nav-border-radius: 0.375em;
    --nav-border-color: #ccc;
    --nav-border-width: 0.0625em;
    --nav-shadow-color: rgba(0, 0, 0, 0.2);
    --nav-shadow-width: 0 1px 5px;
    --nav-bg: #eee;
    --nav-font-family: Menlo, Roboto Mono, monospace;
    --nav-default-scale: 0.8;
    --nav-active-scale: 1;
    --nav-position-left: 0;
    --nav-position-right: unset;
    /* if you want to change sides just switch one property */
    /* from properties to "unset" and the other to 0 */
    /* title */
    --nav-title-size: 0.625em;
    --nav-title-color: #777;
    --nav-title-padding-x: 1rem;
    --nav-title-padding-y: 0.25em;
    /* nav button */
    --nav-button-padding-x: 1rem;
    --nav-button-padding-y: 0.375em;
    --nav-button-border-radius: 0.375em;
    --nav-button-font-size: 12px;
    --nav-button-hover-bg: #6495ed;
    --nav-button-hover-text-color: #fff;
    --nav-button-distance: 0.875em;
    /* underline */
    --underline-border-width: 0.0625em;
    --underline-border-color: #ccc;
    --underline-margin-y: 0.3125em;
    z-index: 10;
  }

  /* popup settings 👆 */

  .popup {
    display: inline-block;
    text-rendering: optimizeLegibility;
    position: relative;
  }

  .popup input {
    display: none;
  }

  .burger {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background: var(--burger-bg);
    width: var(--burger-diameter);
    height: var(--burger-diameter);
    border-radius: var(--burger-btn-border-radius);
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: var(--burger-transition);
    outline: var(--burger-enable-outline-width) solid transparent;
    outline-offset: 0;
  }

  .burger span {
    height: 4px;
    z-index: 1;
    width: 4px;
    background: var(--burger-color);
    border-radius: var(--burger-line-border-radius);
    position: absolute;
    transition: var(--burger-line-transition);
  }

  .burger span:nth-child(1) {
    top: var(--burger-offset);
  }

  .burger span:nth-child(2) {
    bottom: var(--burger-offset);
  }

  .burger span:nth-child(3) {
    top: 50%;
    transform: translateY(-50%);
  }

  .popup-window {
    transform: scale(var(--nav-default-scale));
    visibility: hidden;
    opacity: 0;
    position: absolute;
    padding: var(--nav-padding-y) var(--nav-padding-x);
    background: var(--nav-bg);
    font-family: var(--nav-font-family);
    color: var(--nav-text-color);
    border-radius: var(--nav-border-radius);
    box-shadow: var(--nav-shadow-width) var(--nav-shadow-color);
    border: var(--nav-border-width) solid var(--nav-border-color);
    top: calc(
      var(--burger-diameter) + var(--burger-enable-outline-width) +
        var(--burger-enable-outline-offset)
    );
    left: var(--nav-position-left);
    right: var(--nav-position-right);
    transition: var(--burger-transition);
  }

  .popup-window legend {
    padding: var(--nav-title-padding-y) var(--nav-title-padding-x);
    margin: 0;
    color: var(--nav-title-color);
    font-size: var(--nav-title-size);
    text-transform: uppercase;
  }

  .popup-window ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .popup-window ul button {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    color: var(--burger-color);
    font-size: var(--nav-button-font-size);
    padding: var(--nav-button-padding-y) var(--nav-button-padding-x);
    white-space: nowrap;
    border-radius: var(--nav-button-border-radius);
    cursor: pointer;
    column-gap: var(--nav-button-distance);
  }

  .popup-window ul li:nth-child(1) svg,
  .popup-window ul li:nth-child(2) svg {
    color: cornflowerblue;
  }

  .popup-window ul li:nth-child(4) svg,
  .popup-window ul li:nth-child(5) svg {
    color: rgb(153, 153, 153);
  }

  .popup-window ul li:nth-child(7) svg {
    color: red;
  }

  .popup-window hr {
    margin: var(--underline-margin-y) 0;
    border: none;
    border-bottom: var(--underline-border-width) solid
      var(--underline-border-color);
  }

  /* actions */

  .popup-window ul button:hover,
  .popup-window ul button:focus-visible,
  .popup-window ul button:hover svg,
  .popup-window ul button:focus-visible svg {
    color: var(--nav-button-hover-text-color);
    background: var(--nav-button-hover-bg);
  }

  .burger:hover {
    transform: scale(var(--burger-hover-scale));
  }

  .burger:active {
    transform: scale(var(--burger-active-scale));
  }

  .burger:focus:not(:hover) {
    outline-color: var(--burger-enable-outline-color);
    outline-offset: var(--burger-enable-outline-offset);
  }

  .popup input:checked + .burger span:nth-child(1) {
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  .popup input:checked + .burger span:nth-child(2) {
    bottom: 50%;
    transform: translateY(50%) rotate(-45deg);
  }

  .popup input:checked + .burger span:nth-child(3) {
    transform: translateX(
      calc(var(--burger-diameter) * -1 - var(--burger-line-width))
    );
  }

  .popup input:checked ~ nav {
    transform: scale(var(--nav-active-scale));
    visibility: visible;
    opacity: 1;
  }
`;
