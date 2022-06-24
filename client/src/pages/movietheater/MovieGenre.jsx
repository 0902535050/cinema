import axios from "axios";
import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import ListitemTag from "../../components/listitem/ListitemTag";
import Skeleton from "../../components/skeleton/Skeleton";
import { FaArrowAltCircleUp } from "react-icons/fa";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import ModalDetail from "../../components/modal/ModalDetail";

const GoToTop = styled.div`
  position: fixed;
  z-index: 10;
  right: 90px;
  bottom: 70px;
  font-size: 50px;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3 linear;
  cursor: pointer;
  &:hover {
    color: rgba(255, 255, 255, 0.4);
  }
  @media screen and (max-width: 768px) {
    right: 40px;
  }
`;

export default function MovieGenre() {
  const [allMovie, setAllMovie] = useState([]);
  const [genre, setGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [top, setTop] = useState("");
  const [scrolled, SetScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viaMovie, setViaMovie] = useState({});
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(
          `/movies/taggenre${genre ? "?genre=" + genre : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
            },
          }
        );
        setAllMovie(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getAll();
  }, [genre]);

  //Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentAllMovies = allMovie.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const ScrollToTop = () => {
    SetScrolled(true);
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
        <div className="homeGenreMovie">
          {/* NAVBAR */}
          <Navbar />
          {/* FEATURE */}
          <div
            className="featured-aria"
            onMouseLeave={() => SetScrolled(false)}
            onMouseEnter={() => SetScrolled(true)}
          >
            <Featured />
          </div>

          <div className="categoryGenreMovie container">
            <div className="genreMovieAria">
              <img src="img/cinema.jpg" className="cinemaPngMovie" alt="none" />
              <select
                name="genre"
                id="genre"
                className="genreSelect"
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="all">Chọn thể loại</option>

                <option value="dc">DC Commic</option>
                <option value="marvel">Marvel</option>
                <option value="romance">Tình Cảm</option>
                <option value="action">Hành Động</option>
                <option value="horror">Kinh Dị</option>
                <option value="science">Khoa Học Viễn Tưởng</option>
                <option value="zombie">Xác Sống</option>
                <option value="toon">Hoạt Hình</option>
                <option value="adventure">Phiêu Lưu</option>
                <option value="crime">Tội Phạm Hình Sự</option>
              </select>
            </div>
          </div>

          <ListitemTag
            movie={currentAllMovies}
            setShowModal={setShowModal}
            setViaMovie={setViaMovie}
          />
          <ModalDetail
            showModal={showModal}
            viaMovie={viaMovie}
            setShowModal={setShowModal}
          />
          <GoToTop className={`${top}`} onClick={() => ScrollToTop()}>
            <FaArrowAltCircleUp />
          </GoToTop>
          <div>
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={allMovie.length}
              paginate={paginate}
            />
          </div>

          <div className="footerAria container">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
