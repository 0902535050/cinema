import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./authContext/AuthContext";
import { GlobalProvider } from "./context/GlobalState";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
