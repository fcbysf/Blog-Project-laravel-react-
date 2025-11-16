import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import NavBar from "./navBar";
import "./profile.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DropDown } from "../publication/comments";
import NotFound from "../notFound";
import { Context } from "../context/contextApi";
dayjs.extend(relativeTime);

export default function Profile() {
  const [showPub, setShowPub] = useState(true);
  const {endPoint,token} = useContext(Context)
  const [name, setName] =useState('')
  const [bio, setBio] =useState('')
  const [showCom, setShowCom] = useState(false);
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const style = ({ isActive }) => {
    if (isActive) {
      return {
        opacity: 1,
        textDecoration: "underline",
        textShadow: "2px 2px 60px black",
      };
    }
  };
  function fetching() {
    fetch(endPoint+`api/user/${id}`, {
      headers: { accept: "application/json",authorization: `Bearer ${token}`},
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else return setNotFound(true);
      })
      .then((data) => {
        setUser(data?.user);
        setAuthUser(data?.authUser);
        return;
      });
  }
  useEffect(() => {
    fetching();
  }, [id]);
  useEffect(() => {
    user &&
      user.comments.map((comment) => {
        if (!comments.includes(comment.publication_id)) {
          comments.push(comment.publication_id);
          comments.map((id) => {
            id == comment.publication_id && comments.push(comment);
          });
        }
      });
  }, [user]);
  const del = (id) => {
    fetch(endPoint+`api/publication/${id}`, {
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
        console.log(err);
      });
  };
  const editPrf = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("_method", "PUT");
    fetch(endPoint+`api/user/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          fetching();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (notFound) return <NotFound />;

  return (
    <div className="profileContainer">
      <NavBar />
      <div className="profile">
        <div className="contLeft">
          <div className="leftSide">
            <img src={user?.image} alt="" />
            <h2>{user?.name}</h2>
            <p>{user?.bio}</p>
            {user && user.id == authUser && (
              <button onClick={() =>{ setIsEdit(!isEdit);setName(user?.name);setBio(user?.bio)}}>Edit Profile</button>
            )}
          </div>
          {isEdit && (
            <form
              className="EditPrf"
              onSubmit={editPrf}
              encType="multipart/form-data"
            >
              <h2>Edit profile</h2>
              <label htmlFor="name">Edit Name</label>
              <input type="text" name="name" placeholder="Edit Name" value={name} onChange={(e)=>setName(e.target.value)}/>
              <label htmlFor="bio">Edit Bio</label>
              <input type="text" name="bio" placeholder="Edit Bio" value={bio} onChange={(e)=>setBio(e.target.value)}/>
              <label htmlFor="image">
                Edit image <br />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-image svgimg"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3" />
                  <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
                </svg>
                +
              </label>
              <input
                type="file"
                name="image"
                id="image"
                style={{ display: "none" }}
              />
              <button>Edit Profile</button>
            </form>
          )}
        </div>
        <div className="rightSide">
          <div className="actionNav">
            <NavLink
              to={`/profile/${id}/publication`}
              onClick={() => {
                setShowPub(true);
                setShowCom(false);
              }}
              className={"actions"}
              style={style}
            >
              Publication
            </NavLink>
            <NavLink
              to={`/profile/${id}/comments`}
              onClick={() => {
                setShowPub(false);
                setShowCom(true);
              }}
              className={"actions"}
              style={style}
            >
              Comments
            </NavLink>
          </div>
          <div className="ProfilePublications">
            {(user && !showCom && user.publication.length == 0 && (
              <p>no publication yet</p>
            )) ||
              (showPub &&
                user &&
                user.publication.map((pub) => (
                  <div className="userPub" key={pub.id}>
                    <div className="pbCnt">
                      <div className="lft">
                        <small style={{ opacity: 0.5 }}>
                          {dayjs(pub.created_at).fromNow()}
                        </small>
                        <p>{pub.title}</p>
                      </div>
                      <img src={pub.image} alt="" />
                    </div>
                    {pub.user_id == authUser && (
                      <div className="delEdit">
                        <button
                          className="buttonDel"
                          onClick={() => del(pub.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 14"
                            className="svgIcon bin-top"
                          >
                            <g clip-path="url(#clip0_35_24)">
                              <path
                                fill="black"
                                d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_24">
                                <rect
                                  fill="white"
                                  height="14"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 69 57"
                            className="svgIcon bin-bottom"
                          >
                            <g clip-path="url(#clip0_35_22)">
                              <path
                                fill="black"
                                d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_35_22">
                                <rect
                                  fill="white"
                                  height="57"
                                  width="69"
                                ></rect>
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <button className="edit-button">
                          <svg className="edit-svgIcon" viewBox="0 0 512 512">
                            <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )))}

            {(user && !showPub && user.comments.length == 0 && (
              <p>no comments yet</p>
            )) ||
              (showCom &&
                user &&
                comments.map(
                  (c) =>
                    typeof c === "object" && (
                      <div className="userPub" key={c.id}>
                        <div className="pbCnt">
                          <div className="lft">
                            <small style={{ opacity: 0.5 }}>
                              {dayjs(c.publication.created_at).fromNow()}
                            </small>
                            <p>{c.publication.title}</p>
                          </div>
                          <img src={c.publication.image} alt="" />
                        </div>
                        <div className="cmtLeft">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {user.comments.map(
                              (cmt) =>
                                cmt.publication_id == c.publication_id && (
                                  <div style={{ display: "flex" }}>
                                    <img src={user.image} alt="" />
                                    <p>
                                      <b>
                                        {user.name}{" "}
                                        <small>
                                          {dayjs(cmt.created_at).fromNow()}
                                          <DropDown
                                            id={cmt.id}
                                            fetching={fetching}
                                            comment={cmt.comment}
                                          />
                                        </small>
                                      </b>
                                      {cmt.comment}
                                      <br />
                                    </p>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    )
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
