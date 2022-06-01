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

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const editUser = async (values, dispatch) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.put(
      "/users/" + currentUser._id,
      {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
        },
      }
    );
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
        },
      }
    );
    dispatch(updateUserAva(res.data));
  } catch (err) {
    console.log(err);
  }
};
