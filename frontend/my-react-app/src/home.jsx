import { Link } from "react-router-dom";
import NavBar from "./user/navBar";
import { useContext } from "react";
import { Context } from "./context/contextApi";

export default function Home() {
  const {isLogedIn} = useContext(Context)
  return (
    <div className="container">
      <NavBar />
      <main>
        <div className="mainLeft">
          <h2>
            <b>B</b>LOGGY, where you can share your idea to the world <br />
            switch yoLucaa aebiiiii
          </h2>
          {!isLogedIn&&
          <Link to={"/signUp"}>
            <button className="cssbuttons-io-button">
              Get started
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </Link>}
        </div>
        <div className="mainRight">
          <img
            src="images/Lovepik_com-450102998-Tech service hand drawn illustration website data protection.png"
            alt=""
          />
        </div>
      </main>
      <div className="buttom">
        <div className="btmLeft">
          <img src="/images/blog.jpg" alt="" className="modelImg" />
        </div>
        <div className="btmRight">
          <div className="topRight">
            <div className="div1">
              <h2>Get started</h2>
              <p>for exulusive drops and blogs, don't sleep on this</p>
            </div>
            <div className="div2">
              <small>all the subjects from the world</small>
              <h3>fashion, sport, politique, nature, AI, technologie, IT</h3>
              <a>learn more</a>
            </div>
            <div className="div3">
              <small>new tape</small>
              <h2>this is how we start hustling</h2>
              <a>learn more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
