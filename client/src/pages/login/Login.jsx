import { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import { Link } from "react-router-dom";
import { TextField } from "../../components/textfield/TextField";

export default function Login() {
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = (values) => {
    login(values, dispatch);
  };

  const validate = Yup.object().shape({
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
        "Mật khẩu nhập chưa đúng vui lòng nhập lại !"
      ),
  });
  localStorage.clear();
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src="img/logo.png" alt="" />
        </div>
      </div>
      <div className="container">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <div>
              <Form className="formRegister">
                <h1>Đăng Nhập</h1>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  onChange={formikProps.handleChange}
                />

                <TextField
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  onChange={formikProps.handleChange}
                />
                <button type="submit" className="loginButton">
                  Đăng nhập
                </button>
                <span>
                  Bạn lần đầu đến Vinema?
                  <Link className="signUpLink" to="/register">
                    <b>Đăng ký ngay!</b>
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
