import React, { useContext, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import Footer from "../../components/footer/Footer";
import ListitemTag from "../../components/listitem/ListitemTag";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { GlobalContext } from "../../context/GlobalState";
import { editUser } from "../../authContext/apiCalls";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { TextField } from "../../components/textfield/TextField";
import * as Yup from "yup";
import { AccountCircle, Bookmark, Close, Edit } from "@material-ui/icons";
import ListitemWatchList from "../../components/listitem/ListitemWatctList";
export default function UserPage() {
  const history = useHistory();
  const { watchList } = useContext(GlobalContext);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const createdAt = new Date(currentUser.createdAt).toLocaleDateString();

  const { dispatch } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const validate = Yup.object().shape({
    username: Yup.string().required("Không được bỏ trống !").max(30),
    email: Yup.string()
      .required("Không được bỏ trống !")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email bạn nhập chưa đúng vui lòng điền lại !"
      ),
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

  const handleSubmit = (values) => {
    editUser(values, dispatch);
    history.push("/");
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
                      <img
                        src={
                          currentUser.profilePic !== ""
                            ? currentUser.profilePic
                            : "https://picsum.photos/200/200"
                        }
                        alt=""
                        className="userAvatar"
                      />
                      <br />
                      <span className="userPageName">
                        {currentUser.username}
                      </span>
                      <br />
                      <small>Địa chỉ email: {currentUser.email}</small>
                      <br />
                      <small>Ngày lập tài khoản: {createdAt}</small>
                      <p>
                        First impressions can play a major role in how an
                        employer perceives you as a candidate. What you say
                        during the first phase of the interview can make a
                        difference in the outcome—in a good way or in a bad way.
                        You don't want to come across as awkward and lacking in
                        social skills. Rather, you'll want to show that you have
                        the professionalism and communication skills to be an
                        asset to the company if hired. Some hiring managers may
                        even make a decision to reject a candidate based on a
                        poor first impression. For instance, showing up late or
                        checking the phone throughout the interview, can lead
                        the hiring manager to perceive a candidate as having an
                        inability to make a commitment, meet deadlines, focus,
                        and follow-through, which are not qualities that will
                        impress an employer.
                      </p>
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
                          username: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                        }}
                        validationSchema={validate}
                        onSubmit={handleSubmit}
                      >
                        {(formikProps) => (
                          <div>
                            <h2
                              className="text-center"
                              style={{ color: "orange", letterSpacing: "1px" }}
                            >
                              Chỉnh sửa thông tin cá nhân
                            </h2>
                            <Form className="formRegister">
                              <TextField
                                label="Tên hiển thị"
                                name="username"
                                type="text"
                                onChange={formikProps.handleChange}
                              />
                              <TextField
                                label="Email"
                                name="email"
                                type="email"
                                onChange={formikProps.handleChange}
                              />

                              <TextField
                                label="Mật khẩu mới"
                                name="password"
                                type="password"
                                onChange={formikProps.handleChange}
                              />
                              <TextField
                                label="Xác nhận mật khẩu mớ1"
                                name="confirmPassword"
                                type="password"
                                onChange={formikProps.handleChange}
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
                        {watchList.length > 0 ? (
                          <div className="myWatchListAria">
                            <h1>Danh sách phim của tôi</h1>

                            <ListitemWatchList
                              movie={watchList}
                              type="watchList"
                            />
                          </div>
                        ) : (
                          <h2 className="no-movies mb-5">
                            Không có phim trong danh sách
                          </h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sideBarAria">
                <Sidebar />
              </div>
            </div>

            {/* CHẮP VÁ */}
            <input
              type="radio"
              name="radio-btn"
              id="radio1"
              style={{ opacity: 0 }}
            />
            <input
              type="radio"
              name="radio-btn"
              id="radio2"
              style={{ opacity: 0 }}
            />
            <input
              type="radio"
              name="radio-btn"
              id="radio3"
              style={{ opacity: 0 }}
            />
            <input
              type="radio"
              name="radio-btn"
              id="radio4"
              style={{ opacity: 0 }}
            />
            <div className="footerAria">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
