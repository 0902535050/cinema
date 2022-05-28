const ListReducer = (state, action) => {
  switch (action.type) {
    // get movie
    case "GET_LISTS_START":
      return {
        lists: [],
        isFetching: true,
        error: false,
      };
    case "GET_LISTS_SUCCESS":
      return {
        lists: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_LISTS_FAILURE":
      return {
        lists: [],
        isFetching: false,
        error: true,
      };

    // create movie
    case "CREATE_LISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_LISTS_SUCCESS":
      return {
        lists: [...state.lists, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_LISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    // update movie
    case "UPDATE_LISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_LISTS_SUCCESS":
      return {
        lists: state.lists.map(
          (list) => list._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_LISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //delete list
    case "DELETE_LISTS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_LISTS_SUCCESS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_LISTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ListReducer;
