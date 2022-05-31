//DELETE
export const deleteCommentsStart = () => ({
  type: "DELETE_COMMENTS_START",
});

export const deleteCommentsSuccess = (id) => ({
  type: "DELETE_COMMENTS_SUCCESS",
  payload: id,
});

export const deleteCommentsFailure = () => ({
  type: "DELETE_COMMENTS_FAILURE",
});
