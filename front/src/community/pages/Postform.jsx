import { useState } from "react";
import * as Api from "../../api";
import { Button } from "@mui/material";

function Postform({ userId, setIsEditing, setIsAdding, setViewType }) {
  const [tempPost, setTempPost] = useState({
    title: "",
    content: "",
  });

  const handlePostValue = (name, value) => {
    setTempPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (window.confirm("게시글을 등록 하겠습니까?")) {
        const res = await Api.post(`freeboard/create`, {
          user_id: userId,
          name: userId.name,
          ...tempPost,
        });
        setTempPost((prev) => [...prev, res.data]);
        setIsAdding(false);
        setViewType("list");
      }
    } catch (error) {
      alert("게시글 등록에 실패하였습니다.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => handlePostValue("title", e.target.value)} value={tempPost.title} />
      <br />
      <textarea onChange={(e) => handlePostValue("content", e.target.value)} value={tempPost.content} />
      <br />
      <Button variant="contained" type="submit" onSubmit={handleSubmit}>
        등록
      </Button>
      <Button variant="contained" type="button" onClick={() => setIsAdding(false)}>
        취소
      </Button>
    </form>
  );
}

export default Postform;
