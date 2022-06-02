import {
  createMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  updateMoviesFailure,
  updateMoviesStart,
  updateMoviesSuccess,
} from "./MovieActions";
import axios from "axios";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axios.get("/movies", {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (e) {
    dispatch(getMoviesFailure());
  }
};

export const deleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());
  try {
    await axios.delete("/movies/" + id, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
      },
    });
    dispatch(deleteMoviesSuccess(id));
  } catch (e) {
    dispatch(deleteMoviesFailure(e));
  }
};

export const createMovies = async (movie, dispatch) => {
  dispatch(createMoviesStart());
  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
      },
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (e) {
    dispatch(createMoviesFailure(e));
  }
};

export const updateMovies = async (item, dispatch) => {
  let newArray = [];
  try {
    const resComment = await axios.get("/movies/find/" + item.movieId, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
      },
    });
    newArray = resComment.data.listComment.filter((m) => m !== item._id);
  } catch (e) {
    console.log(e);
  }

  if (newArray.length > 0) {
    dispatch(updateMoviesStart());
    try {
      const res = await axios.put(
        "/movies/" + item.movieId,
        {
          watchList: newArray,
        },
        {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1Mzk2NDM0NiwiZXhwIjoxOTEzMTY0MzQ2fQ.sGCG3ise2mHJKyGzmSKOmv-LMAv1hRw9fkqYU9avIJg",
          },
        }
      );
      dispatch(updateMoviesSuccess(res.data));
    } catch (e) {
      dispatch(updateMoviesFailure(e));
    }
  }
};
