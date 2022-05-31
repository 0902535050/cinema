import { InfoOutlined, PlayArrow, Star } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Featured() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    var n = Math.floor(Math.random() * 62);
    const getRandom = async () => {
      try {
        const res = await axios.get(`/movies`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
          },
        });

        setMovie(res.data[n]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandom();
  }, []);
  console.log(movie);
  useEffect(() => {
    var count = 1;
    setInterval(() => {
      document.getElementById("radio" + count).checked = true;
      count++;
      if (count > 4) {
        count = 1;
      }
    }, 6000);
  }, []);

  const setMovieOnLocalStorage = () => {
    localStorage.setItem("movies", JSON.stringify(movie));
  };
  return (
    <div className="featured">
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />

          <div className="slide first">
            <img src={movie.img} alt="" />
          </div>
          <div className="slide">
            <img src={movie.imgTitle} alt="" />
          </div>
          <div className="slide">
            <img src={movie.imgSm} alt="" />
          </div>
          <div className="slide">
            <img src="https://picsum.photos/2048/1024" alt="" />
          </div>

          <div className="navigation-auto">
            <div className="auto-btn1"></div>
            <div className="auto-btn2"></div>
            <div className="auto-btn3"></div>
            <div className="auto-btn4"></div>
          </div>
        </div>
        <div className="navigation-manual">
          <label for="radio1" className="manual-btn"></label>
          <label for="radio2" className="manual-btn"></label>
          <label for="radio3" className="manual-btn"></label>
          <label for="radio4" className="manual-btn"></label>
        </div>
      </div>

      <div className="info">
        <img className="imgTitle" src={movie.imgTitle} alt="" />
        <span className="featuredTitle">{movie.title}</span>
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
        <div className="buttons">
          <Link to={{ pathname: "/watch", movie: movie }}>
            <button className="play" onClick={setMovieOnLocalStorage}>
              <PlayArrow />
              <span>Xem ngay</span>
            </button>
          </Link>
          <Link to={{ pathname: "/detail", movie: movie }}>
            <button className="play" onClick={setMovieOnLocalStorage}>
              <InfoOutlined />
              <span>Chi tiết</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
