import {
  ArrowDropDown,
  FilterList,
  Home,
  Notifications,
  Theaters,
  Tv,
} from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import axios from "axios";
import { SearchBar } from "../search/SearchBar";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")).username;
  const avatar = JSON.parse(localStorage.getItem("user")).profilePic;
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [allMovie, setAllMovie] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get("/movies/", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjMyNzgyMCwiZXhwIjoxOTExNTI3ODIwfQ.Plo5eyi6GO6CsvX1k7qeIJIi2h2PK8OTqdyxyJOKkYo",
          },
        });
        setAllMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAll();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img className="logo" src="img/logo.png" alt="" />
          </Link>
          <Link to="/" className="link">
            <div className="homePage">
              <span className="navbarmainLinks">
                <Home className="homeIcon" />
                TRANG CHỦ
              </span>
            </div>
          </Link>
          <Link to="/series" className="link">
            <div className="seriesMovies">
              <span className="navbarmainLinks">
                <Tv className="tvIcon" />
                PHIM NHIỀU TẬP
              </span>
            </div>
          </Link>
          <Link to="/movies" className="link">
            <div className="singleMovies">
              <span className="navbarmainLinks">
                <Theaters className="singleIcon" />
                PHIM LẺ
              </span>
            </div>
          </Link>
          <div className="singleFilm">
            <FilterList />
            DANH SÁCH PHIM
            <div className="selectGenre">
              <Link to="/phimchieurap" className="linkSelect">
                <span className="itemGenre">PHIM CHIẾU RẠP</span>
              </Link>
              <Link to="/year" className="linkSelect">
                <span className="itemGenre">PHIM THEO NĂM</span>
              </Link>
              <Link to="/nation" className="linkSelect">
                <span className="itemGenre">PHIM THEO QUỐC GIA</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="endSearchBarAria">
            <div className="searchBarAria">
              <SearchBar data={allMovie} />
            </div>
          </div>
          <div className="endProfileAria">
            <span>Xin chào, {user}</span>
            <Notifications className="icon" />
            <Link to="/userpage" className="link">
              <img
                className="avatarProfile"
                src={avatar !== "" ? avatar : "https://picsum.photos/50/50"}
                alt=""
              />
            </Link>
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <Link to="/userpage" className="link">
                  <span>Settings</span>
                </Link>
                <Link to="/login" className="link">
                  <span onClick={() => dispatch(logout())}>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
