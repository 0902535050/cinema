import axios from "axios";

import { useHistory, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "../../components/textfield/TextField";
import * as Yup from "yup";

export default function Register() {
  const history = useHistory();
  const validate = Yup.object().shape({
    email: Yup.string()
      .required("Không được bỏ trống !")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Email bạn nhập chưa đúng vui lòng điền lại !"
      ),
    username: Yup.string().required("Không được bỏ trống !").max(30),
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
      await axios.post("auth/register", values);
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="img/logo.png" alt="none" />
        </div>
      </div>
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
                    <b>Đăng nhập ngay!</b>
                  </Link>
                </span>
                <small>
                  Trang này được bảo vệ bởi reCAPTCHA của Google để đảm bảo bạn
                  không phải là bot. <b>Tìm hiểu thêm</b>.
                </small>
              </Form>
            </div>
          )}
        </Formik>

        {/*  */}
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
      </div>
    </div>
  );
}
