import axios from "axios";
import React, { useEffect, useState } from "react";

import User from "../user/User";
import moment from "moment";

export default function CommentList({ commentId }) {
  const [comment, setComment] = useState({});

  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await axios.get("/comments/find/" + commentId, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setComment(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getComment();
  }, [commentId]);
  const createdAt =
    comment !== null
      ? moment(comment.createdAt).startOf("second").fromNow()
      : "";

  const createdAtDate =
    comment !== null ? new Date(comment.createdAt).toLocaleDateString() : "";

  return (
    <div className="container userCommentListAria">
      <div className="userComment-Aria">
        {comment !== null ? (
          <>
            <User userId={comment.creator} />
            <div className="commentListAria">
              <div className="userComment">
                <span className="commentTyped">{comment.content}</span>
                <span className="commentTime" title={createdAtDate}>
                  {createdAt}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="itemNull">null</div>
        )}
      </div>
    </div>
  );
}
