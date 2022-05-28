export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCH_LIST":
      return {
        ...state,
        watchList: [action.payload, ...state.watchList],
      };
    case "REMOVE_MOVIE_FROM_WATCH_LIST":
      return {
        ...state,
        watchList: state.watchList.filter(
          (movie) => movie._id !== action.payload
        ),
      };
    case "ADD_MOVIE_TO_LIKED_LIST":
      return {
        ...state,
        likedList: [action.payload, ...state.likedList],
      };
    default:
      return state;
  }
};
