import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);
  const [type, setType] = useState("");
  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get("/users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setNewUsers(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getNewUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Người dùng mới</span>
      <ul className="widgetSmList">
        {newUsers.map((user, index) => (
          <li key={index} className="widgetSmListItem">
            <span>{index + 1}.</span>
            <img
              src={user.profilePic || "https://picsum.photos/50/50"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
