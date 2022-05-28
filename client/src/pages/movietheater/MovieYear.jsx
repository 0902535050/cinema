import axios from "axios";
import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Pagination from "../../components/pagination/Pagination";
import ListitemTag from "../../components/listitem/ListitemTag";

import Skeleton from "../../components/skeleton/Skeleton";
export default function MovieYear() {
  const [allMovie, setAllMovie] = useState([]);
  const [year, setYear] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(
          `/movies/tagyear${year ? "?year=" + year : ""}`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjMyNzgyMCwiZXhwIjoxOTExNTI3ODIwfQ.Plo5eyi6GO6CsvX1k7qeIJIi2h2PK8OTqdyxyJOKkYo",
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
  }, [year]);

  //Get current movies
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentAllMovies = allMovie.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {/* LIST */}
      {loading ? (
        <Skeleton type="circle" />
      ) : (
        <div className="homeYearMovie">
          {/* NAVBAR */}
          <Navbar />
          {/* FEATURE */}
          <Featured />

          <div className="categoryYearMovie container mt-5 mb-5">
            <img src="img/cinema.jpg" className="cinemaPngMovie" alt="none" />
            <select
              name="year"
              id="year"
              className="yearSelect"
              onChange={(e) => setYear(e.target.value)}
            >
              <option>Chọn năm</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <ListitemTag movie={currentAllMovies} />

          <div>
            <Pagination
              moviesPerPage={moviesPerPage}
              totalMovies={allMovie.length}
              paginate={paginate}
            />
          </div>
          <input
            type="radio"
            name="radio-btn"
            id="radio1"
            style={{ opacity: 0 }}
          />
          <input
            type="radio"
            name="radio-btn"
            id="radio2"
            style={{ opacity: 0 }}
          />
          <input
            type="radio"
            name="radio-btn"
            id="radio3"
            style={{ opacity: 0 }}
          />
          <input
            type="radio"
            name="radio-btn"
            id="radio4"
            style={{ opacity: 0 }}
          />
          <div className="footerAria container">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
