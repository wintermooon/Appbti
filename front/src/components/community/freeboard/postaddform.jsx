import { useState } from "react";
import { useNavigate } from "react-router";
import { FormControl, Button, TextField } from "@mui/material";
import * as Api from "../../../api";

function PostAddForm({ user_id, setFreeboards, setIsAdding }) {
  const navigate = useNavigate();
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
        const res = await Api.post(`/freeboard/create`, {
          user_id: user_id,
          name: user_id.name,
          ...tempPost,
        });
        setFreeboards((prev) => [...prev, res.data]);
        setIsAdding(false);
        navigate(`/freeboardlist`);
      }
    } catch (error) {
      alert("게시글 등록에 실패하였습니다.", error);
    }
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <TextField id="outlined-multiline-flexible" label="Title" multiline maxRows={4} onInput={(e) => handlePostValue("title", e.target.value)} value={tempPost.title} />
      <TextField id="outlined-multiline-static" label="Content" multiline rows={10} value={tempPost.content} onInput={(e) => handlePostValue("content", e.target.value)} />

      <Button variant="contained" type="submit">
        등록
      </Button>
      <Button variant="contained" type="submit" onClick={() => setIsAdding(false)}>
        취소
      </Button>
    </FormControl>
  );
}

export default PostAddForm;
