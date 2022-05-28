import { DeleteSweepRounded, Star } from "@material-ui/icons";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
export default function ListitemWatchList({ movie, type }) {
  const { removeMovieFromWatchList } = useContext(GlobalContext);

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        {movie.map((item, index) => {
          return (
            <div className="cardBoxItemTag col-lg-6 mx-0 mb-4">
              <div className="boxItemTag card p-0 overflow-hidden shadow">
                <img src={item.img} className="" alt="" />
                <div className="movie-Title-Item-Tag">
                  <span>{String(item.title).substring(0, 13)}</span>
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
                      <span onClick={() => removeMovieFromWatchList(item._id)}>
                        <DeleteSweepRounded className="delete-sweep" />
                      </span>
                    </div>
                  )}
                </div>
                <div className="moreInfoItemTag">
                  <Link
                    to={{ pathname: "/detail", movie: item }}
                    className="link"
                  >
                    <span className="btn-more-info">Xem chi tiết</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
