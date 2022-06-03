import ActorReducer from "./ActorReducer";
import { createContext, useReducer } from "react";
const initial_state = {
  actors: [],
  isFetching: false,
  error: false,
};

export const ActorContext = createContext(initial_state);
export const ActorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ActorReducer, initial_state);

  return (
    <ActorContext.Provider
      value={{
        actors: state.actors,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ActorContext.Provider>
  );
};
