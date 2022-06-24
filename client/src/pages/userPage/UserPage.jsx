import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  editUser,
  changePassword,
  editUserAvatar,
} from "../../authContext/apiCalls";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { TextField } from "../../components/textfield/TextField";
import * as Yup from "yup";
import {
  AccountCircle,
  Bookmark,
  CameraAlt,
  Edit,
  LockSharp,
} from "@material-ui/icons";
import ListitemWatchList from "../../components/listitem/ListitemWatctList";
import storage from "../../firebase";

import Avatar from "@mui/material/Avatar";
import Skeleton from "../../components/skeleton/Skeleton";
import axios from "axios";

export default function UserPage() {
  const history = useHistory();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const createdAt = new Date(currentUser.createdAt).toLocaleDateString();
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [movie, setMovie] = useState(null);
  const [flag, setFlag] = useState(1000);
  const [users, setUsers] = useState({});

  let checked = avatar === null || avatar === undefined ? true : false;

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
  }, [flag, currentUser._id]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const validatePass = Yup.object().shape({
    password: Yup.string()
      .max(255)
      .required("Không được bỏ trống !")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Mật khẩu tối thiểu 8 kí tự bao gồm chữ và số !"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Mật khẩu chưa khớp vui lòng nhập lại !"
      )
      .required("Không được bỏ trống !"),
  });

  const validate = Yup.object().shape({
    username: Yup.string().required("Không được bỏ trống !").max(30),
    fullName: Yup.string().required("Không được bỏ trống !").max(30),
    email: Yup.string()
      .required("Không được bỏ trống !")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email bạn nhập chưa đúng vui lòng điền lại !"
      ),
    nation: Yup.string().required("Không được bỏ trống !"),
    phone: Yup.string(),
    date: Yup.string(),
    desc: Yup.string(),
  });

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
      upload([{ file: avatar, label: "avatar" }]);
    } else setLoading(false);
  };

  const handleSubmitImg = (e) => {
    e.preventDefault();
    editUserAvatar(movie, dispatch);
    history.push("/");
  };

  const handleSubmit = (values) => {
    console.log(values);
    editUser(values, dispatch);
    history.push("/");
  };

  const handleSubmitPassword = (values) => {
    changePassword(values, dispatch);
    history.push("/");
  };

  const showEditAvatar = () => {
    setIsShowEdit(!isShowEdit);
  };

  return (
    <div className="userpagearia">
      <div className="navbarUSer">
        <Navbar />
      </div>
      <div className="userPage container">
        <div className="user-page">
          <div className="leftSide">
            <div className="infoUserAria">
              <div className="userAria">
                <div className="container magicTab">
                  <div className="bloc-tabs">
                    <button
                      className={
                        toggleState === 1 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(1)}
                      title="Thông tin cá nhân"
                    >
                      <AccountCircle className="accountProfile" />
                    </button>
                    <button
                      className={
                        toggleState === 2 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(2)}
                      title="Chỉnh sửa thông tin cá nhân"
                    >
                      <Edit className="editProfile" />
                    </button>
                    <button
                      className={
                        toggleState === 3 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(3)}
                      title="Danh sách phim đã lưu"
                    >
                      <Bookmark className="bookmarkMovie" />
                    </button>
                    <button
                      className={
                        toggleState === 4 ? "tabs active-tabs" : "tabs"
                      }
                      onClick={() => toggleTab(4)}
                      title="Đổi mật khẩu"
                    >
                      <LockSharp className="changePassMovie" />
                    </button>
                    <button className="closeTab" onClick={() => toggleTab(1)}>
                      x
                    </button>
                  </div>

                  <div className="content-tabs">
                    <div
                      className={
                        toggleState === 1 ? "content active-content" : "content"
                      }
                    >
                      <div className="avatarAria">
                        <Avatar
                          className="userAvatar"
                          src={
                            currentUser.profilePic !== ""
                              ? currentUser.profilePic
                              : "https://picsum.photos/200/200"
                          }
                        />
                        <div className="changeAvatarAria">
                          <CameraAlt
                            className="iconChangeAvatar"
                            onClick={showEditAvatar}
                          />
                        </div>
                      </div>
                      {isShowEdit ? (
                        <>
                          <div className="modalBackgroundShow">
                            <div className="modalShowContainer">
                              <button
                                className="btnCloseEditForm"
                                onClick={() => {
                                  setIsShowEdit(false);
                                }}
                              >
                                X
                              </button>
                              <label>Cập nhật ảnh đại diện</label>
                              <input
                                className="updateImg"
                                name="avatar"
                                type="file"
                                onChange={(e) => setAvatar(e.target.files[0])}
                              />

                              {uploaded === 1 ? (
                                <button
                                  className="addProductButton"
                                  onClick={handleSubmitImg}
                                >
                                  Cập nhật
                                </button>
                              ) : isLoading ? (
                                <Skeleton type="circle" />
                              ) : checked ? (
                                ""
                              ) : (
                                <button
                                  className="addProductButton"
                                  onClick={handleUpload}
                                  disabled={checked}
                                >
                                  Tải ảnh
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      <br />
                      <span className="userPageName">
                        {currentUser.username}
                      </span>
                      <br />
                      <small>Tên đầy đủ: {currentUser.fullName}</small>
                      <br />
                      <small>Ngày sinh: {currentUser.date}</small>
                      <br />
                      <small>Địa chỉ email: {currentUser.email}</small>
                      <br />
                      <small>Số điện thoại: {currentUser.phone}</small>
                      <br />
                      <small>Quốc tịch: {currentUser.nation}</small>
                      <br />
                      <small>Địa chỉ: {currentUser.address}</small>
                      <br />
                      <small>Ngày lập tài khoản: {createdAt}</small>
                      <p className="userDesc">Mô tả: {currentUser.desc}</p>
                    </div>

                    <div
                      className={
                        toggleState === 2
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <Formik
                        initialValues={{
                          username: currentUser.username,
                          fullName: currentUser.fullName || "",
                          email: currentUser.email,
                          nation: currentUser.nation || "",
                          phone: currentUser.phone || "",
                          date: currentUser.date || "",
                          desc: currentUser.desc || "",
                          address: currentUser.address || "",
                        }}
                        validationSchema={validate}
                        onSubmit={handleSubmit}
                      >
                        {(formikProps) => (
                          <div>
                            <h2
                              className="editInfoUserTitle"
                              style={{
                                color: "orange",
                                letterSpacing: "1px",
                                marginLeft: "100px",
                              }}
                            >
                              Chỉnh sửa thông tin cá nhân
                            </h2>
                            <Form className="formRegister">
                              <TextField
                                label="Email"
                                name="email"
                                type="email"
                                disabled
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />
                              <TextField
                                label="Tên hiển thị"
                                name="username"
                                type="text"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />
                              <TextField
                                label="Tên đầy đủ"
                                name="fullName"
                                type="text"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />
                              <TextField
                                label="Quốc tịch"
                                name="nation"
                                type="text"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <TextField
                                label="Số điện thoại"
                                name="phone"
                                type="phone"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <TextField
                                label="Ngày sinh"
                                name="date"
                                type="date"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <TextField
                                label="Mô tả bản thân"
                                name="desc"
                                type="text"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <TextField
                                label="Địa chỉ"
                                name="address"
                                type="text"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <button type="submit" className="updateButton">
                                Cập nhật
                              </button>
                            </Form>
                          </div>
                        )}
                      </Formik>
                    </div>

                    <div
                      className={
                        toggleState === 3
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <div className="watchListAria">
                        {users.watchList !== undefined ? (
                          <>
                            <h1>Danh sách phim của tôi</h1>
                            <div className="myWatchListAria">
                              {users.watchList.map((item, index) => {
                                return (
                                  <div className="" key={index}>
                                    <ListitemWatchList
                                      item={item}
                                      type="watchList"
                                      setFlag={setFlag}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <h2 className="no-movies mb-5">
                            Không có phim trong danh sách
                          </h2>
                        )}
                      </div>
                    </div>

                    <div
                      className={
                        toggleState === 4
                          ? "content  active-content"
                          : "content"
                      }
                    >
                      <Formik
                        initialValues={{
                          password: "",
                          confirmPassword: "",
                        }}
                        validationSchema={validatePass}
                        onSubmit={handleSubmitPassword}
                      >
                        {(formikProps) => (
                          <div>
                            <h2
                              className="editInfoUserPassword"
                              style={{
                                color: "orange",
                                letterSpacing: "1px",
                                marginLeft: "210px",
                              }}
                            >
                              Đổi mật khẩu
                            </h2>
                            <Form>
                              <TextField
                                label="Mật khẩu mới"
                                name="password"
                                type="password"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />
                              <TextField
                                label="Xác nhận mật khẩu mới"
                                name="confirmPassword"
                                type="password"
                                onChange={formikProps.handleChange}
                                style={{ width: "80%" }}
                              />

                              <button type="submit" className="updateButton">
                                Cập nhật
                              </button>
                            </Form>
                          </div>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sideBarAria">
                <Sidebar />
              </div>
            </div>

            {/* CHẮP VÁ */}

            <div className="footerAria">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
