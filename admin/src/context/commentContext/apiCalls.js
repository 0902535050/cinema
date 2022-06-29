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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
      },
    });
    dispatch(deleteCommentsSuccess(item._id));
  } catch (e) {
    dispatch(deleteCommentsFailure(e));
  }
  setLoading(false);
};
