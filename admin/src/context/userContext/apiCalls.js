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

// export const deleteMovies = async (id, dispatch) => {
//   dispatch(deleteMoviesStart());
//   try {
//     await axios.delete("/movies/" + id, {
//       headers: {
//         token:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
//       },
//     });
//     dispatch(deleteMoviesSuccess(id));
//   } catch (e) {
//     dispatch(deleteMoviesFailure(e));
//   }
// };

// export const createMovies = async (movie, dispatch) => {
//   dispatch(createMoviesStart());
//   try {
//     const res = await axios.post("/movies", movie, {
//       headers: {
//         token:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
//       },
//     });
//     dispatch(createMoviesSuccess(res.data));
//   } catch (e) {
//     dispatch(createMoviesFailure(e));
//   }
// };

// export const updateMovies = async (movie, dispatch) => {
//   dispatch(updateMoviesStart());
//   try {
//     const res = await axios.put("/movies", movie, {
//       headers: {
//         token:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
//       },
//     });
//     dispatch(updateMoviesSuccess(res.data));
//   } catch (e) {
//     dispatch(updateMoviesFailure(e));
//   }
// };
