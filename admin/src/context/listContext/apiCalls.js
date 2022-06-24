import {
  createListsFailure,
  createListsStart,
  createListsSuccess,
  deleteListsFailure,
  deleteListsStart,
  deleteListsSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
  updateListsSuccess,
} from "./ListActions";
import axios from "axios";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());
  try {
    const res = await axios.get("/lists", {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (e) {
    dispatch(getListsFailure(e));
  }
};

export const deleteLists = async (id, dispatch) => {
  dispatch(deleteListsStart());
  try {
    await axios.delete("/lists/" + id, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
      },
    });
    dispatch(deleteListsSuccess(id));
  } catch (e) {
    dispatch(deleteListsFailure(e));
  }
};

export const createLists = async (list, dispatch) => {
  dispatch(createListsStart());
  try {
    const res = await axios.post("/lists", list, {
      headers: {
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
      },
    });
    dispatch(createListsSuccess(res.data));
  } catch (e) {
    dispatch(createListsFailure(e));
  }
};

export const updateLists = async (lists, list, dispatch) => {
  dispatch(updateListsSuccess());
  try {
    const res = await axios.put(
      "/lists/" + list._id,
      {
        title: lists.title,
        genre: lists.genre,
        type: lists.type,
        content: lists.content,
      },
      {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjA0Njc2NywiZXhwIjoxNjU2NDc4NzY3fQ.i3wEGQ_t9P9adkTVpdpMwpMN4vV_Z_yVh8qe6TY-S-8",
        },
      }
    );
    dispatch(updateListsSuccess(res.data));
  } catch (e) {}
};
