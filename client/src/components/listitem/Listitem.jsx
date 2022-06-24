import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PlayArrow, Star, Visibility } from "@material-ui/icons";
import axios from "axios";

export default function Listitem({
  item,
  setOpenModal,
  setViaMovie,
  setScrolled,
  setIsShow,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
          },
        });
        setMovie(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMovie();
  }, [item]);

  const handleMovie = () => {
    setScrolled(true);
    setIsShow(false);
    localStorage.setItem("movies", JSON.stringify(movie));
  };

  const showModal = () => {
    setOpenModal(true);
    setViaMovie(movie);
  };

  return (
    <div className="singleItemPlace text-align-center">
      <div
        className="listItem"
        style={{ left: isHovered }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="supportSub">
          {movie.isSup === null ? "" : movie.isSup}
        </span>
        <img src={movie.img} alt="" className="" />

        {isHovered && (
          <div className="itemInfo">
            <div className="icons">
              <button
                className="btnPlayFromListItem"
                title="Xem phim ngay"
                onClick={() => handleMovie()}
              >
                <Link
                  to={{ pathname: "/watch", movie: movie }}
                  className="link"
                >
                  <PlayArrow className="iconPlay" />
                </Link>
              </button>

              <button
                className="btnReviewFromListItem"
                title="Xem review phim"
                onClick={showModal}
              >
                <Visibility className="iconWatch" />
              </button>
            </div>
            <div className="itemInfoTop container">
              <span className="limit">{movie.limit}+</span>
              <span className="year">{movie.year}</span>
              <span className="genre">{movie.genre}</span>
              <span className="duration">{movie.duration}min</span>
              <span className="imdb">
                {movie.imdb}
                <Star style={{ color: "orange", fontSize: "19px" }} />
              </span>
            </div>
            <div className="title">
              <span>{movie.title}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
