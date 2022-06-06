import React from "react";
import "./newActor.css";
import { useContext, useEffect, useState } from "react";
import storage from "../../firebase";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useHistory } from "react-router-dom";
import Skeleton from "../../components/skeleton/Skeleton";
import { createActors } from "../../context/actorContext/apiCalls";
import { ActorContext } from "../../context/actorContext/ActorContext";
export default function NewActor() {
  const history = useHistory();
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  const [loading, setLoading] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [profilePic, setProfilePic] = useState(null);
  const [actor, setActor] = useState(null);
  const { dispatch } = useContext(ActorContext);

  let checked = profilePic === null || profilePic === undefined ? true : false;

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setActor({ ...actor, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setActor({ ...actor, [e.target.name]: value });
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
            setActor((prev) => {
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
    createActors(actor, dispatch);
    history.push("/actors");
  };

  return (
    <div className="newList">
      <h1 className="addActorTitle">New Actor</h1>
      <form className="addActorForm">
        <div className="formLeft">
          <div className="addActorItem">
            <label>Actor Name</label>

            <input
              type="text"
              placeholder="Tên diễn viên"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="addActorItem">
            <label>Stage Name</label>

            <input
              type="text"
              placeholder="Nghệ danh"
              name="stageName"
              onChange={handleChange}
            />
          </div>
          <div className="addActorItem">
            <label>Nation</label>
            <input
              type="text"
              placeholder="Quốc tịch"
              name="nation"
              onChange={handleChange}
            />
          </div>
          <div className="addActorItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="Mô tả diễn viên"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="addActorItem">
            <label>actor Image</label>
            <input
              type="file"
              id="file"
              name="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </div>
          <div className="addActorItem">
            {uploaded === 1 ? (
              <button className="addActorButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            ) : loading ? (
              <Skeleton type="load" />
            ) : checked ? (
              ""
            ) : (
              <button className="addActorButton" onClick={handleUpload}>
                Tải ảnh
              </button>
            )}
          </div>
        </div>
        <div className="formMiddle">
          <div className="addActorItem">
            <label>Phim nhiều tập</label>
            <select
              multiple
              name="nameMovie"
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
          <div className="addActorItem">
            <label>Phim lẻ</label>
            <select
              multiple
              name="nameMovie"
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
      </form>
    </div>
  );
}
