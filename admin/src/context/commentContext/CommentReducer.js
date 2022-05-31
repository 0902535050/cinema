const CommentReducer = (state, action) => {
  switch (action.type) {
    //delete comment
    case "DELETE_COMMENTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_COMMENTS_SUCCESS":
      return {
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "DELETE_COMMENTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CommentReducer;
