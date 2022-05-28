import ListReducer from "./ListReducer";
import { createContext, useReducer } from "react";
const initial_state = {
  lists: [],
  isFetching: false,
  error: false,
};

export const ListContext = createContext(initial_state);
export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ListReducer, initial_state);

  return (
    <ListContext.Provider
      value={{
        lists: state.lists,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
