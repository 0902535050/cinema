import {
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  // deleteMoviesStart,
  // deleteMoviesSuccess,
  // deleteMoviesFailure,
  // createMoviesStart,
  // createMoviesSuccess,
  // createMoviesFailure,
  // updateMoviesStart,
  // updateMoviesSuccess,
  // updateMoviesFailure,
} from "./UserActions";
import axios from "axios";

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (e) {
    dispatch(getUsersFailure());
  }
};
