import React, { useContext } from "react";
import "./topbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
  ArrowDropDown,
} from "@material-ui/icons";

import { logout } from "../../context/authContext/AuthActions";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN</span>
        </div>
        <div className="topRight">
          <img src={currentUser.profilePic} alt="" className="topAvatar" />
          <div className="topbarIconContainer">
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <Link to="/userpage" className="link">
                  <span>Settings</span>
                </Link>
                <Link to="/login" className="link">
                  <span onClick={() => dispatch(logout())}>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
