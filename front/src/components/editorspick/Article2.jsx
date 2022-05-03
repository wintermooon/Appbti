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
        offsetY: 0,
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
      offsetX: -20,
      offsetY: 10,
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

const graph2BarData = {
  series: [
    {
      name: "RANK 1",
      data: [3.96, 10.45, 5.62, 16.62],
    },
    {
      name: "RANK 2",
      data: [3.6, 9.73, 2.13, 8.69],
    },
    {
      name: "RANK 3",
      data: [2.75, 4.71, 1.34, 4.93],
    },
    {
      name: "RANK 4",
      data: [0, 4.12, 0, 4.23],
    },
    {
      name: "REMAIN",
      data: [89.7, 70.99, 90.91, 65.53],
    },
  ],

  options: {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: ["Education", "Lifestyle", "Finance", "Business"],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },
  },
};

const graph3BarData = {
  series: [
    {
      name: "Count Rank",
      data: [1, 4, 14, 12, 2, 19, 11, 17, 6, 5, 16, 7, 8, 15, 3, 9, 13, 10, 18, 25, 24, 20, 23, 21, 22, 29, 26, 27, 28, 30, 31, 32],
    },
    {
      name: "Total Installs Rank",
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    },
    {
      name: "Mean Installs Rank",
      data: [7, 4, 1, 3, 12, 2, 6, 5, 13, 17, 10, 20, 19, 11, 30, 22, 14, 21, 18, 8, 9, 15, 24, 28, 31, 16, 27, 23, 26, 29, 25, 32],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 1000,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["'#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: [
        "Game",
        "Tools",
        "Communication",
        "Productivity",
        "Entertainment",
        "Video Players & Editors",
        "Photography",
        "Social",
        "Music & Audio",
        "Personalization",
        "Shopping",
        "Books & Reference",
        "Lifestyle",
        "Travel & Local",
        "Education",
        "Finance",
        "Health & Fitness",
        "Business",
        "News & Magazines",
        "Weather",
        "Auto & Vehicles",
        "Maps & Navigation",
        "Art & Design",
        "Food & Drink",
        "Medical",
        "Comics",
        "Dating",
        "House & Home",
        "Beauty",
        "Parenting",
        "Libraries & Demo",
        "Events",
      ],
    },
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
          <ReactApexChart options={radialBarData.options} series={radialBarData.series} type="radialBar" height="370" width="400" />
          <p> - 전체 설치수가 낮고, 앱 개수는 높은 카데고리 상위 4개의 점유율 - </p>
        </Graph>
        <Content>
          <ContentTitle>
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
              <ModalArticle>
                <div className="close-btn" onClick={handleClickModal}>
                  &times;
                </div>
                <ModalTitle>상위권 앱 점유율이 높아 진입장벽이 있을 것으로 예측되는 시장</ModalTitle>
                <ModalBody>
                  AppBTI 에디터는 Google PlayStore에서
                  <br />
                  이미 메인으로 점유하고 있는 어플이 존재하는 레드오션 시장이지만,
                  <br />
                  도전해 볼 만한 틈새시장을 찾기 위해 관련 데이터를 분석해보았습니다.
                </ModalBody>
                <Graph1 id="chart">
                  <ReactApexChart options={radialBarData.options} series={radialBarData.series} type="radialBar" height="370" />
                  <p> - 전체 설치수가 낮고, 앱 개수는 높은 카데고리 상위 4개의 점유율 - </p>
                </Graph1>
                <ModalBody>
                  위의 그래프는 카테고리별 평균 설치수에 비해 전체 설치수가 많은 상위 3개 서비스의 점유율을 나타냅니다.
                  <br />
                  Entertainment, Music & Audio, Personalization, Books & Reference 카테고리는
                  <br />
                  메인으로 점유하고 있는 어플이 있음을 확인할 수 있습니다.
                </ModalBody>
                <Graph2 id="chart">
                  <ReactApexChart options={graph2BarData.options} series={graph2BarData.series} type="bar" height="400" />
                  <p> - 카테고리별 앱 개수는 많지만, 전체 설치수는 적은 카테고리 - </p>
                </Graph2>
                <ModalBody>
                  위의 그래프는 카테고리별 앱 개수는 많으나, 전체 설치수가 적은 카테고리를 분석한 그래프입니다.
                  <br />
                  Lifestyle, Education, Finance, Business 카테고리는
                  <br />
                  유저의 수요에 비해 출시된 어플의 수는 많고, 다운로드 수는 상위 어플에 집중되어있음을 확인할 수 있습니다.
                </ModalBody>
                <Graph3 id="chart">
                  <ReactApexChart options={graph3BarData.options} series={graph3BarData.series} type="bar" height="2000" />
                  <p> - 카테고리 별 앱 수, 전체 설치 수, 평균 설치 수 별 순위 - </p>
                </Graph3>
                <ModalComment>
                  <div>
                    '평균 설치수에 비해 전체 설치수가 많은 상위 3개 카테고리' 및 '앱 개수는 많으나 전체 설치수가 적은 카테고리'인
                    <br />
                    Entertainment, Music & Audio, Personalization, Books & Reference, Lifestyle, Education, Finance, Business
                    <br />
                    카테고리는 진입장벽이 있을 것으로 예측됩니다.
                    <br />
                  </div>
                  <div id="comment">
                    하지만, 트렌드를 빠르게 포착하여 유저의 니즈를 찾고, 앱 점유율이 높은 서비스를 참고하여
                    <br />
                    시장의 틈새를 공략한다면, 도전해볼만 하다고 판단됩니다.
                  </div>
                </ModalComment>

                <ModalFooter>Editor's Pick은 Google Playstore의 2021년 6월 데이터를 기준으로 분석한 결과입니다.</ModalFooter>
              </ModalArticle>
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
`;

const Graph = styled.div`
  width: 500px;
  height: 300px;
  margin: 0 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .apexcharts-legend-marker {
    width: 9px !important;
    height: 9px !important;
    margin: 0 10px !important;
  }

  .apexcharts-legend-series {
    margin: 0 !important;
  }

  p {
    position: absolute;
    top: 410px;
    font-size: 11px;
    color: #707070;
  }
`;

const Content = styled.div`
  width: 400px;
  height: auto;
  margin: 0 30px;
`;

const ContentTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const ContentSummary = styled.div`
  margin-bottom: 30px;
  font-size: 14px;
  color: #707070;
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
  background-color: rgba(0, 0, 0, 0.6);
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
  text-align: center;
  background-color: white;
  width: 1000px;
  height: 600px;
  border-radius: 1rem;
  position: relative;
`;

const ModalArticle = styled.div`
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

const ModalTitle = styled.div`
  margin: 100px 0 80px 0;
  font-size: 23px;
  font-weight: bold;
  color: #000;
`;

const ModalBody = styled.div`
  margin: 50px 0;
  font-size: 14px;
  color: #707070;
`;

const Graph1 = styled.div`
  .apx-legend-position-left {
    left: 100px !important;
  }

  .apexcharts-legend-marker {
    width: 9px !important;
    height: 9px !important;
    margin: 0 10px !important;
  }

  .apexcharts-legend-series {
    margin: 0 !important;
  }

  p {
    font-size: 11px;
    color: #707070;
  }
`;

const Graph2 = styled.div`
  .apx-legend-position-right {
    top: 30px !important;
  }
  .apexcharts-legend-marker {
    margin: 0 10px !important;
  }

  .apexcharts-legend-series {
    margin: 0 !important;
  }

  p {
    font-size: 11px;
    color: #707070;
  }
`;

const Graph3 = styled.div`
  .apexcharts-legend-marker {
    margin: 0 10px !important;
  }
  p {
    font-size: 11px;
    color: #707070;
  }
`;

const ModalComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  width: 800px;
  height: 150px;
  background-color: #f9f9f9;
  font-size: 14px;
  font-style: italic;

  #comment {
    text-decoration: underline;
  }
`;

const ModalFooter = styled.div`
  font-size: 11px;
  color: #707070;
  margin: 50px 0;
`;
