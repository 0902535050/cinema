import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  PlayArrow,
  Star,
  DetailsOutlined,
  Add,
  Check,
  Visibility,
} from "@material-ui/icons";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalState";
import Modal from "../modal/Modal";

export default function Listitem({ item, setOpenModal, setViaMovie }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  const { addMovieToWatchList, watchList } = useContext(GlobalContext);
  let storiedMovie = watchList.find((o) => o._id === movie._id);

  const watchListDisabled = storiedMovie ? true : false;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        });
        setMovie(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMovie();
  }, [item]);

  const setMovieOnLocalStorage = () => {
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
        <span className="supportSub">{movie.isSup}</span>
        <img src={movie.img} alt="" className="" />

        {isHovered && (
          <div className="itemInfo">
            <div className="icons">
              <button
                className="btnPlayFromListItem"
                title="Xem phim ngay"
                onClick={setMovieOnLocalStorage}
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
            <div className="itemInfoTop">
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
