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
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQzODg4NCwiZXhwIjoxNjU1ODcwODg0fQ.Y3JHobMnDB87qUNUPylFgz6Laic4WLVHQ5iLaixDt9Y",
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
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQzODg4NCwiZXhwIjoxNjU1ODcwODg0fQ.Y3JHobMnDB87qUNUPylFgz6Laic4WLVHQ5iLaixDt9Y",
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
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQzODg4NCwiZXhwIjoxNjU1ODcwODg0fQ.Y3JHobMnDB87qUNUPylFgz6Laic4WLVHQ5iLaixDt9Y",
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NTQzODg4NCwiZXhwIjoxNjU1ODcwODg0fQ.Y3JHobMnDB87qUNUPylFgz6Laic4WLVHQ5iLaixDt9Y",
        },
      }
    );
    dispatch(updateActorsSuccess(res.data));
  } catch (e) {
    dispatch(updateActorsFailure(e));
  }
};
