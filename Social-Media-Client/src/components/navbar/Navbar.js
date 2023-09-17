import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Avatar from "../Avatar/Avatar";
import "./Navbar.scss";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";

function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

  // console.log(myProfile);

  async function handleLogoutClicked() {
    try {
      await axiosClient.post("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="nav-bar">
      <div className="container">
        <h2 className="baner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <BiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
