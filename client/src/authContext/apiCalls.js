import axios from "axios";
import {
  addToWatchList,
  loginFailure,
  loginStart,
  loginSuccess,
  updateUser,
  updateUserAva,
  removeFromWatchList,
} from "./AuthActions";
import Swal from "sweetalert2";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    Swal.fire({
      title: "Đăng nhập thành công!",
      text: `Xin chào ${user.email}`,
      icon: "success",
      confirmButtonText: "Đóng",
    });
    dispatch(loginSuccess(res.data));
  } catch (err) {
    Swal.fire({
      title: "Đăng nhập thất bại!",
      text: "Email hoặc mật khẩu nhập chưa đúng vui lòng nhập lại !!",
      icon: "error",
      confirmButtonText: "Đóng",
    });
    dispatch(loginFailure());
  }
};
export const editUser = async (values, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        email: values.email,
        username: values.username,
        fullName: values.fullName,
        nation: values.nation,
        phone: values.phone,
        date: values.date,
        desc: values.desc,
        address: values.address,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );
    Swal.fire({
      title: `Thay đổi thông tin cá nhân thành công !`,
      icon: "success",
      confirmButtonText: "Đóng",
    });
    dispatch(updateUser(res.data));
  } catch (err) {
    Swal.fire({
      title: `Thay đổi thông tin cá nhân thất bại !`,
      icon: "error",
      confirmButtonText: "Đóng",
    });
    console.log(err);
  }
};

export const changePassword = async (values, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        password: values.password,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );
    Swal.fire({
      title: `Thay đổi mật khẩu thành công !`,
      icon: "success",
      confirmButtonText: "Đóng",
    });
    dispatch(updateUser(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const removeMovieFromWatchList = async (movieList, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        watchList: movieList,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );

    dispatch(removeFromWatchList(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const addMovieItemToWatchList = async (movieList, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(movieList);

  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        watchList: movieList,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );
    dispatch(addToWatchList(res.data));
  } catch (err) {
    console.log(err);
  }
};

export const editUserAvatar = async (img, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log(img);
  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        profilePic: img.avatar,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );
    Swal.fire({
      title: "Thay đổi hình ảnh thành công !",
      icon: "success",
      confirmButtonText: "Đóng",
    });
    dispatch(updateUserAva(res.data));
  } catch (err) {
    console.log(err);
  }
};
