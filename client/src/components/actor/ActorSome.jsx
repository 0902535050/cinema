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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
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
        <div className="actorImgAria">
          <img className="actorImg" src={actor.profilePic} alt="" />
        </div>
      </Link>
      <span className="actorName">{actor.name}</span>
    </div>
  );
}
