import React from "react";
import "./sidebar.css";

import {
  Facebook,
  GitHub,
  Instagram,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
export default function Sidebar() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={
            currentUser.avatar !== ""
              ? currentUser.avatar
              : "https://picsum.photos/200/300"
          }
          alt=""
        />
        <p>My silence is just another world for pain.</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Life</li>
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Cinema</li>
          <li className="sidebarListItem">Calisthenic</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW ME</span>
        <div className="sidebarSocial">
          <a href="https://www.facebook.com/khongyeu1aidau/">
            <Facebook className="sidebarIcon" />
          </a>
          <a href="https://www.instagram.com/thnhh.tnn/">
            <Instagram className="sidebarIcon" />
          </a>
          <a href="https://github.com/ThanhTuan090398">
            <GitHub className="sidebarIcon" />
          </a>
          <a>
            <Pinterest className="sidebarIcon" />
          </a>
          <a>
            <Twitter className="sidebarIcon" />
          </a>
        </div>
      </div>
    </div>
  );
}
