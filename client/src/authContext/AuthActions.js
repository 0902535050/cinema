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

//logout

export const logout = () => ({
  type: "LOGOUT",
});
