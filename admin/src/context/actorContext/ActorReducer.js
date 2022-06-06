const ActorReducer = (state, action) => {
  switch (action.type) {
    // get actor
    case "GET_ACTORS_START":
      return {
        actors: [],
        isFetching: true,
        error: false,
      };
    case "GET_ACTORS_SUCCESS":
      return {
        actors: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_ACTORS_FAILURE":
      return {
        actors: [],
        isFetching: false,
        error: true,
      };

    // create actor
    case "CREATE_ACTORS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_ACTORS_SUCCESS":
      return {
        actors: [...state.actors, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_ACTORS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //update actor
    case "UPDATE_ACTORS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_ACTORS_SUCCESS":
      return {
        actors: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_ACTORS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };

    //delete actor
    case "DELETE_ACTORS_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_ACTORS_SUCCESS":
      return {
        actors: state.actors.filter((actor) => actor._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_ACTORS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ActorReducer;
