import { Link, useHistory, useLocation } from "react-router-dom";
import "./list.css";
import { useContext, useEffect, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateLists } from "../../context/listContext/apiCalls";
export default function List() {
  const location = useLocation();
  const list = location.list || JSON.parse(localStorage.getItem("lists"));
  const createdAt = new Date(list.createdAt).toLocaleDateString();
  const histoty = useHistory();
  const [lists, setLists] = useState(null);
  const { dispatch } = useContext(ListContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setLists({ ...lists, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLists(lists, list, dispatch);
    histoty.push("/lists");
  };
  return (
    <div className="list">
      <div className="listTitleContainer">
        <h1 className="listTitle">List Movie</h1>
        <Link to="/newList">
          <button className="listAddButton">Create</button>
        </Link>
      </div>
      <div className="listTop">
        <div className="listTopRight">
          <div className="listInfoTop">
            <span className="listName">{list.title}</span>
          </div>
          <div className="listInfoBottom">
            <div className="listInfoItem">
              <span className="listInfoKey">id:</span>
              <span className="listInfoValue">{list._id}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">genre:</span>
              <span className="listInfoValue">{list.genre}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">type:</span>
              <span className="listInfoValue">{list.type}</span>
            </div>
            <div className="listInfoItem">
              <span className="listInfoKey">Ngày tạo:</span>
              <span className="listInfoValue">{createdAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="listBottom">
        <form className="listForm">
          <div className="listFormLeft">
            <h1 className="productTitle">Edit</h1>

            <label>List Title</label>
            <input
              type="text"
              name="title"
              placeholder={list.title}
              onChange={handleChange}
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              placeholder={list.type}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={list.genre}
              onChange={handleChange}
            />
          </div>
          <div className="listFormRight">
            <button className="listButton" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
