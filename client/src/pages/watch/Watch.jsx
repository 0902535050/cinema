import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import List from "../../components/list/List";
import CommentList from "../../components/comment/CommentList";
import {
  Chat,
  InfoOutlined,
  Send,
  ThumbDownOutlined,
  ThumbDownRounded,
  ThumbUpAltOutlined,
  ThumbUpAltRounded,
} from "@material-ui/icons";

export default function Watch() {
  const location = useLocation();
  const userNow = JSON.parse(localStorage.getItem("user"));
  const movie = location.movie || JSON.parse(localStorage.getItem("movies"));
  var newIndex = localStorage.getItem("index");
  var newIndexTM = localStorage.getItem("indexTM");
  const [isShowComment, setIsShowComment] = useState(false);
  const [indexMovie, setIndexMovie] = useState("");
  const [isSub, setIsSub] = useState(false);
  const [lists, setLists] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentContent, setCommentContent] = useState(null);
  const [getMovies, setGetMovies] = useState({});
  //LAST CONST
  const [isChange, setIsChange] = useState(movie.listComment);
  const [changedV2, setChangedV2] = useState(movie.listLiked);
  const [changedV3, setChangedV3] = useState(movie.listDisLiked);
  const [flag, setFlag] = useState(1);
  let userLiked =
    getMovies.listLiked !== undefined
      ? getMovies.listLiked.find((o) => o === userNow._id)
      : movie.listLiked.find((o) => o === userNow._id);
  const userLikedDisabled = userLiked ? true : false;

  let userDisLiked =
    getMovies.listDisLiked !== undefined
      ? getMovies.listDisLiked.find((o) => o === userNow._id)
      : movie.listDisLiked.find((o) => o === userNow._id);
  const userDisLikedDisabled = userDisLiked ? true : false;
  console.log(movie);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get("lists", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        });

        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();

    const getMovies = async () => {
      try {
        const res = await axios.get("/movies/find/" + movie._id, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        });

        setGetMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, [loading, isShowComment, flag, movie._id]);

  const onViewCommentClick = () => {
    //immutable
    setIsShowComment(!isShowComment);
  };

  const handleChangeMovieSub = (i) => {
    setIndexMovie(i);
    setIsSub(true);
    setIsShow(true);
    setLoading(!loading);
    localStorage.setItem("index", JSON.stringify(i + 1));
  };

  const handleChangeMovieTM = (i) => {
    setIndexMovie(i);
    setIsSub(false);
    setIsShow(true);
    setLoading(!loading);
    localStorage.setItem("indexTM", JSON.stringify(i + 1));
  };

  const addComment = async (event) => {
    event.preventDefault();
    try {
      const resComment = await axios.post(
        "/comments/",
        {
          content: commentContent,
          creator: userNow._id,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        }
      );

      isChange.push(resComment.data._id);
      setIsChange(isChange);
      try {
        await axios.put(
          "/movies/" + movie._id,
          {
            listComment: isChange,
          },
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
            },
          }
        );
      } catch (err) {
        console.log(err);
      }

      setLoading(!loading);
    } catch (err) {
      console.log(err);
    }
  };

  const ShowCommentList = () => {
    return movie.listComment.map((comment, index) => {
      return (
        <div className="">
          <CommentList key={index} commentId={comment} />
        </div>
      );
    });
  };

  const addUserDisLikeMovie = async (userId) => {
    changedV3.push(userId);
    setChangedV3(changedV3);
    try {
      await axios.put(
        "/movies/" + movie._id,
        {
          listDisLiked: changedV3,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        }
      );
      setLoading(!loading);
    } catch (err) {
      console.log(err);
    }
  };

  const removeUserDisLikeMovie = async (userId) => {
    let array = changedV3.filter((id) => id !== userId);
    setChangedV3(array);
    setFlag(changedV3.length);
    try {
      await axios.put(
        "/movies/" + movie._id,
        {
          listDisLiked: array,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }

    setLoading(!loading);
  };

  const addUserLikeMovie = async (user) => {
    changedV2.push(user);
    setChangedV2(changedV2);
    setFlag(changedV2.length);
    try {
      await axios.put(
        "/movies/" + movie._id,
        {
          listLiked: changedV2,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(!loading);
  };

  const removeUserUnlikeMovie = async (userId) => {
    let array = changedV2.filter((id) => id !== userId);
    setChangedV2(array);
    setFlag(changedV2.length);
    try {
      await axios.put(
        "/movies/" + movie._id,
        {
          listLiked: array,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    setLoading(!loading);
  };

  return (
    <div className="watchPage">
      <Navbar />
      <div className="watch-page-left">
        <div className="watch">
          <div className="watch-left">
            {isShow ? (
              <iframe
                title="myMovieFrame"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                src={
                  isSub
                    ? movie.listVideoSub[newIndex - 1]
                    : movie.listVideoTM[newIndexTM - 1]
                }
                frameborder="0"
                scrolling="0"
                allowFullScreen={true}
              />
            ) : (
              <img className="videoPlace" src={movie.imgPost} alt="none" />
            )}
          </div>
          <div className="watch-right">
            <div className="movieInfoPost">
              <div className="itemPost">
                <img src={movie.img} alt="" />
                <span>
                  {String(movie.listPost[0]).substring(0, 150) + "..."}
                </span>
              </div>
              <div className="itemPost">
                <img src={movie.imgTitle} alt="" />
                <span>
                  {String(movie.listPost[1]).substring(0, 150) + "..."}
                </span>
              </div>
              <div className="itemPost">
                <img src={movie.imgSm} alt="" />

                <span>
                  {String(movie.listPost[2]).substring(0, 150) + "..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="listMovieVideoDetailAria container">
        <span className="movieVideoTitle">
          {movie.title}{" "}
          {movie.isSeries && indexMovie !== "" ? (
            <span>tập {indexMovie + 1}</span>
          ) : (
            ""
          )}
        </span>
        <br />

        <div className="likeAria">
          {userLikedDisabled ? (
            <button
              className="btnReactMovie"
              onClick={() => removeUserUnlikeMovie(userNow._id)}
            >
              <span className="likeQuantity">
                {getMovies.listLiked === undefined ||
                getMovies.listLiked.length === 0
                  ? "0"
                  : getMovies.listLiked.length}
              </span>
              <ThumbUpAltRounded className="iconLikeQuantity" />
            </button>
          ) : (
            <button
              className="btnReactMovie"
              onClick={() => addUserLikeMovie(userNow._id)}
            >
              <span className="likeQuantity">
                {getMovies.listLiked === undefined ||
                getMovies.listLiked.length === 0
                  ? "0"
                  : getMovies.listLiked.length}
              </span>
              <ThumbUpAltOutlined className="iconLikeQuantity" />
            </button>
          )}

          {userDisLikedDisabled ? (
            <button
              className="btnReactMovie"
              onClick={() => removeUserDisLikeMovie(userNow._id)}
            >
              <span className="disLikeQuantity">
                {getMovies.listDisLiked === undefined ||
                getMovies.listDisLiked.length === 0
                  ? "0"
                  : getMovies.listDisLiked.length}
              </span>
              <ThumbDownRounded className="iconDisLikeQuantity" />
            </button>
          ) : (
            <button
              className="btnReactMovie"
              onClick={() => addUserDisLikeMovie(userNow._id)}
            >
              <span className="likeQuantityDislike">
                {getMovies.listDisLiked === undefined ||
                getMovies.listDisLiked.length === 0
                  ? "0"
                  : getMovies.listDisLiked.length}
              </span>
              <ThumbDownOutlined className="iconLikeQuantityDislike" />
            </button>
          )}

          <br />
        </div>
        <span className="movieVideoDesc">{movie.desc}</span>
      </div>

      <div className="listMovieVideoAria container">
        <div className="listMovieVideo">
          <div className="vidSub">
            <span>Việt Sub</span>
          </div>
          {movie.listVideoSub.map((item, index) => {
            return (
              <div className="changeMovieAria">
                <button key={index} onClick={() => handleChangeMovieSub(index)}>
                  {movie.isSeries ? <> Tập {index + 1}</> : <> Tập Full</>}
                </button>
              </div>
            );
          })}
          <div className="vidTM">
            <span>Thuyết Minh</span>
          </div>
          {movie.listVideoTM.map((item, index) => {
            return (
              <div className="changeMovieAria">
                <button key={index} onClick={() => handleChangeMovieTM(index)}>
                  {movie.isSeries ? <> Tập {index + 1}</> : <> Tập Full</>}
                </button>
              </div>
            );
          })}
          <div className="tagMovieAria">
            <span>Tag</span>
          </div>
          {movie.movieTag.map((item, index) => {
            return (
              <span key={index} className="tagMovie">
                {item}
              </span>
            );
          })}
        </div>
      </div>
      <div className="userCommentAria mt-5 container">
        <form onSubmit={addComment}>
          <div class="form-group container mt-1">
            <Chat className="mr-2" />
            <label
              className=""
              style={{
                color: "dark",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Bình luận
            </label>

            <br />
            <span style={{ fontWeight: "bold" }}>
              {movie.listComment.length} bình luận
            </span>
            <input
              className="form-control"
              value={commentContent}
              onChange={(event) => setCommentContent(event.target.value)}
              placeholder="Nhập nội dung bình luận"
            />
            <strong id="emailHelp" className="form-text text-muted">
              Chúng tôi sẽ không để lộ danh tính của bạn cho bất kì ai !
            </strong>
            <button
              type="submit"
              class="btn btn-primary px-4"
              style={{ fontWeight: "bold" }}
            >
              <Send /> Gửi
            </button>
          </div>
        </form>

        <div className="listCommentMovie">
          {isShowComment
            ? ShowCommentList().sort().reverse()
            : ShowCommentList().slice(-4).sort().reverse()}
          <div className="showMoreComment">
            {movie.listComment === "" ? (
              ""
            ) : (
              <div className="showMoreCommentAria">
                <span
                  onClick={onViewCommentClick}
                  className="btnShowMoreComment "
                >
                  <InfoOutlined />
                  {isShowComment ? " Rút gọn bình luận" : " Xem thêm bình luận"}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Phim đề cử */}
      <div className="watch-page-right">
        <div className="recommendMovie">
          {lists.slice(0, 2).map((list, index) => {
            return (
              <div key={index}>
                <List list={list} />;
              </div>
            );
          })}
        </div>
      </div>
      <input type="radio" name="radio-btn" id="radio1" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio2" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio3" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio4" style={{ opacity: 0 }} />
      <div className="footerAria">
        <Footer />
      </div>
    </div>
  );
}
