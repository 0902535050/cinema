import "./actorList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { deleteActors, getActors } from "../../context/actorContext/apiCalls";
import { ActorContext } from "../../context/actorContext/ActorContext";

export default function ActorList() {
  const { actors, dispatch } = useContext(ActorContext);

  useEffect(() => {
    getActors(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteActors(id, dispatch);
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
              <button className="actorListEdit">Edit</button>
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
    </div>
  );
}
