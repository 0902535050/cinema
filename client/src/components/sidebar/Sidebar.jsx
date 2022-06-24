import React, { useEffect, useState } from "react";
import "./sidebar.css";
import axios from "axios";

import {
  Facebook,
  GitHub,
  Instagram,
  Pinterest,
  Twitter,
} from "@material-ui/icons";
export default function Sidebar() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/find/" + currentUser._id, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
          },
        });
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser._id]);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://picsum.photos/200/300" alt="" />
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
