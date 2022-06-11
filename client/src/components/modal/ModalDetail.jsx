import { PlayArrow, Star } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ActorSome from "../actor/ActorSome";
const fadeIn = keyframes`
    0%:{background:rgba(0,0,0,0)}
    100%:{background:rgba(0,0,0,0.6)}
`;

const MoviesDetailModal = styled.div`
  .showModal {
    top: 25%;
    opacity: 1;
    left: 0;
    visibility: visible;
    transition: 0.5 ease-in-out;
  }
  .hideModal {
    top: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.5 ease-in-out;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.6);
    animation: ${fadeIn} 1s cubic-bezier(0.17, 0.85, 0.45, 1) forwards;
  }
  .showBackdrop {
    display: block;
  }
  .hideBackdrop {
    display: none;
  }
  .modalDetail {
    position: fixed;
    top: 25%;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 60%;
    margin: 0 auto;
    color: #fff;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
    @media screen and (max-width: 1184px) {
      height: 70%;
    }
    @media screen and (max-width: 600px) {
      height: 80%;
    }

    .infoAria {
      position: relative;
      width: 70%;
      height: 100%;
      background: linear-gradient(90deg, rgba(0, 0, 0, 0.94) 60%, transparent);
      @media screen and (min-width: 1184px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.94) 40%,
          rgba(0, 0, 0, 0.733),
          transparent
        );
        width: 88%;
      }
      @media screen and (min-width: 980px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.95) 50%,
          transparent
        );
        width: 100%;
      }
      @media screen and (min-width: 600px) {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.88) 60%,
          transparent
        );
        width: 100%;
      }
      .movieTitle {
        margin-top: 30px;
        color: #ffe1c2;
        font-weight: bold;
      }

      .movieInfo {
        position: absolute;
        left: 0;
        width: 65%;
        height: 100%;
        padding-left: 24px;
        color: #fff;
        font-size: 20px;
        padding-top: 30px;
        @media screen and (max-width: 600px) {
          font-size: 16px;
          width: 80%;
        }
        .statistical {
          margin-top: 20px;
          display: flex;
          align-items: center;

          .rating {
            color: #000;
            margin: 0 20px;
            background-color: yellow;
            padding: 2px 6px;
            border-radius: 8px;
          }

          .limited {
            margin: 0 20px;
            color: red;
            padding: 0 5px;
            border: 1px solid red;
          }

          .duration,
          .genre,
          .releaseDate {
            margin: 0 20px;
            color: #ffb674;
          }

          .btnPlay {
            margin: 0 20px;
            border-radius: 50%;
            border: 1px solid orange;
            padding: 10px;
            color: orange;
            &:hover {
              transition: all 0.5s;
              transform: scale(1.3);
              background-color: #ad9a77;
            }
          }
        }
        .desc {
          margin-top: 20px;
          color: #fff;
          line-height: 1.4;
          font-size: 18px;
          letter-spacing: 2px;
          @media screen and (max-width: 600px) {
            font-size: 14px;
          }
        }
        .personJoin {
          display: flex;
          justify-content: center;
          align-content: center;
          .actorAria {
            display: flex;
            justify-content: center;
            align-content: center;

            .actor {
              margin: 0 20px;
            }
          }
          .directorAria {
            width: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-right: 1px solid #fff;
            img {
              width: 200px;
              height: 200px;
              object-fit: cover;
              border-radius: 50%;
            }
            .directorName {
              color: teal;
            }
          }
        }
      }
    }
  }
`;
export default function ModalDetail({ showModal, setShowModal, viaMovie }) {
  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(viaMovie);
  return (
    <MoviesDetailModal>
      <div
        className={`backdrop ${showModal ? "showBackdrop" : "hideBackdrop"}`}
        onClick={() => handleCloseModal()}
      />
      <div
        className={`modalDetail ${showModal ? "showModal" : "hideModal"}`}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${viaMovie.imgSm})`,
        }}
      >
        <div className="infoAria">
          <div className="movieInfo">
            <h1 className="movieTitle">{viaMovie.title}</h1>

            <p className="statistical">
              <span className="limited">{viaMovie.limit}+</span>
              <span className="rating">{viaMovie.imdb}</span>
              <span className="genre">{viaMovie.genre}</span>
              <span className="releaseDate">{viaMovie.year}</span>
              <span className="duration">{viaMovie.duration}min</span>
              <Link to={{ pathname: "/watch", movie: viaMovie }}>
                <div className="btnPlay">
                  <PlayArrow className="iconPlay" />
                </div>
              </Link>
            </p>
            <p className="desc">{String(viaMovie.desc).substring(0, 550)}</p>
            <div className="personJoin">
              <div className="directorAria">
                <img
                  src={
                    viaMovie.director !== undefined &&
                    viaMovie.director.directorAva
                  }
                  alt=""
                />
                <span>Đạo diễn</span>
                <span className="directorName">
                  {viaMovie.director !== undefined &&
                    viaMovie.director.directorName}
                </span>
              </div>
              <div className="actorAria">
                {viaMovie.listActor !== undefined &&
                  viaMovie.listActor.slice(0, 5).map((item, index) => {
                    return (
                      <div className="actor">
                        <ActorSome key={index} item={item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MoviesDetailModal>
  );
}
