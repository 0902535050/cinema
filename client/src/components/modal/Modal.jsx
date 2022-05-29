import {
  Add,
  Bookmark,
  Check,
  DetailsOutlined,
  InfoOutlined,
  PlayArrow,
  Star,
} from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./modal.scss";

function Modal({ movie, setOpenModal }) {
  const { addMovieToWatchList, watchList } = useContext(GlobalContext);
  let storiedMovie = watchList.find((o) => o._id === movie._id);

  const watchListDisabled = storiedMovie ? true : false;

  const setMovieOnLocalStorage = () => {
    localStorage.setItem("movies", JSON.stringify(movie));
  };

  return (
    <div className="modalBackground">
      <div
        className="modalContainer"
        onMouseLeave={() =>
          setTimeout(() => {
            setOpenModal(false);
          }, 2000)
        }
      >
        <div>
          <iframe
            className="modalTrailer"
            src={movie.trailer}
            allowFullScreen="true"
          />
        </div>
        <div className="body">
          <span className="movieTitle">{movie.title}</span>
          <span className="movieDesc">
            {String(movie.desc).substring(0, 250)}
          </span>
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
        </div>
        <div className="footer">
          <Link to={{ pathname: "/watch", movie: movie }} className="linkStyle">
            <button
              className="btnPlayFromListItem"
              title="Xem phim ngay"
              onClick={setMovieOnLocalStorage}
            >
              <PlayArrow className="iconPlay" />
              Xem ngay
            </button>
          </Link>
          <button
            title="Lưu xem sau"
            className="btnAddFromListItem"
            disabled={watchListDisabled}
            onClick={() => addMovieToWatchList(movie)}
          >
            {watchListDisabled ? (
              <>
                <Check className="iconAdd" /> Đã Lưu lại
              </>
            ) : (
              <>
                <Bookmark className="iconAdd" /> Lưu xem sau
              </>
            )}
          </button>
          <Link to={{ pathname: "/detail", movie: movie }} className="link">
            <button className="btnInfoFromListItem" title="Xem chi tiết">
              <InfoOutlined className="iconInfo" /> Xem chi tiết
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Modal;
