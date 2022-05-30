import {
  Bookmark,
  Check,
  InfoOutlined,
  PlayArrow,
  Star,
} from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

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
            title="Trailer"
          />
        </div>
        <div className="body">
          <span className="movieTitle">{movie.title}</span>
          <span className="movieDesc">
            {String(movie.desc).substring(0, 240) + "..."}
          </span>
          <div className="itemInfoTop">
            <span className="limit">Giới hạn {movie.limit}+</span>
            <span className="year">Năm {movie.year}</span>
            <span className="genre">Thể loại {movie.genre}</span>
            <span className="duration">Thời lượng {movie.duration}min</span>
            <span className="imdb">IMDb {movie.imdb}</span>
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
