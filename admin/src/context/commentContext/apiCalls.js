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
        token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjYzNzA3OSwiZXhwIjoxNjU3MDY5MDc5fQ.4gSdnOu-rihltwnMePMC1MGBSJx9f9q_7QaeTz2UiHI",
      },
    });
    dispatch(deleteCommentsSuccess(item._id));
  } catch (e) {
    dispatch(deleteCommentsFailure(e));
  }
  setLoading(false);
};
