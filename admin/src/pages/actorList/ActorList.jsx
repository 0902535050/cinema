import "./actorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { deleteActors, getActors } from "../../context/actorContext/apiCalls";
import { ActorContext } from "../../context/actorContext/ActorContext";
import Dialog from "../../components/dialog/dialog";
export default function ActorList() {
  const { actors, dispatch } = useContext(ActorContext);

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
    getActors(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idUseRef.current = id;
    deleteActors(id, dispatch);
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      deleteActors(idUseRef.current, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const setLocalStorage = (item) => {
    localStorage.setItem("actors", JSON.stringify(item));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 190 },
    {
      field: "actor",
      headerName: "Actor",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="actorListItem">
            <img className="actorListImg" src={params.row.profilePic} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "stageName", headerName: "Nghệ Danh", width: 200 },

    { field: "nation", headerName: "Nation", width: 200 },

    { field: "desc", headerName: "Description", width: 500 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/actor/" + params.row._id,
                movie: params.row,
              }}
            >
              <button
                className="actorListEdit"
                onClick={() => setLocalStorage(params.row)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="actorListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="actorList">
      <DataGrid
        rows={actors}
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
