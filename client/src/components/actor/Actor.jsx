import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Actor({ item, type }) {
  const [actor, setActor] = useState({});
  console.log(type);
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
  }, [item, type]);
  return (
    <>
      {type === "name" ? (
        <div>
          <span>{String(actor.name).substring(0, 16) + " ,"}</span>
        </div>
      ) : (
        <div className="actorPage">
          <div className="card">
            <div className="card-top">
              <img className="actorImg" src={actor.profilePic} alt="" />
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
