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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
      },
    });
    dispatch(createMoviesSuccess(res.data));
  } catch (e) {
    dispatch(createMoviesFailure(e));
  }
};

export const updateMovies = async (array, item, dispatch) => {
  dispatch(updateMoviesStart());
  try {
    const res = await axios.put(
      "/movies/" + item.movieId,
      {
        listComment: array,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
        },
      }
    );
    dispatch(updateMoviesSuccess(res.data));
  } catch (e) {
    dispatch(updateMoviesFailure(e));
  }
};

export const updateMoviesMore = async (values, item, dispatch) => {
  dispatch(updateMoviesStart());
  try {
    const res = await axios.put(
      "/movies/" + item._id,
      {
        title: values.title,
        year: values.year,
        genre: values.genre,
        limit: values.limit,
        duration: values.duration,
        nation: values.nation,
        imdb: values.imdb,
        isSup: values.isSup,
        filmLocations: values.filmLocations,
        writer: values.writer,
        movieTag: values.movieTag,
        isSeries: values.isSeries,
        img: values.img,
        imgTitle: values.imgTitle,
        imgSm: values.imgSm,
        imgPost: values.imgPost,
        listVideoSub: values.listVideoSub,
        listVideoTM: values.listVideoTM,
        trailer: values.trailer,
        listActor: values.listActor,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
        },
      }
    );
    dispatch(updateMoviesSuccess(res.data));
  } catch (e) {
    dispatch(updateMoviesFailure(e));
  }
};
