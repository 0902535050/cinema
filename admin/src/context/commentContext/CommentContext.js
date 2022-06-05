import { createContext, useReducer } from "react";
import CommentReducer from "./CommentReducer";
const initial_state = {
  comments: [],
  isFetching: false,
  error: false,
};

export const CommentContext = createContext(initial_state);
export const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentReducer, initial_state);

  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
