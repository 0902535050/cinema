import axios from "axios";
import React, { useEffect, useState } from "react";
import "./_user.scss";
export default function User({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/find/" + userId, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
          },
        });
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div className="userInfo">
      <img
        src={user.profilePic ? user.profilePic : "https://picsum.photos/50/50"}
        alt=""
        className="imgUserFromAdmin"
      />
      <span className="userName">{user.username}</span>
    </div>
  );
}
