import React, { useState } from "react";
import * as Api from "../../../api";

function CommentAddForm({ setComments, cur_user_id, cur_user_name, cur_board_id }) {
  const [tempComment, setTempComment] = useState({ content: "" });

  const handleCommentValue = (name, value) => {
    setTempComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm(`댓글을 남기시겠습니까?`)) {
        const { data: createdComment } = await Api.post(`freeboard/comment/create`, {
          ...tempComment,
          board_id: cur_board_id,
          user_id: cur_user_id,
          name: cur_user_name,
        });
        setComments((prev) => [...prev, createdComment]);
        handleCommentValue("content", "");
      }
    } catch (error) {
      alert("댓글을 남기지 못했습니다.", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{cur_user_name}</h3>
        <textarea id="FreeboardComment" placeholder="바르고 고운 댓글을 달아주세요 *^~^*" onChange={(e) => handleCommentValue("content", e.target.value)} value={tempComment.content} />
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default CommentAddForm;
