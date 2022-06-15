import {
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  createUsersStart,
  createUsersSuccess,
  createUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
} from "./UserActions";
import axios from "axios";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (e) {
    dispatch(getUsersFailure());
  }
};

export const updateUsers = async (users, user, dispatch) => {
  dispatch(updateUsersStart());
  try {
    const res = await axios.put(
      "/users/" + user._id,
      {
        fullName: users.fullName,
        phone: users.phone,
        nation: users.nation,
        address: users.address,
        date: users.date,
        profilePic: users.profilePic,
        isAdmin: users.isAdmin,
      },
      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateUsersSuccess(res.data));
  } catch (e) {
    dispatch(updateUsersFailure(e));
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteUsersStart());
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUsersSuccess(id));
  } catch (e) {
    dispatch(deleteUsersFailure(e));
  }
};

export const createUsers = async (user, dispatch) => {
  dispatch(createUsersStart());
  try {
    const res = await axios.post("/auth/register", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUsersSuccess(res.data));
  } catch (e) {
    dispatch(createUsersFailure(e));
  }
};
