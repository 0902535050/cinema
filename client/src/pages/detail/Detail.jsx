import {
  Bookmark,
  Check,
  PlayArrow,
  PlayCircleOutline,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Actor from "../../components/actor/Actor";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addMovieItemToWatchList } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";

export default function Detail() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const movie = location.movie || JSON.parse(localStorage.getItem("movies"));
  const [isShowDetail, setIsShowDetail] = useState(true);
  const { dispatch, user } = useContext(AuthContext);
  let storiedMovie = user.watchList.find((o) => o._id === movie._id);
  const watchListDisabled = storiedMovie ? true : false;
  const [changed, setChanged] = useState(currentUser.watchList);
  const getActorName = () => {
    if (movie.listActor !== undefined) {
      return movie.listActor.map((item, index) => {
        return (
          <div>
            <Actor key={index} item={item} type="name" />
          </div>
        );
      });
    } else return "";
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movie));
    localStorage.setItem("index", JSON.stringify(null));
    localStorage.setItem("indexTM", JSON.stringify(null));
    localStorage.setItem("actors", JSON.stringify(null));
  }, [movie]);

  const onViewDetailClick = () => {
    //immutable
    setIsShowDetail(!isShowDetail);
  };

  return (
    <div className="detailPage">
      <Navbar />
      <div className="detail-page">
        {/* CAROSEL */}

        {/* VIDEO */}

        <div className="detail-aria container">
          <div className="detail">
            <div className="leftSide">
              <img src={movie.imgTitle} alt="" />
              <div className="itemInfo">
                <div className="icons">
                  <Link to={{ pathname: "/watch", movie: movie }}>
                    <PlayArrow className="icon" />
                  </Link>
                </div>
              </div>
              <div className="btnAria">
                <Link
                  to={{ pathname: "/watch", movie: movie }}
                  className="link"
                >
                  <button className="btnXemPhim">
                    <PlayCircleOutline /> Xem
                  </button>
                </Link>

                <button
                  disabled={watchListDisabled}
                  onClick={() => addToWatchList(movie)}
                  className="btnAddToWatchList"
                >
                  {watchListDisabled ? (
                    <>
                      <Check /> Phim đã lưu
                    </>
                  ) : (
                    <>
                      <Bookmark /> Lưu xem sau
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="rightSide">
              <h4 className="movieName">{movie.title}</h4>
              <p>{movie.desc}</p>
              Thể loại: <span>{movie.genre}</span>
              <br />
              Đang phát: <span>{movie.isSup}</span>
              <br />
              Giới hạn độ tuổi: <span className="limit">{movie.limit} +</span>
              <br />
              Năm phát hành: <span className="year">{movie.year}</span>
              <br />
              IMDb: <span className="imdb">{movie.imdb}</span>
              <br />
              Thời lượng: <span>{movie.duration} phút</span>
              <br />
              Nhà sản xuất:{" "}
              <span>
                {movie.producer !== undefined ? movie.producer + " " : ""}
              </span>
              <br />
              Phim trường: <span>{movie.filmLocations}</span>
              <br />
              Nhà viết sách:{" "}
              <span>
                {movie.writer !== undefined ? movie.writer + " " : ""}
              </span>
              <br />
              Diễn viên chính:{" "}
              <span className="actorShowName">
                {getActorName() === "" ? "" : getActorName().splice(0, 4)}
              </span>
              <br />
              {isShowDetail ? (
                <div>
                  Đạo diễn:{" "}
                  <span
                    onClick={onViewDetailClick}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {movie.director !== undefined
                      ? movie.director.directorName
                      : ""}
                  </span>
                </div>
              ) : (
                <>
                  <span
                    onClick={onViewDetailClick}
                    style={{ cursor: "pointer" }}
                  >
                    {movie.director !== undefined
                      ? movie.director.directorDesc
                      : ""}
                  </span>
                  <Link to={{ pathname: "/actorpage", movie: movie }}>
                    <span
                      className="directorMoreDetail"
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      Xem chi tiết hơn
                    </span>
                  </Link>
                </>
              )}
              <br />
              <div className="directorAvatar mt-4">
                <Link to={{ pathname: "/actorpage", movie: movie }}>
                  {movie.director !== undefined ? (
                    <img src={movie.director.directorAva} alt="" />
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
          </div>
          <div className="trailerDetailAria">
            <iframe
              src={movie.trailer}
              allow="autoplay"
              allowFullScreen={true}
              title="myDetailTrailerMovie"
            ></iframe>
          </div>
          <div className="trailerDescAria container">
            <p>{movie.desc}</p>
            <img src={movie.imgPost} alt="" />
          </div>

          <div className="actor-detail-aria">
            <div className="actor-detail-aria-v2">
              <h3>DANH SÁCH DIỄN VIÊN THAM GIA</h3>
              <Slider {...settings}>
                {movie.listActor !== undefined
                  ? movie.listActor.map((item, index) => (
                      <div key={index} className="singleActorPlace">
                        <Actor item={item} />
                      </div>
                    ))
                  : ""}
              </Slider>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
