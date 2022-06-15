import {
  createActorsFailure,
  createActorsStart,
  createActorsSuccess,
  deleteActorsFailure,
  deleteActorsStart,
  deleteActorsSuccess,
  getActorsFailure,
  getActorsStart,
  getActorsSuccess,
  updateActorsFailure,
  updateActorsStart,
  updateActorsSuccess,
} from "./ActorActions";
import axios from "axios";

export const getActors = async (dispatch) => {
  dispatch(getActorsStart());
  try {
    const res = await axios.get("/Actors", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getActorsSuccess(res.data));
  } catch (e) {
    dispatch(getActorsFailure());
  }
};

export const deleteActors = async (id, dispatch) => {
  dispatch(deleteActorsStart());
  try {
    await axios.delete("/Actors/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteActorsSuccess(id));
  } catch (e) {
    dispatch(deleteActorsFailure(e));
  }
};

export const createActors = async (actor, dispatch) => {
  dispatch(createActorsStart());
  try {
    const res = await axios.post("/Actors", actor, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createActorsSuccess(res.data));
  } catch (e) {
    dispatch(createActorsFailure(e));
  }
};

export const updateActors = async (actors, actor, dispatch) => {
  dispatch(updateActorsStart());
  try {
    const res = await axios.put(
      "/Actors/" + actor._id,
      {
        name: actors.name,
        stageName: actors.stageName,
        nation: actors.nation,
        desc: actors.desc,
        nameMovie: actors.nameMovie,
        profilePic: actors.profilePic,
      },

      {
        headers: {
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateActorsSuccess(res.data));
  } catch (e) {
    dispatch(updateActorsFailure(e));
  }
};
