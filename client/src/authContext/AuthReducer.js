const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "UPDATE_USER":
      return {
        user: action.payload,
        isFetching: true,
        error: false,
      };
    case "UPDATE_USER_AVA":
      return {
        user: action.payload,
        isFetching: true,
        error: false,
      };
    case "ADD_TO_WATCH_LIST":
      return {
        user: action.payload,
        isFetching: true,
        error: false,
      };

    case "REMOVE_MOVIE_FROM_WATCH_LIST":
      return {
        user: action.payload,
        isFetching: true,
        error: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
