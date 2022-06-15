import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./_actor.scss";

export default function Actor({ item }) {
  const [actor, setActor] = useState({});
  useEffect(() => {
    const getActor = async () => {
      try {
        const res = await axios.get("/actors/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
    <div className="actorPage">
      <div className="card">
        <div className="card-top">
          <img className="actorImg" src={actor.profilePic} alt="" />
        </div>
        <div className="card-bot">
          <span className="actorName">{actor.name}</span>
        </div>
      </div>
    </div>
  );
}
