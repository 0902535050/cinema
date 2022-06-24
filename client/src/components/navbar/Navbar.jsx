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

const Navbar = ({ setIsShow }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const avatar = JSON.parse(localStorage.getItem("user")).profilePic;
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [allMovie, setAllMovie] = useState([]);
  const [users, setUsers] = useState({});
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/users/find/" + currentUser._id, {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
          },
        });
        setUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [currentUser.watchList.length]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get("/movies/", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
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

          <div className="singleFilm">
            <FilterList />
            DANH SÁCH PHIM
            <div className="selectGenre">
              <Link to="/phimchieurap" className="linkSelect">
                <span className="itemGenre">PHIM THEO THỂ LOẠI</span>
              </Link>
              <Link to="/year" className="linkSelect">
                <span className="itemGenre">PHIM THEO NĂM</span>
              </Link>
              <Link to="/nation" className="linkSelect">
                <span className="itemGenre">PHIM THEO QUỐC GIA</span>
              </Link>
              <Link to="/type" className="linkSelect">
                <span className="itemGenre">PHIM CHIẾU RẠP</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="endSearchBarAria">
            <div className="searchBarAria">
              <SearchBar data={allMovie} setIsShow={setIsShow} />
            </div>
          </div>
          <div className="endProfileAria">
            <span className="helloUser">Xin chào, {currentUser.username}</span>
            <div className="quantityWatchList">
              <Tv className="iconNoti" />
              <span className="watchListQuantity">
                {users.watchList !== undefined ? users.watchList.length : ""}
              </span>
            </div>
            <div className="avatarAria">
              <Link to="/userpage" className="link">
                <img
                  className="avatarProfile"
                  src={avatar !== "" ? avatar : "https://picsum.photos/50/50"}
                  alt=""
                />
              </Link>
            </div>
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
