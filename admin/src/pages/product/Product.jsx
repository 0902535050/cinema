import { Link, useLocation } from "react-router-dom";
import "./product.css";
import { ActorContext } from "../../context/actorContext/ActorContext";
import { getActors } from "../../context/actorContext/apiCalls";
import { useContext, useEffect, useState } from "react";
import Actor from "../../components/actor/Actor";
import Skeleton from "../../components/skeleton/Skeleton";
import { useHistory } from "react-router-dom";
import { updateMoviesMore } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import storage from "../../firebase";

export default function Product() {
  const history = useHistory();
  const location = useLocation();
  const movie = location.movie || JSON.parse(localStorage.getItem("movie"));
  const { actors, dispatch: dispatchActors } = useContext(ActorContext);
  const { dispatch: dispatchMovie } = useContext(MovieContext);

  const [loading, setLoading] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [updateMovie, setUpdateMovies] = useState(null);
  const [img, setImg] = useState(null);
  const [imgPost, setImgPost] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [listVideoSub, setListVideoSub] = useState(null);
  const [listVideoTM, setListVideoTM] = useState(null);
  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    getActors(dispatchActors);
  }, [dispatchActors]);

  const handleChange = (e) => {
    const value = e.target.value;
    setUpdateMovies({ ...updateMovie, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setUpdateMovies({ ...updateMovie, [e.target.name]: value });
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
            setUpdateMovies((prev) => {
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
        // { file: img, label: "img" },
        // { file: imgTitle, label: "imgTitle" },
        // { file: imgSm, label: "imgSm" },
        { file: imgPost, label: "imgPost" },
        // { file: listVideoSub, label: "listVideoSub" },
        // { file: listVideoTM, label: "listVideoTM" },
        // { file: trailer, label: "trailer" },
      ]);
    } else setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMoviesMore(updateMovie, movie, dispatchMovie);
    history.push("/movies");
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <h1 className="productTitle">Movie Detail</h1>
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <img src={movie.imgTitle} alt="" className="productInfoImg" />
            <img src={movie.imgSm} alt="" className="productInfoImg" />
            <img src={movie.imgPost} alt="" className="productInfoImg" />
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productName">{movie.title}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">duration:</span>
              <span className="productInfoValue">{movie.duration}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">nation:</span>
              <span className="productInfoValue">{movie.nation}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">IMDb:</span>
              <span className="productInfoValue">{movie.imdb}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Phụ đề:</span>
              <span className="productInfoValue">{movie.isSup}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Phim trường:</span>
              <span className="productInfoValue">{movie.filmLocations}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Nhà viết sách:</span>
              <span className="productInfoValue">{movie.writer + " "}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Đạo diễn:</span>
              <span className="productInfoValue">
                {movie.director.directorName}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Tag phim:</span>
              <span className="productInfoValue">{movie.movieTag + " "}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Kiểu phim</span>
              <span className="productInfoValue">
                {movie.isSeries ? "Phim nhiều tập" : "Phim lẻ"}
              </span>
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="addProduct">
            <label>Danh sách diễn viên</label>
            <div className="actorAria">
              {movie.listActor.map((item, index) => {
                return <Actor key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <h1 className="productTitle">Edit</h1>
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              name="title"
              placeholder={movie.title}
              onChange={handleChange}
            />

            <label>Year</label>
            <input
              type="text"
              name="year"
              placeholder={movie.year}
              onChange={handleChange}
            />
            <label>Genre</label>
            <input
              type="text"
              name="genre"
              placeholder={movie.genre}
              onChange={handleChange}
            />
            <label>Limit</label>
            <input
              type="text"
              name="limit"
              placeholder={movie.limit}
              onChange={handleChange}
            />

            <label>Duration</label>
            <input
              type="text"
              name="duration"
              placeholder={movie.duration}
              onChange={handleChange}
            />
            <label>Nation</label>
            <input
              type="text"
              name="nation"
              placeholder={movie.nation}
              onChange={handleChange}
            />

            <label>IMDb</label>
            <input
              type="text"
              name="imdb"
              placeholder={movie.imdb}
              onChange={handleChange}
            />
            <label>IsSup</label>
            <input
              type="text"
              name="isSup"
              placeholder={movie.isSup}
              onChange={handleChange}
            />

            <label>Film Location</label>
            <input
              type="text"
              name="filmLocations"
              placeholder={movie.filmLocations}
              onChange={handleChange}
            />
            <label>Nhà viết sách</label>
            <input
              type="text"
              name="writer"
              placeholder={movie.writer}
              onChange={handleChange}
            />
            <label>Đạo diễn</label>
            <input
              type="text"
              name="director.directorName"
              placeholder={movie.director.directorName}
              onChange={handleChange}
            />
            <label>movieTag</label>
            <input
              type="text"
              name="movieTag"
              placeholder={movie.movieTag}
              onChange={handleChange}
            />
            <label>Kiểu phim</label>

            <select name="isSeries" id="isSeries" onChange={handleChange}>
              <option>Select</option>
              <option value="false">Phim lẻ</option>
              <option value="true">Phim nhiều tập</option>
            </select>

            <label>Danh sách diễn viên</label>
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
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label>Movie Image</label>
              <input
                type="file"
                name="img"
                id="file"
                name="img"
                onChange={(e) => setImg(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img src={movie.imgTitle} alt="" className="productUploadImg" />
              <label>Movie ImageTitle</label>
              <input
                type="file"
                name="imgTitle"
                id="file"
                name="imgTitle"
                onChange={(e) => setImgTitle(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img src={movie.imgSm} alt="" className="productUploadImg" />
              <label>Movie Image Small</label>
              <input
                type="file"
                name="imgSm"
                id="file"
                name="imgSm"
                onChange={(e) => setImgSm(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img src={movie.imgPost} alt="" className="productUploadImg" />
              <label>Movie Image Post</label>
              <input
                type="file"
                name="imgPost"
                id="file"
                name="imgPost"
                onChange={(e) => setImgPost(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img
                src="https://tino.org/wp-content/uploads/2021/08/word-image-320-1024x512.jpeg"
                alt=""
                className="productUploadImg"
              />
              <label>Video Sub</label>
              <input
                name="listVideoSub"
                type="file"
                id="file"
                onChange={(e) => setListVideoSub(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img
                src="https://photo.tinhte.vn/store/2013/11/2230095_Phim_VietSub.png"
                alt=""
                className="productUploadImg"
              />
              <label>Video Thuyết Minh</label>
              <input
                name="listVideoTM"
                type="file"
                id="file"
                onChange={(e) => setListVideoTM(e.target.files[0])}
              />
            </div>

            <div className="productUpload">
              <img
                src="https://videohive.img.customer.envatousercontent.com/files/272807.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=fbc236446cd45ef0951911b8e42d8ea3"
                alt=""
                className="productUploadImg"
              />
              <label>Movie Trailer</label>
              <input
                name="trailer"
                type="file"
                id="file"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>

            {uploaded === 1 ? (
              <button className="productButton" onClick={handleSubmit}>
                Cập nhật
              </button>
            ) : loading ? (
              <Skeleton type="product" />
            ) : (
              <button className="productButton" onClick={handleUpload}>
                Tải ảnh
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
