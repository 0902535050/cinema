import { RemoveRedEye } from "@material-ui/icons";
import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  const { removeMovieFromWatchList } = useContext(GlobalContext);

  return (
    <div className="inner-card-controls">
      {type === "watchList" && (
        <>
          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchList(movie._id)}
          >
            <RemoveRedEye />
          </button>
        </>
      )}
    </div>
  );
};
