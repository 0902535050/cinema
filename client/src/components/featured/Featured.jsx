import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mjk1ODI3NywiZXhwIjoxOTEyMTU4Mjc3fQ.Heinb3EcvZ5OhivlA-ocY-9rBm8QyFLog_mXKae_D6E",
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  useEffect(() => {
    var count = 1;
    setInterval(() => {
      document.getElementById("radio" + count).checked = true;
      count++;
      if (count > 3) {
        count = 1;
      }
    }, 6000);
  }, []);

  const onViewDetailClick = () => {
    //immutable
    setIsShowDetail(!isShowDetail);
  };

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            className="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="action">Action</option>
            <option value="toon">Toon</option>
            <option value="romance">Romance</option>
            <option value="horror">Horror</option>
          </select>
        </div>
      )}
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />

          <div className="slide first">
            <img src={content.img} alt="" />
          </div>
          <div className="slide">
            <img src={content.imgTitle} alt="" />
          </div>
          <div className="slide">
            <img src={content.imgSm} alt="" />
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
        <img className="imgTitle" src={content.imgTitle} alt="" />
        <span className="featuredTitle">
          {String(content.title).substring(0, 13)}
        </span>
        {isShowDetail ? (
          <span className="desc">{content.desc}</span>
        ) : (
          <span className="desc">
            {String(content.desc).substring(0, 16) + "..."}
          </span>
        )}

        <div className="buttons">
          <Link to={{ pathname: "/watch", movie: content }}>
            <button className="play">
              <PlayArrow />
              <span>Xem ngay</span>
            </button>
          </Link>
          <button onClick={onViewDetailClick} className="more">
            <InfoOutlined />
            <span>{isShowDetail ? "Rút gọn" : "Mô tả"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
