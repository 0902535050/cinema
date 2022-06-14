import {
  AccountCircle,
  CalendarToday,
  Home,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import storage from "../../firebase";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./user.css";
import { useContext, useState } from "react";
import { updateUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import Skeleton from "../../components/skeleton/Skeleton";
export default function User() {
  const location = useLocation();
  const user = location.user || JSON.parse(localStorage.getItem("users"));
  const createdAtDate = new Date(user.createdAt).toLocaleDateString();
  const history = useHistory();
  const [uploaded, setUploaded] = useState(0);
  const [users, setUsers] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  let checked = profilePic === null || profilePic === undefined ? true : false;

  const handleChange = (e) => {
    const value = e.target.value;
    setUsers({ ...users, [e.target.name]: value });
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
            setUsers((prev) => {
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
    updateUsers(users, user, dispatch);
    history.push("/users");
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">User Info</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create New User</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={user.profilePic} className="userShowTopImg" alt="" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">
                Ngày lập tài khoản: {createdAtDate}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.isAdmin ? "Admin Account" : "User Account"}
              </span>
            </div>
            <div className="userShowInfo">
              <AccountCircle className="userShowIcon" />
              <span className="userShowInfoTitle">{user.fullName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.date}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.nation}</span>
            </div>
            <div className="userShowInfo">
              <Home className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={user.fullName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder={user.phone}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Nation</label>
                <input
                  type="text"
                  name="nation"
                  placeholder={user.nation}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Ngày sinh</label>
                <input
                  type="date"
                  name="date"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder={user.address}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Account Type</label>
                <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                  <option>Select</option>
                  <option value="false">User</option>
                  <option value="true">Admin</option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={user.profilePic} alt="" />
                <label htmlFor="avatar">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="profilePic"
                  name="profilePic"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                />
              </div>
              <div className="userUpdateUpload">
                {uploaded === 1 ? (
                  <button className="userUpdateButton" onClick={handleSubmit}>
                    Cập nhật
                  </button>
                ) : loading ? (
                  <Skeleton type="circle" />
                ) : checked ? (
                  ""
                ) : (
                  <button className="userUpdateButton" onClick={handleUpload}>
                    Tải ảnh
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
