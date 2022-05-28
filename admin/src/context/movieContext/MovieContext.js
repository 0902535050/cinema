import MovieReducer from "./MovieReducer";
import { createContext, useReducer } from "react";
const initial_state = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(initial_state);
export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, initial_state);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
