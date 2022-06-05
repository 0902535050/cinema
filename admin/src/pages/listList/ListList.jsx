import "./listList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { getLists, deleteLists } from "../../context/listContext/apiCalls";
import Dialog from "../../components/dialog/dialog";

export default function ListList() {
  const { lists, dispatch } = useContext(ListContext);

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
    getLists(dispatch);
  }, [dispatch]);

  const setLocalStorage = (item) => {
    localStorage.setItem("lists", JSON.stringify(item));
  };

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idUseRef.current = id;
  };

  const areUSureDelete = (choose) => {
    console.log(idUseRef);
    if (choose) {
      deleteLists(idUseRef.current, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },

    { field: "title", headerName: "title", width: 200 },

    { field: "type", headerName: "type", width: 200 },

    { field: "genre", headerName: "genre", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/list/" + params.row._id,
                list: params.row,
              }}
            >
              <button
                className="listListEdit"
                onClick={setLocalStorage(params.row)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="listListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="listList">
      <DataGrid
        rows={lists}
        disableSelectionOnClick
        columns={columns}
        pageSize={15}
        checkboxSelection
        getRowId={(row) => row._id}
      />

      {dialog.isLoading && (
        <Dialog message={dialog.message} onDialog={areUSureDelete} />
      )}
    </div>
  );
}
