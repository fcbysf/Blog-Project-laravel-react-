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
            <Add />
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


const Add = () => {
  return (
    <Addbtn>
      <div>
        <button className="addbtn">
          <svg className="addbtn-cosm" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" width={128} height={128} viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M243.07324,157.43945c-1.2334-1.47949-23.18847-27.34619-60.46972-41.05859-1.67579-17.97412-8.25293-34.36328-18.93653-46.87158C149.41309,52.8208,128.78027,44,104,44,54.51074,44,22.10059,88.57715,20.74512,90.4751a3.99987,3.99987,0,0,0,6.50781,4.65234C27.5625,94.6958,58.68359,52,104,52c22.36816,0,40.89648,7.85107,53.584,22.70508,8.915,10.437,14.65625,23.9541,16.65528,38.894A133.54185,133.54185,0,0,0,136,108c-25.10742,0-46.09473,6.48486-60.69434,18.75391-12.65234,10.63379-19.91015,25.39355-19.91015,40.49463a43.61545,43.61545,0,0,0,12.69336,31.21923C76.98438,207.3208,89.40234,212,104,212c23.98047,0,44.37305-9.4668,58.97461-27.37744,12.74512-15.6333,20.05566-37.145,20.05566-59.01953,0-.1128-.001-.22559-.001-.33838,33.62988,13.48486,53.62207,36.96631,53.89746,37.2959a4.00015,4.00015,0,0,0,6.14648-5.1211ZM104,204c-27.89746,0-40.60449-19.05078-40.60449-36.75146C63.39551,142.56592,86.11621,116,136,116a124.37834,124.37834,0,0,1,38.97266,6.32617q.05712,1.63038.05761,3.27686C175.03027,177.07129,139.29785,204,104,204Z" />
          </svg>
          <svg className="highlight" viewBox="0 0 144.75738 77.18431" preserveAspectRatio="none">
            <g transform="translate(-171.52826,-126.11624)">
              <g fill="none" strokeWidth={17} strokeLinecap="round" strokeMiterlimit={10}>
                <path d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336 37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286" />
              </g>
            </g>
          </svg>
          ADD BLOG
        </button>
        <svg height={0} width={0}>
          <filter id="handDrawnNoise">
            <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" type="fractalNoise" />
            <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={3} in2="noise" in="SourceGraphic" />
          </filter>
          <filter id="handDrawnNoise2">
            <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" seed={1010} type="fractalNoise" />
            <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={3} in2="noise" in="SourceGraphic" />
          </filter>
          <filter id="handDrawnNoiset">
            <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" type="fractalNoise" />
            <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={6} in2="noise" in="SourceGraphic" />
          </filter>
          <filter id="handDrawnNoiset2">
            <feTurbulence result="noise" numOctaves={8} baseFrequency="0.1" seed={1010} type="fractalNoise" />
            <feDisplacementMap yChannelSelector="G" xChannelSelector="R" scale={6} in2="noise" in="SourceGraphic" />
          </filter>
        </svg>
      </div>
    </Addbtn>
  );
}

const Addbtn = styled.div`
  .addbtn {
    text-align: center;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    background-color: transparent;
    filter: url(#handDrawnNoise);
    display: inline-flex;
    align-items: center;
    user-select: none;
    font-family: "Courier New", monospace;
    font-size: 1rem;
    font-weight: bold;
    padding: 1em;
    border-width: 0px;
    border-radius: 2rem;
    box-shadow: #33333366 4px 4px 0 1px;
    animation: idle 1s infinite ease-in-out;
  }

  .highlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    fill: rgba(255, 225, 0, 0.5);
    stroke: rgba(255, 225, 0, 0.5); /* Yellow highlighter */
    stroke-width: 10;
    stroke-linecap: round;
    pointer-events: none;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    transition: stroke-dashoffset 0.5s ease-in-out;
  }

  @keyframes idle {
    0% {
      filter: url(#handDrawnNoise);
    }
    50% {
      rotate: 2.5deg;
      filter: url(#handDrawnNoise2);
    }
    100% {
      filter: url(#handDrawnNoise);
    }
  }

  .addbtn-cosm {
    fill: #33333366;
    transition: 0.3s ease-out;
    scale: 0.5;
    position: absolute;
    translate: calc(-100% + 24px) 1.5rem;
  }

  .addbtn:hover {
    font-weight: bold;
    border-width: 0px;
    border-radius: 2rem;
  }

  .addbtn:hover {
    font-weight: bold;
    border-width: 0px;
    border-radius: 2rem;
    rotate: -2.5deg;
    animation: hover 2.5s infinite ease-in-out;
  }

  .addbtn:hover .highlight {
    stroke-dashoffset: 0;
  }

  .addbtn:active .highlight {
    stroke-dashoffset: 1000;
    animation:
      highlight 5s infinite,
      col 0.5s forwards;
    stroke: #bc4e2666;
  }

  @keyframes col {
    0% {
      stroke: rgba(255, 225, 0, 0.5);
    }
    100% {
      stroke: #1c98eb66;
    }
  }

  @keyframes highlight {
    0% {
      stroke-dashoffset: 0;
    }
    25% {
      stroke-dashoffset: 1000;
    }
    50% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes hover {
    0% {
      rotate: 0deg;
      filter: url(#handDrawnNoise);
      translate: 0 0px;
    }
    25% {
      rotate: -1deg;
      filter: url(#handDrawnNoise2);
      translate: 0 -2px;
    }
    50% {
      rotate: 0deg;
      filter: url(#handDrawnNoise);
      translate: 0 2px;
    }
    75% {
      rotate: -1deg;
      filter: url(#handDrawnNoise2);
      translate: 0 -2px;
    }
    100% {
      rotate: 0deg;
      filter: url(#handDrawnNoise);
      translate: 0 0px;
    }
  }

  .addbtn:hover .addbtn-cosm {
    rotate: -15deg;
    translate: calc(-100% + 22px) 1.9rem;
  }

  .addbtn:active .addbtn-cosm {
    fill: #333333f1;
    rotate: -135deg;
    translate: calc(-100% + 55px) 1.6rem;
    animation: none;
  }

  .addbtn:active {
    font-weight: bold;
    border-width: 0px;
    border-radius: 2rem;
    box-shadow: inset #333333f1 4px 4px 0 1px;
    rotate: -2.5deg;
    animation: active 1s infinite ease-in-out;
  }

  @keyframes active {
    0% {
      filter: url(#handDrawnNoiset);
      translate: 0 -1px;
    }
    25% {
      rotate: -3deg;
    }
    50% {
      filter: url(#handDrawnNoiset2);
      translate: 0 1px;
    }
    66% {
      rotate: 1.5deg;
    }
    100% {
      filter: url(#handDrawnNoiset);
      translate: 0 -1px;
    }
  }`;

