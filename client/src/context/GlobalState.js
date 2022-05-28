import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  likedList: localStorage.getItem("likedList")
    ? JSON.parse(localStorage.getItem("likedList"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(state.watchList));
    localStorage.setItem("likedList", JSON.stringify(state.likedList));
  }, [state]);

  // actions
  const addMovieToWatchList = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCH_LIST", payload: movie });
  };

  const removeMovieFromWatchList = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCH_LIST", payload: id });
  };

  const addMovieToLikedList = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_LIKED_LIST", payload: movie });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchList: state.watchList,
        likedList: state.likedList,
        addMovieToWatchList,
        removeMovieFromWatchList,
        addMovieToLikedList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
