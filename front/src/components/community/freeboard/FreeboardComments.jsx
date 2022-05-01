import React, { useEffect, useState } from "react";
import CommentForm from "./FreeboardCommentForm";
import * as Api from "../../../api";

function Comments(postId, user) {
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [comments, setComments] = useState([]);

  // const handleDeleteClick = async (_id) => {
  //   try {
  //     if (window.confirm("댓글을 삭제하시겠습니까?")) {
  //       await Api.delete(`freeboard/comments/${_id}`);
  //       const { data: newComments } = await Api.get(`freeboard/boardcommentlist/${postId}`);
  //       setComments(newComments);
  //     }
  //   } catch (error) {
  //     alert("댓글을 삭제하지 못했습니다.", error);
  //   }
  // };

  const loadComments = async () => {
    try {
      const { data: loadedcomments } = await Api.get(`freeboards/comments/${postId}`);
      setComments(loadedcomments);
    } catch (error) {
      console.log(error);
    }
  };

  // const checkIsEditable = (comment_user_id) => {
  //   if (cur_user_id === comment_user_id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  useEffect(() => {
    loadComments();
  }, [setComments]);

  return (
    <>
      <h2>댓글</h2>
      {comments.map((comment) => {
        return (
          <div className="mt-3" key={comment._id}>
            {comment}
            {/* <div commentCard={comment} isEditable={checkIsEditable(comment.user_id)} handleDeleteClick={handleDeleteClick} /> */}
          </div>
        );
      })}
    </>
  );
}

export default Comments;
