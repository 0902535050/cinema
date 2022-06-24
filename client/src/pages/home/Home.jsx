import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Footer from "../../components/footer/Footer";
import Skeleton from "../../components/skeleton/Skeleton";
import Modal from "../../components/modal/Modal";
import { FaArrowAltCircleUp } from "react-icons/fa";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import Menu from "../../components/menu/Menu";
const GoToTop = styled.div`
  position: fixed;
  z-index: 10;
  right: 80px;
  bottom: 50px;
  font-size: 50px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.3 linear;
  cursor: pointer;
  &:hover {
    transition: 0.5s;
    color: rgba(255, 255, 255, 1);
  }
  @media screen and (max-width: 768px) {
    right: 40px;
  }
`;

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [viaMovie, setViaMovie] = useState({});
  const [top, setTop] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isShow, setIsShow] = useState(false);
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
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
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

  const ScrollToTop = () => {
    setScrolled(true);
    scroll.scrollToTop();
  };
  useEffect(() => {
    if (scrolled === true) {
      setTop("d-none");
    } else {
      setTop("");
    }
  }, [scrolled]);

  return (
    <>
      {/* LIST */}
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <div className="home">
          {/* NAVBAR */}
          <Navbar setIsShow={setIsShow} />
          {/* FEATURE */}
          <div
            className="featured-aria"
            onMouseLeave={() => setScrolled(false)}
            onMouseEnter={() => setScrolled(true)}
          >
            <Featured />
          </div>
          <Menu />
          {openModal ? (
            <Modal movie={viaMovie} setOpenModal={setOpenModal} />
          ) : (
            ""
          )}

          {/* SCROLL */}
          <GoToTop>
            <FaArrowAltCircleUp
              className={`${top}`}
              onClick={() => ScrollToTop()}
            />
          </GoToTop>

          {/* LIST */}
          <div className="showList">
            {lists.map((list, index) => {
              return (
                <div key={index}>
                  <List
                    list={list}
                    setOpenModal={setOpenModal}
                    setViaMovie={setViaMovie}
                    setScrolled={setScrolled}
                    setIsShow={setIsShow}
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
