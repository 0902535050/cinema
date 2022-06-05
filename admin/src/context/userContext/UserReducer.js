const UserReducer = (state, action) => {
  switch (action.type) {
    // get movie
    case "GET_USERS_START":
      return {
        users: [],
        isFetching: true,
        error: false,
      };
    case "GET_USERS_SUCCESS":
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_USERS_FAILURE":
      return {
        users: [],
        isFetching: false,
        error: true,
      };

    case "UPDATE_USERS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_USERS_SUCCESS":
      return {
        users: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_USERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    // create movie
    case "CREATE_USERS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_USERS_SUCCESS":
      return {
        users: [...state.users, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_USERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //delete movie
    case "DELETE_USERS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_USERS_SUCCESS":
      return {
        users: state.users.filter((user) => user._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_USERS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    default:
      return { ...state };
  }
};

export default UserReducer;
