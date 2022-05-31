import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Skeleton from "../../components/skeleton/Skeleton";
import Modal from "../../components/modal/Modal";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [viaMovie, setViaMovie] = useState({});
  useEffect(() => {
    const getRandomLists = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getRandomLists();
  }, [type, genre]);
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(null));
  }, []);

  return (
    <>
      {/* LIST */}
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <div className="home">
          {/* NAVBAR */}
          <Navbar />
          {/* FEATURE */}
          <Featured />
          {openModal ? (
            <Modal movie={viaMovie} setOpenModal={setOpenModal} />
          ) : (
            ""
          )}

          {/* LIST */}
          <div className="showList">
            {lists.map((list, index) => {
              return (
                <div key={index}>
                  <List
                    list={list}
                    setOpenModal={setOpenModal}
                    setViaMovie={setViaMovie}
                  />
                  ;
                </div>
              );
            })}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
