import "./newList.css";
import { useContext, useEffect, useState } from "react";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { createLists } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  const history = useHistory();
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch } = useContext(ListContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createLists(list, dispatch);
    history.push("/lists");
  };

  //Array.from được dùng để convert giá trị về kiểu Array, cú pháp như sau
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
  return (
    <div className="newList">
      <h1 className="addListTitle">New List</h1>
      <form className="addListForm">
        <div className="formLeft">
          <div className="addListItem">
            <label>Title</label>

            <input
              type="text"
              placeholder="Tiêu đề của danh sách phim"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="action, horror, romance, toon, dc, marvel, science, zombie, crime"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addListItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
              <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formMiddle">
          <div className="addListItem">
            <label>Phim nhiều tập</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "285px" }}
            >
              {movies
                .filter((movie) => movie.isSeries === true)
                .map((movie) => {
                  return (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addListItem">
            <label>Phim lẻ</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "285px" }}
            >
              {movies
                .filter((movie) => movie.isSeries === false)
                .map((movie) => {
                  return (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <button className="addListButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
