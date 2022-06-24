import axios from "axios";
import React, { useEffect, useState } from "react";
export default function User({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/find/" + userId, {
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
  }, [userId]);

  return (
    <div className="userInfo">
      <img
        src={user.profilePic ? user.profilePic : "https://picsum.photos/50/50"}
        alt=""
      />
      <span className="userName">{user.username}</span>
    </div>
  );
}
