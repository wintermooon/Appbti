import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../../App";
import * as Api from "../../api";
import { Button } from "@mui/material";

// import Comments from "../comment/Comments";

function PostView(setViewType, freeboards) {
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    async function loadPostView() {
      const res = await Api.get(`/freeboard/${freeboards.id}`);
      setPostInfo(res.data);
      setIsFetchCompleted(true);
    }
    loadPostView();
  }, [setViewType]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  //   const deleteNavigate = async () => {
  //     try {
  //       if (window.confirm("게시글을 삭제하시겠습니까?")) {
  //         await Api.delete(`freeboard`, params.postId);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //
  return (
    <div>
      <span>{postInfo.title}</span>
      <span>작성자 : {postInfo.name}</span>
      <span>{postInfo.content}</span>
      {/* <Button variant="contained" onClick={() => navigate(`/freeboardlist`)}>
        목록
      </Button> */}
      {/* <Comments cur_user_id={userState.user.id} cur_user_name={userState.user.name} board_id={postInfo._id} /> */}
    </div>
  );
}

export default PostView;
