import React, { useState } from "react";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

// 차트 데이터 및 옵션
const radialBarData = {
  series: [32, 31, 30, 57],
  options: {
    chart: {
      height: 300,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: -20,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: ["Entertainment", "Music & Audio", "Personalization", "Books & Reference"],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetX: 35,
      offsetY: -10,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  },
};

const Article2 = function ({ openModalHandler }) {
  const [isOpen, setIsOpen] = useState(false); //isOpen 상태를 만들어준다.
  // const [articleName, setArticleName] = useState("");

  const handleClickModal = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <ArticleContainer>
      <ArticleBox>
        <Graph id="chart">
          <ReactApexChart options={radialBarData.options} series={radialBarData.series} type="radialBar" height="370" />
        </Graph>
        <Content>
          <ContentTitle>
            Red Ocean,
            <br />
            상위권 앱 점유율이 높아
            <br />
            진입장벽이 있을 것으로 예측되는 시장
          </ContentTitle>
          <ContentSummary>
            Education, Lifestyle, Finance, Business 카테고리는 상위권 앱의 점유율이 높습니다. 하지만, 트렌드를 빠르게 포착하고 시장의 틈새를 공략한다면 충분이 성공할 수 있을것으로 판단됩니다.
          </ContentSummary>
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

export default Article2;

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

  .apexcharts-legend-marker {
    width: 9px !important;
    height: 9px !important;
    margin: 0 10px !important;
  }

  .apexcharts-legend-series {
    margin: 0 !important;
  }
`;

const Graph = styled.div`
  width: 500px;
  height: 300px;
  margin: 0 30px;
`;

const Content = styled.div`
  width: 400px;
  height: auto;
  margin: 0 30px;
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
