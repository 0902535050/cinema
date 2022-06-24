import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Actor({ item }) {
  const [actor, setActor] = useState({});

  useEffect(() => {
    const getActor = async () => {
      try {
        const res = await axios.get("/actors/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
          },
        });
        setActor(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    getActor();
  }, [item]);
  return (
    <div className="actorPageSome">
      <Link to={{ pathname: "/actorpage", actor: actor }}>
        <img className="actorImg" src={actor.profilePic} alt="" />
      </Link>
      <span className="actorName">{actor.name}</span>
    </div>
  );
}
