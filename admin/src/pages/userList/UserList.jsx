import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { deleteUsers, getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import Dialog from "../../components/dialog/dialog";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);
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
    getUsers(dispatch);
  }, [dispatch]);

  const setLocalUser = (user) => {
    localStorage.setItem("users", JSON.stringify(user));
  };

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete?", true);
    idUseRef.current = id;
  };

  const areUSureDelete = (choose) => {
    console.log(idUseRef);
    if (choose) {
      deleteUsers(idUseRef.current, dispatch);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={params.row.profilePic || "https://picsum.photos/50/50"}
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "isAdmin", headerName: "IsAdmin", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/user/" + params.row._id, user: params.row }}
            >
              <button
                className="userListEdit"
                onClick={() => setLocalUser(params.row)}
              >
                Edit
              </button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
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
