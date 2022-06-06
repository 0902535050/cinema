import React, { useContext, useEffect, useState } from "react";
import "./actor.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import Movie from "../../components/movie/Movie";
import Skeleton from "../../components/skeleton/Skeleton";
import storage from "../../firebase";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { updateActors } from "../../context/actorContext/apiCalls";
import { ActorContext } from "../../context/actorContext/ActorContext";

export default function Actor() {
  const history = useHistory();
  const location = useLocation();
  const actor = location.actor || JSON.parse(localStorage.getItem("actors"));
  const [profilePic, setProfilePic] = useState(null);
  const [updateActor, setUpdateActor] = useState(null);
  const [loading, setLoading] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { dispatch: dispactActor } = useContext(ActorContext);
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateActor({ ...updateActor, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdateActor({ ...updateActor, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is" + progress + " %done.");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUpdateActor((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((pre) => pre + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    if (uploaded === 0) {
      setLoading(true);
      e.preventDefault();
      upload([{ file: profilePic, label: "profilePic" }]);
    } else setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateActors(updateActor, actor, dispactActor);
    history.push("/actors");
  };

  return (
    <div className="actor">
      <div className="actorTitleContainer">
        <h1 className="actorTitle">Actor Page</h1>
        <Link to="/newactor">
          <button className="actorAddButton">Create New Actor</button>
        </Link>
      </div>
      <div className="actorTop">
        <div className="actorTopLeft">
          <h1 className="actorTitle">Actor Info</h1>
          <div className="actorInfoTop">
            <img src={actor.profilePic} alt="" className="actorInfoImg" />
          </div>
          <div className="actorInfoBottom">
            <div className="actorInfoItem">
              <span className="actorName">{actor.name}</span>
            </div>
            <div className="actorInfoItem">
              <span className="actorInfoKey">Id:</span>
              <span className="actorInfoValue">{actor._id}</span>
            </div>
            <div className="actorInfoItem">
              <span className="actorInfoKey">Stage name:</span>
              <span className="actorInfoValue">{actor.stageName}</span>
            </div>
            <div className="actorInfoItem">
              <span className="actorInfoKey">Nation:</span>
              <span className="actorInfoValue">{actor.nation}</span>
            </div>
            <div className="actorInfoItem">
              <span className="actorInfoKey">Description:</span>
              <span className="actorInfoValue">{actor.desc}</span>
            </div>
          </div>
        </div>
        <div className="actorTopRight">
          <div className="actorMovie">
            <label>Danh sách phim tham gia</label>
            <div className="actorAria">
              {actor.nameMovie.map((item, index) => {
                return <Movie key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="actorBottom">
        <h1 className="actorTitle">Edit</h1>
        <form className="actorForm">
          <div className="actorFormLeft">
            <label>Actor Name</label>
            <input
              type="text"
              name="name"
              placeholder={actor.name}
              onChange={handleChange}
            />
            <label>Nghệ danh</label>
            <input
              type="text"
              name="stageName"
              placeholder={actor.stageName}
              onChange={handleChange}
            />
            <label>Nation</label>
            <input
              type="text"
              name="nation"
              placeholder={actor.nation}
              onChange={handleChange}
            />

            <label>Description</label>
            <input
              type="text"
              name="desc"
              placeholder={actor.desc}
              onChange={handleChange}
            />
            <label>Danh sách phim</label>
            <select
              multiple
              name="nameMovie"
              onChange={handleSelect}
              style={{ height: "285px" }}
            >
              {movies.map((movie) => {
                return (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="actorFormRight">
            <div className="actorUpload">
              <img src={actor.profilePic} alt="" className="actorUploadImg" />
              <label>actor Image</label>
              <input
                type="file"
                id="file"
                name="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>

            {uploaded === 0 ? (
              <button className="actorButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            ) : loading ? (
              <div className="actorUpload">
                <Skeleton type="actor" />
              </div>
            ) : (
              <button className="actorButton" onClick={handleUpload}>
                Tải ảnh
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
