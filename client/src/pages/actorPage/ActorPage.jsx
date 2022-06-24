import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Listitem from "../../components/listitem/Listitem";
import { useLocation } from "react-router-dom";
import ActorSome from "../../components/actor/ActorSome";
import Modal from "../../components/modal/Modal";

export default function ActorPage() {
  const location = useLocation();
  const actor = location.actor || JSON.parse(localStorage.getItem("actors"));
  const movie = location.movie || JSON.parse(localStorage.getItem("movies"));
  const [actors, setActors] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [viaMovie, setViaMovie] = useState({});
  useEffect(() => {
    localStorage.setItem("actors", JSON.stringify(actor));
  }, [actor]);

  useEffect(() => {
    const getActor = async () => {
      try {
        const res = await axios.get("/actors/random/", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
          },
        });
        setActors(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getActor();
  }, [openModal]);

  return (
    <div className="actorPages ">
      <div className="blank" style={{ opacity: 1 }}>
        THIS IS BLANK
      </div>
      <Navbar />
      {openModal ? <Modal movie={viaMovie} setOpenModal={setOpenModal} /> : ""}
      {actor !== null ? (
        <div className="actor-aria">
          <div className="actorSide">
            <div className="leftSide">
              <div className="actorDetail">
                <Avatar className="actorImg" src={actor.profilePic} />
                <span className="actorName">{actor.name}</span>
                <span className="actorNation">Quốc tịch: {actor.nation}</span>
                <span className="actorDesc">
                  {String(actor.desc).substring(0, 40) + "..."}
                </span>
              </div>
              <div className="someActor container">
                <h3>Nghệ sĩ tương tự</h3>
                {actors.map((item, index) => {
                  return (
                    <div className="someActorPlace">
                      <ActorSome item={item._id} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="rightSide">
              <div className="titleMovieActorJoin">
                <h1>Danh sách phim tham gia</h1>
              </div>
              {actor.nameMovie !== ""
                ? actor.nameMovie.map((item, index) => {
                    return (
                      <div className="movieActor">
                        <Listitem
                          item={item}
                          setOpenModal={setOpenModal}
                          setViaMovie={setViaMovie}
                          setScrolled={setScrolled}
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      ) : (
        <div className="actor-aria">
          <div className="actorSide">
            <div className="leftSide">
              <div className="actorDetail">
                <Avatar className="actorImg" src={movie.director.directorAva} />
                <span className="actorName">{movie.director.directorName}</span>
                <span className="actorNation">
                  Quốc tịch: {movie.director.directorNations}
                </span>
                <span className="actorDesc">
                  {String(movie.director.directorDesc).substring(0, 40) + "..."}
                </span>
              </div>
            </div>
            <div className="rightSide">
              <div className="titleMovieActorJoin">
                <h1>Danh sách phim biên kịch</h1>
              </div>
              {movie.director.movieJoin.map((item, index) => {
                return (
                  <div className="movieActor">
                    <Listitem
                      item={item}
                      setOpenModal={setOpenModal}
                      setViaMovie={setViaMovie}
                      setScrolled={setScrolled}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
