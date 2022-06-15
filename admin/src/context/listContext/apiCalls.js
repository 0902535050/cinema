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
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
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
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      }
    );
    dispatch(updateListsSuccess(res.data));
  } catch (e) {}
};
