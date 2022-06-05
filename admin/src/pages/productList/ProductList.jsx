import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovies, getMovies } from "../../context/movieContext/apiCalls";
import Dialog from "../../components/dialog/dialog";

export default function ProductList() {
  const { movies, dispatch } = useContext(MovieContext);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const idUseRef = useRef();

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idUseRef.current = id;
  };

  const areUSureDelete = (choose) => {
    console.log(idUseRef);
    if (choose) {
      deleteMovies(idUseRef.current, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const setLocalMovie = (item) => {
    localStorage.setItem("movie", JSON.stringify(item));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },

    { field: "year", headerName: "Year", width: 120 },

    { field: "limit", headerName: "Limit", width: 120 },

    { field: "isSup", headerName: "Support", width: 120 },

    { field: "nation", headerName: "Nation", width: 120 },

    { field: "duration", headerName: "Duration", width: 120 },

    { field: "imdb", headerName: "IMDb", width: 120 },

    { field: "isSeries", headerName: "IsSeries", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/product/" + params.row._id,
                movie: params.row,
              }}
            >
              <button
                className="productListEdit"
                onClick={() => setLocalMovie(params.row)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={movies}
        disableSelectionOnClick
        columns={columns}
        pageSize={13}
        checkboxSelection
        getRowId={(row) => row._id}
      />

      {dialog.isLoading && (
        <Dialog message={dialog.message} onDialog={areUSureDelete} />
      )}
    </div>
  );
}
