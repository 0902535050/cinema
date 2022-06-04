import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./AuthActions";
import Swal from "sweetalert2";
export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
    Swal.fire({
      title: "Đăng nhập thành công!",
      icon: "success",
      confirmButtonText: "Đóng",
    });
  } catch (e) {
    dispatch(loginFailure());
    Swal.fire({
      title: "Đăng nhập thất bại!",
      text: "Email hoặc mật khẩu sai xin vui lòng nhập lại",
      icon: "error",
      confirmButtonText: "Đóng",
    });
  }
};
