import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { createUsers } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";

export default function NewUser() {
  const [users, setUsers] = useState(null);
  const { dispatch } = useContext(UserContext);
  const history = useHistory();
  const handleChange = (e) => {
    const value = e.target.value;
    setUsers({ ...users, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUsers(users, dispatch);
    history.push("/users");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <button className="newUserButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
