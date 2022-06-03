//LOGIN
export const getActorsStart = () => ({
  type: "GET_ACTORS_START",
});

export const getActorsSuccess = (Actors) => ({
  type: "GET_ACTORS_SUCCESS",
  payload: Actors,
});

export const getActorsFailure = () => ({
  type: "GET_ACTORS_FAILURE",
});

//DELETE
export const deleteActorsStart = () => ({
  type: "DELETE_ACTORS_START",
});

export const deleteActorsSuccess = (id) => ({
  type: "DELETE_ACTORS_SUCCESS",
  payload: id,
});

export const deleteActorsFailure = () => ({
  type: "DELETE_ACTORS_FAILURE",
});

//CREATE
export const createActorsStart = () => ({
  type: "CREATE_ACTORS_START",
});

export const createActorsSuccess = (movie) => ({
  type: "CREATE_ACTORS_SUCCESS",
  payload: movie,
});

export const createActorsFailure = () => ({
  type: "CREATE_ACTORS_FAILURE",
});
