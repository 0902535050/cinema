export const loginStart = () => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const updateUser = (user) => ({
  type: "UPDATE_USER",
  payload: user,
});

export const updateUserAva = (user) => ({
  type: "UPDATE_USER_AVA",
  payload: user,
});

export const addToWatchList = (movie) => ({
  type: "ADD_TO_WATCH_LIST",
  payload: movie,
});

export const removeFromWatchList = (movie) => ({
  type: "REMOVE_MOVIE_FROM_WATCH_LIST",
  payload: movie,
});
//logout

export const logout = () => ({
  type: "LOGOUT",
});
