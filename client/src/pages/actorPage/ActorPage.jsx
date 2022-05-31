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
  const [actors, setActors] = useState([]);

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
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
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
      {/* CHẮP VÁ */}
      <input type="radio" name="radio-btn" id="radio1" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio2" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio3" style={{ opacity: 0 }} />
      <input type="radio" name="radio-btn" id="radio4" style={{ opacity: 0 }} />
      <Navbar />
      {openModal ? <Modal movie={viaMovie} setOpenModal={setOpenModal} /> : ""}
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
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
