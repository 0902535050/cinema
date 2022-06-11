import { Star } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
export default function ListitemTag({ movie, setShowModal, setViaMovie }) {
  const setMovieOnLocalStorage = (item) => {
    setShowModal(true);
    setViaMovie(item);
    localStorage.setItem("movies", JSON.stringify(item));
  };

  return (
    <section className="py-4 container">
      <div className="d-flex flex-direction-row flex-wrap justify-content-center">
        {movie.map((item, index) => {
          return (
            <div className="cardBoxItemTag mx-0 mb-4">
              <div className="boxItemTag card p-0 overflow-hidden shadow">
                <img src={item.img} className="" alt="" />
                <div className="movie-Title-Item-Tag">
                  <div className="movieName">
                    <span>{item.title}</span>
                  </div>
                </div>
                <span className="supportSubItemTag">{item.isSup}</span>
                <div className="itemInfoMovieItemTag">
                  <span className="limit">{item.limit}+</span>
                  <span className="year">{item.year}</span>

                  <span className="genre">{item.genre}</span>
                  <span className="duration">{item.duration}min</span>
                  <span className="imdb">
                    {item.imdb}
                    <Star />
                  </span>
                </div>

                <div className="moreInfoItemTag">
                  <button
                    className="btn-more-info"
                    onClick={() => setMovieOnLocalStorage(item)}
                  >
                    <span>Xem chi tiết</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
