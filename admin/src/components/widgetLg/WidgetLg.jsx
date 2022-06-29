import "./widgetLg.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { DeleteOutline } from "@material-ui/icons";
import User from "../user/User";
import { deleteComments } from "../../context/commentContext/apiCalls";
import { CommentContext } from "../../context/commentContext/CommentContext";
import { updateMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
export default function WidgetLg() {
  const [comment, setComment] = useState([]);
  const { dispatch: dispatchComment } = useContext(CommentContext);
  const { dispatch } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllComment = async () => {
      try {
        const res = await axios.get("/comments?new=true", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
          },
        });
        setComment(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllComment();
  }, [loading]);

  const handleDelete = async (item) => {
    let array;
    try {
      const res = await axios.get("/movies/find/" + item.movieId, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzU4YjZjOTUwMDJlYTJmZjFjYjMzZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NjQ4Mzk1MCwiZXhwIjoxNjU2OTE1OTUwfQ.SxBB9PgKJG9DlhGcF_FF-TLgkVKdRaRS09a8e4qJRYk",
        },
      });

      array = res.data.listComment.filter((id) => id !== item._id);
      updateMovies(array, item, dispatch);
    } catch (e) {
      console.log(e);
    }
    deleteComments(item, setLoading, dispatchComment);
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Những bình luận gần đây</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Người tạo</th>
            <th className="widgetLgTh">Nội dung bình luận</th>
            <th className="widgetLgTh">Vị trí phim</th>
            <th className="widgetLgTh">Thời điểm tạo</th>
            <th className="widgetLgTh">Ngày tạo</th>
            <th className="widgetLgTh"></th>
          </tr>
          {comment.map((item, index) => {
            const createdAt = moment(item.createdAt)
              .startOf("second")
              .fromNow();
            const createdAtDate = new Date(item.createdAt).toLocaleDateString();

            return (
              <tr key={index} className="widgetLgTr">
                <td className="widgetLgUser">
                  <User userId={item.creator} />
                </td>
                <td className="widgetLgContent">
                  <span>{item.content}</span>
                </td>
                <td className="widgetLgLocation">
                  <span>{item.location}</span>
                </td>
                <td className="widgetLgDate">{createdAt}</td>
                <td className="widgetLgAmount">{createdAtDate}</td>
                <td className="widgetLgStatus">
                  {/* <Button type={type} item={item} /> */}

                  <DeleteOutline
                    className="widgetLgButton"
                    onClick={() => handleDelete(item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
