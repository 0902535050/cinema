import {
  deleteCommentsStart,
  deleteCommentsSuccess,
  deleteCommentsFailure,
} from "./CommentActions";
import axios from "axios";

export const deleteComments = async (item, setLoading, dispatch) => {
  setLoading(true);
  dispatch(deleteCommentsStart());
  try {
    await axios.delete("/comments/" + item._id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCommentsSuccess(item._id));
  } catch (e) {
    dispatch(deleteCommentsFailure(e));
  }
  setLoading(false);
};
