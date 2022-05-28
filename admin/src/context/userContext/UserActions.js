//LOGIN
export const getUsersStart = () => ({
  type: "GET_USERS_START",
});

export const getUsersSuccess = (users) => ({
  type: "GET_USERS_SUCCESS",
  payload: users,
});

export const getUsersFailure = () => ({
  type: "GET_USERS_FAILURE",
});

// //DELETE
// export const deleteUsersStart = () => ({
//   type: "DELETE_MOVIES_START",
// });

// export const deleteMoviesSuccess = (id) => ({
//   type: "DELETE_MOVIES_SUCCESS",
//   payload: id,
// });

// export const deleteMoviesFailure = () => ({
//   type: "DELETE_MOVIES_FAILURE",
// });

// //CREATE
// export const createMoviesStart = () => ({
//   type: "CREATE_MOVIES_START",
// });

// export const createMoviesSuccess = (movie) => ({
//   type: "CREATE_MOVIES_SUCCESS",
//   payload: movie,
// });

// export const createMoviesFailure = () => ({
//   type: "CREATE_MOVIES_FAILURE",
// });

// //UPLOAD
// export const updateMoviesStart = () => ({
//   type: "UPDATE_MOVIES_START",
// });

// export const updateMoviesSuccess = (movie) => ({
//   type: "UPDATE_MOVIES_SUCCESS",
//   payload: movie,
// });

// export const updateMoviesFailure = () => ({
//   type: "UPDATE_MOVIES_FAILURE",
// });
