import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ActorContextProvider } from "./context/actorContext/ActorContext";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { CommentContextProvider } from "./context/commentContext/CommentContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { UserContextProvider } from "./context/userContext/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <MovieContextProvider>
          <ListContextProvider>
            <CommentContextProvider>
              <ActorContextProvider>
                <App />
              </ActorContextProvider>
            </CommentContextProvider>
          </ListContextProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
