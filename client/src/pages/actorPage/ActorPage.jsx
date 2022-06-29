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
  const [isShow, setIsShow] = useState(false);
  const [viaMovie, setViaMovie] = useState({});
  const [loadActor, setLoadActor] = useState(false);
  useEffect(() => {
    localStorage.setItem("actors", JSON.stringify(actor));
  }, [actor]);

  useEffect(() => {
    const getActor = async () => {
      try {
        const res = await axios.get("/actors/random/", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
          },
        });
        let array = actors.filter((id) => id !== actor._id);
        console.log(array);
        setActors(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getActor();
  }, [openModal, actor._id]);

  return (
    <div className="actorPages ">
      <div className="blank" style={{ opacity: 1 }}>
        THIS IS BLANK
      </div>
      <Navbar setIsShow={setIsShow} />
      {openModal ? <Modal movie={viaMovie} setOpenModal={setOpenModal} /> : ""}
      {actor !== null ? (
        <div className="actor-aria">
          <div className="actorSide">
            <div className="leftSide">
              <div className="actorDetail">
                <div className="actorImgAria">
                  <Avatar className="actorImg" src={actor.profilePic} />
                </div>
                <span className="actorName">{actor.name}</span>
                <span className="actorNation">Nghề nghiệp: diễn viên</span>
                <span className="actorNation">Quốc tịch: {actor.nation}</span>
                <span className="actorDesc">
                  {String(actor.desc).substring(0, 38) + "..."}
                </span>
              </div>
              <div className="someActor container">
                <h3>Nghệ sĩ cùng tham gia</h3>
                {actors
                  .filter((item) => item._id !== actor._id)
                  .map((item, index) => {
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
                <span>Danh sách phim tham gia</span>
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
                          setIsShow={setIsShow}
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
