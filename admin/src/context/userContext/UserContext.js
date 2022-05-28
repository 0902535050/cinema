import UserReducer from "./UserReducer";
import { createContext, useReducer } from "react";
const initial_state = {
  users: [],
  isFetching: false,
  error: false,
};

export const UserContext = createContext(initial_state);
export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initial_state);

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
