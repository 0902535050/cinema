import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./_movie.scss";

export default function Movie({ item }) {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMovie();
  }, [item]);
  return (
    <div className="actorPage">
      <div className="card">
        <div className="card-top">
          <img className="actorImg" src={movie.img} alt="" />
        </div>
        <div className="card-bot">
          <span className="actorName">{movie.title}</span>
        </div>
      </div>
    </div>
  );
}
