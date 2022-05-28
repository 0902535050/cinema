const MovieReducer = (state, action) => {
  switch (action.type) {
    // get movie
    case "GET_MOVIES_START":
      return {
        movies: [],
        isFetching: true,
        error: false,
      };
    case "GET_MOVIES_SUCCESS":
      return {
        movies: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_MOVIES_FAILURE":
      return {
        movies: [],
        isFetching: false,
        error: true,
      };

    // create movie
    case "CREATE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_MOVIES_SUCCESS":
      return {
        movies: [...state.movies, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // update movie
    case "UPDATE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_MOVIES_SUCCESS":
      return {
        movies: state.movies.map(
          (movie) => movie._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //delete movie
    case "DELETE_MOVIES_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_MOVIES_SUCCESS":
      return {
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_MOVIES_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default MovieReducer;
