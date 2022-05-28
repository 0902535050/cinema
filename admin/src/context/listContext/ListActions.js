//GET LIST
export const getListsStart = () => ({
  type: "GET_LISTS_START",
});

export const getListsSuccess = (lists) => ({
  type: "GET_LISTS_SUCCESS",
  payload: lists,
});

export const getListsFailure = () => ({
  type: "GET_LISTS_FAILURE",
});

//DELETE
export const deleteListsStart = () => ({
  type: "DELETE_LISTS_START",
});

export const deleteListsSuccess = (id) => ({
  type: "DELETE_LISTS_SUCCESS",
  payload: id,
});

export const deleteListsFailure = () => ({
  type: "DELETE_LISTS_FAILURE",
});

//CREATE
export const createListsStart = () => ({
  type: "CREATE_LISTS_START",
});

export const createListsSuccess = (list) => ({
  type: "CREATE_LISTS_SUCCESS",
  payload: list,
});

export const createListsFailure = () => ({
  type: "CREATE_LISTS_FAILURE",
});

//UPLOAD
export const updateListsStart = () => ({
  type: "UPDATE_LISTS_START",
});

export const updateListsSuccess = (list) => ({
  type: "UPDATE_LISTS_SUCCESS",
  payload: list,
});

export const updateListsFailure = () => ({
  type: "UPDATE_LISTS_FAILURE",
});
