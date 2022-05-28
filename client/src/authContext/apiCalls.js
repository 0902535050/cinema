import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  updateUser,
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
  console.log(values);
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTgyNTIwNywiZXhwIjoxOTExMDI1MjA3fQ.zUnmi1ldGu_OBidqwP6V2MQc1cpCohfWySOxLIwww18",
        },
      }
    );
    dispatch(updateUser(res.data));
  } catch (err) {
    console.log(err);
  }
};
