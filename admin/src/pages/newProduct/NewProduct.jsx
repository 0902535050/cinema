import "./newProduct.scss";
import { useContext, useEffect, useState } from "react";
import storage from "../../firebase";
import { createMovies } from "../../context/movieContext/apiCalls";
import Skeleton from "../../components/skeleton/Skeleton";
import { useHistory } from "react-router-dom";
import { getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ActorContext } from "../../context/actorContext/ActorContext";
import { getActors } from "../../context/actorContext/apiCalls";

export default function NewProduct() {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgPost, setImgPost] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [directorAva, setDirectorAva] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [loading, setLoading] = useState(false);
  const { actors, dispatch: dispatchActors } = useContext(ActorContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
    getActors(dispatchActors);
  }, [dispatchActors, dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMovie({ ...movie, [e.target.name]: value });
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
            setMovie((prev) => {
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
      upload([
        { file: img, label: "img" },
        { file: imgPost, label: "imgPost" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        { file: directorAva, label: "director.directorAva" },
      ]);
    } else setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMovies(movie, dispatchMovie);
    history.push("/");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="productFormLeft">
          <div className="addProductItem">
            <label>Image</label>
            <input
              type="file"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title image</label>
            <input
              type="file"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Thumbnail image</label>
            <input
              type="file"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Post image</label>
            <input
              type="file"
              name="imgPost"
              onChange={(e) => setImgPost(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="T??n phim"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Duration</label>
            <input
              type="text"
              placeholder="Duration"
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input
              type="text"
              placeholder="Limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Nation</label>
            <input
              type="text"
              placeholder="Nation"
              name="nation"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>IMDb</label>
            <input
              type="text"
              placeholder="IMDb"
              name="imdb"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Ph??? ?????</label>
            <input
              type="text"
              placeholder="Ph??? ?????"
              name="isSup"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Phim tr?????ng</label>
            <input
              type="text"
              placeholder="Phim tr?????ng"
              name="filmLocations"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Nh?? vi???t s??ch</label>
            <input
              type="text"
              placeholder="Nh?? vi???t s??ch"
              name="writer"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Tag phim</label>
            <input
              type="text"
              placeholder="Tag phim"
              name="movieTag"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Link trailer</label>
            <input
              type="text"
              placeholder="Link trailer"
              name="trailer"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Link video vietsub</label>
            <input
              type="text"
              placeholder="Link video vietsub"
              name="listVideoSub"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Link video thuy???t minh</label>
            <input
              type="text"
              placeholder="Link video thuy???t minh"
              name="listVideoTM"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Is Series ?</label>
            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option>Ch???n</option>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>
        <div className="productFormRight">
          <div className="addProductItem">
            <label>?????o di???n</label>
            <input
              type="text"
              placeholder="T??n ?????o di???n"
              name="director.directorName"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Th??ng tin ?????o di???n</label>
            <input
              type="text"
              placeholder="Th??ng tin ?????o di???n"
              name="director.directorDesc"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Qu???c t???ch ?????o di???n</label>
            <input
              type="text"
              placeholder="Qu???c t???ch ?????o di???n"
              name="director.directorNations"
              onChange={handleChange}
            />
          </div>

          <div className="addProductItem">
            <label>Director Avatar</label>
            <input
              type="file"
              name="director.directorAva"
              onChange={(e) => setDirectorAva(e.target.files[0])}
            />
          </div>

          <div className="addProductItem">
            <label>Danh s??ch di???n vi??n</label>
            <select
              multiple
              name="listActor"
              onChange={handleSelect}
              style={{ height: "285px" }}
            >
              {actors.map((actor) => {
                return (
                  <option key={actor._id} value={actor._id}>
                    {actor.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="addProductItem">
            <label>Phim nhi???u t???p ?????o di???n tham gia</label>
            <select
              multiple
              name="director.movieJoin"
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

          <div className="addProductItem">
            <label>Phim l??? ?????o di???n tham gia</label>
            <select
              multiple
              name="director.movieJoin"
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

          <div className="addProductItem">
            {uploaded === 5 ? (
              <button className="addProductButton" onClick={handleSubmit}>
                Create
              </button>
            ) : loading ? (
              <Skeleton type="load" />
            ) : (
              <button className="addProductButton" onClick={handleUpload}>
                Upload
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
