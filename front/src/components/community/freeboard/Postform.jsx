import { useState, useContext } from "react";
import * as Api from "../../../api";
import "../../styles/Postform.css";

function Postform({ user, setIsAdding, setViewType }) {
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
        console.log(user);
        const res = await Api.post("freeboards", {
          user_id: user.id,
          name: user.name,
          ...tempPost,
        });
        setTempPost((prev) => [...prev, res.data]);
        setViewType("list");
      }
    } catch (error) {
      alert("게시글 등록에 실패하였습니다.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <span>
        {" "}
        <input id="title" type="text" onChange={(e) => handlePostValue("title", e.target.value)} placeholder="제목을 입력해주세요." value={tempPost.title} />
      </span>
      <br />
      <span>
        {" "}
        <textarea id="content" onChange={(e) => handlePostValue("content", e.target.value)} placeholder="내용을 입력해주세요." value={tempPost.content} />
      </span>
      <br />
      <button margin="10" type="submit" onSubmit={handleSubmit}>
        등록
      </button>
      <button type="button" onClick={() => setViewType("list")}>
        취소
      </button>
    </form>
  );
}

export default Postform;
