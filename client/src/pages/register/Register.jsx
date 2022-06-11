import axios from "axios";

import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "../../components/textfield/TextField";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.onresize = function () {
      setHeight(window.innerHeight);
    };
  }, []);

  const validate = Yup.object().shape({
    email: Yup.string()
      .required("Không được bỏ trống !")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email bạn nhập chưa đúng vui lòng điền lại !"
      ),
    username: Yup.string().required("Không được bỏ trống !").max(30),
    // .matches(
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username có độ dài từ 8-20 kí tự và không có khoảng trắng !"
    // ),
    password: Yup.string()
      .max(255)
      .required("Không được bỏ trống !")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Mật khẩu tối thiểu 8 kí tự bao gồm chữ và số !"
      ),
  });

  const handleSubmit = async (values) => {
    try {
      setError(false);
      await axios.post("auth/register", values);
      Swal.fire({
        title: "Đăng ký thành công!",
        icon: "success",
        confirmButtonText: "Đóng",
      });
      history.push("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div
      className="register "
      style={{ backgroundImage: "url('./img/bgDangKy.jpg')", height }}
    >
      <div className="container">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <div>
              <Form className="formRegister">
                <div className="top">
                  <div className="wrapper">
                    <img className="logo" src="img/logo.png" alt="none" />
                  </div>
                </div>
                <h1>Đăng ký</h1>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formikProps.handleChange}
                />
                <TextField
                  label="Tên hiển thị"
                  name="username"
                  type="text"
                  onChange={formikProps.handleChange}
                />
                <TextField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  onChange={formikProps.handleChange}
                />
                <button type="submit" className="registerButton">
                  Đăng ký
                </button>
                <span>
                  Bạn đã có tài khoản tại Vinema?
                  <Link className="signUpLink" to="/login">
                    <span>Đăng nhập ngay!</span>
                  </Link>
                </span>
                {error && (
                  <span
                    style={{
                      color: "red",
                      marginTop: "10px",
                      fontStyle: "italic",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    Email hoặc Username đã có người dùng !!!
                  </span>
                )}
              </Form>
            </div>
          )}
        </Formik>

        {/*  */}
      </div>
    </div>
  );
}
