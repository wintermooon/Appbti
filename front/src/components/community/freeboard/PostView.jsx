import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../../../App";
import * as Api from "../../../api";
import Lists from "./Lists";
import styled from "styled-components";

import Comments from "./FreeboardComments";

function PostView(setViewType, freeboardsId) {
  const [postInfo, setPostInfo] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    async function loadPostView() {
      const res = await Api.get(`freeboard/6266a0567f453caae363ecbb`);
      console.log(res);
      setPostInfo(res.data);
      setIsFetchCompleted(true);
    }
    loadPostView();
  }, [setViewType]);

  if (!isFetchCompleted) {
    return "loading...";
  }

  // const deleteNavigate = async () => {
  //   try {
  //     if (window.confirm("게시글을 삭제하시겠습니까?")) {
  //       await Api.delete(`freeboard`, params.postId);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <h2>{postInfo.title}</h2>
      <div> 작성자 : {postInfo.name} </div>
      <p>{postInfo.content}</p>
      {/* <button>
        {" "}
        <link to="/">목록</link>{" "}
        <a
          href="#"
          onClick={() => {
            alert("삭제");
          }}
        >
          {" "}
          삭제{" "}
        </a>{" "}
        <a
          href="#"
          onClick={() => {
            alert("수정");
          }}
        >
          {" "}
          수정{" "}
        </a>{" "}
      </button> */}
      <Comments />
    </>
  );
}

// const Wrap = styled.div`
//   padding: 20px;
//   h2 {
//     padding-bottom: 20px;
//     border-bottom: 1px solid #ccc;
//   }
//   p {
//     min-height: 200px;
//   }
// `;

// const Button = styled.div`
//   border-top: 1px solid #eee;
//   padding: 20px;
//   a {
//     float: right;
//     padding: 10px 20px;
//     border-radius: 5px;
//     text-decoration: none;
//     background: #f2f2f2;
//     border: 1px solid #ddd;
//     color: #424242;
//     font-size: 16px;
//   }
//   a + a {
//     margin-right: 5px;
//   }
// `;

export default PostView;
