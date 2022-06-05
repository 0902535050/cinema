import { DeleteSweepRounded, Star } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { removeMovieFromWatchList } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
export default function ListitemWatchList({ item, type, setFlag }) {
  const { dispatch } = useContext(AuthContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const removeMovie = (movie) => {
    let array = currentUser.watchList.filter((m) => m._id !== movie._id);
    setFlag(array.length);
    removeMovieFromWatchList(array, dispatch);
  };
  return (
    <section>
      <div className="row justify-content-center">
        <div className="cardBoxItemTag col-lg-12 mx-0 mb-4">
          <div className="boxItemTag card p-0 overflow-hidden shadow">
            <img src={item.img} className="" alt="" />
            <div className="movie-Title-Item-Tag">
              <span className="movieName">{item.title}</span>
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
            <div className="controlAria">
              {type === "watchList" && (
                <div>
                  <span onClick={() => removeMovie(item)}>
                    <DeleteSweepRounded className="delete-sweep" />
                  </span>
                </div>
              )}
            </div>
            <div className="moreInfoItemTag">
              <Link to={{ pathname: "/detail", movie: item }} className="link">
                <span className="btn-more-info">Xem chi tiết</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
