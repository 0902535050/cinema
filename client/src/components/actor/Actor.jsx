import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Actor({ item, type }) {
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
  }, [item, type]);
  return (
    <>
      {type === "name" ? (
        <div>
          <Link to={{ pathname: "/actorpage", actor: actor }}>
            <span>{String(actor.name).substring(0, 16) + " ,"}</span>
          </Link>
        </div>
      ) : (
        <div className="actorPage">
          <div className="card">
            <div className="card-top">
              <Link to={{ pathname: "/actorpage", actor: actor }}>
                <img className="actorImg" src={actor.profilePic} alt="" />
              </Link>
            </div>
            <div className="card-bot">
              <span className="actorName">
                {String(actor.name).substring(0, 16)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
