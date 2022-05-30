import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./actorsome.scss";
export default function Actor({ item, type }) {
  const [actor, setActor] = useState({});
  useEffect(() => {
    const getActor = async () => {
      try {
        const res = await axios.get("/actors/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
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
      <img className="actorImg" src={actor.profilePic} alt="" />
      <span className="actorName">{actor.name}</span>
    </div>
  );
}
