import {
  Bookmark,
  Check,
  InfoOutlined,
  PlayArrow,
  Star,
} from "@material-ui/icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { addMovieItemToWatchList } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
function Modal({ movie, setOpenModal }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const ref = useRef();
  const { dispatch, user } = useContext(AuthContext);
  const [changed, setChanged] = useState(currentUser.watchList);

  let storiedMovie = user.watchList.find((o) => o._id === movie._id);
  const watchListDisabled = storiedMovie ? true : false;
  useEffect(() => {
    const checkIfClickOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpenModal(false);
    };
    document.addEventListener("click", checkIfClickOutSide);
    return () => {
      document.removeEventListener("click", checkIfClickOutSide);
    };
  }, [setOpenModal]);
  const setMovieOnLocalStorage = () => {
    localStorage.setItem("movies", JSON.stringify(movie));
  };

  const addToWatchList = (movie) => {
    changed.push(movie);
    setChanged((prev) => {
      return { ...prev, prev: changed };
    });

    if (changed.length > 0) {
      addMovieItemToWatchList(changed, dispatch);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer" ref={ref}>
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
            {String(movie.desc).substring(0, 230) + "..."}
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
            onClick={() => addToWatchList(movie)}
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
