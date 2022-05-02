import React, { useState } from "react";
import styled from "styled-components";

const Article1 = function ({ openModalHandler }) {
  const [isOpen, setIsOpen] = useState(false); //isOpen 상태를 만들어준다.
  // const [articleName, setArticleName] = useState("");

  const handleClickModal = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <ArticleContainer>
      <ArticleBox>
        <Graph>
          <span>그래프 영역</span>
        </Graph>
        <Content>
          <ContentTitle>
            Photography,
            <br />
            수요는 높지만 만족도가 평균치보다 낮아
            <br />
            도전해볼만한 시장
          </ContentTitle>
          <ContentSummary>Photography 카테고리에는 100만 이상 다운로드 된 앱이 많은데 비해, 평점 3점대인 앱의 비율이 높은 것으로 확인됩니다.</ContentSummary>
          <Button onClick={handleClickModal}>
            <p>자세히보기 👉</p>
          </Button>
        </Content>
        {isOpen ? (
          <ModalBackdrop onClick={handleClickModal}>
            <ModalView
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="close-btn" onClick={handleClickModal}>
                &times;
              </div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
              <div className="content">HELLO MODAL!</div>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ArticleBox>
    </ArticleContainer>
  );
};

export default Article1;

const ArticleContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
`;

const ArticleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 1100px;
  height: 400px;
  margin: 50px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 7px 10px #e4e4e4;
`;

const Graph = styled.div`
  width: 500px;
  height: 300px;
  background-color: #f7f7f7;
  margin: 0 30px;
`;

const Content = styled.div`
  width: 400px;
  height: auto;
  margin: 0 30px;
  border: 1px solid #e4e4e4;
  color: #707070;
`;

const ContentTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const ContentSummary = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 130px;
  height: 34px;
  border: 1.5px solid var(--primary);
  border-radius: 10px;
  margin-left: auto;
  cursor: pointer;

  font-size: 13px;
  color: var(--primary);

  transition: all 0.8s ease;

  &:hover {
    color: #fff;
    background-color: var(--primary);
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 1000px;
  height: 600px;
  border-radius: 1rem;
  position: relative;

  overflow: scroll;
  /* IE scroll 숨김 */
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
  }

  .content {
    font-size: 100px;
  }
`;
