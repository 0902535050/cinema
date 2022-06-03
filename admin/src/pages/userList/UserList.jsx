import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";

export default function UserList() {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const setLocalUser = (user) => {
    localStorage.setItem("users", JSON.stringify(user));
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
              // onClick={() => handleDelete(params.row.id)}
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
    </div>
  );
}
