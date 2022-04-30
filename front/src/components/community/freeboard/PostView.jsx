import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../../../App";
import * as Api from "../../../api";
import Comments from "./FreeboardComments";
import CommentForm from "./FreeboardCommentForm";

function PostView(setViewType, user) {
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadPostView() {
      console.log("user:", user);
      console.log("params:", params);
      const res = await Api.get(`freeboards/${params._id}`);
      setPostInfo(res.data);
      setIsFetchCompleted(true);
    }
    loadPostView();
  }, [params, setViewType]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  const deleteNavigate = async () => {
    try {
      if (window.confirm("게시글을 삭제하시겠습니까?")) {
        await Api.delete(`freeboards`, params.id);
        // * * 자유게시판 엔드포인트 완성되면 거기로 보내주기
        navigate("community");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>{postInfo.title}</h2>
      <div> 작성자 : {postInfo.name} </div>
      <p>{postInfo.content}</p>
      <button id="list"> 목록</button>
      <button>수정</button>
      <button onClick={deleteNavigate}>삭제</button>
      {/* <Comments user={user} postId={params.id} />
      <CommentForm user={user} postId={params.id} /> */}
    </>
  );
}

export default PostView;
