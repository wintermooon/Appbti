import React from "react";
import ReactApexChart from "react-apexcharts";

const Main = function () {
  return (
    <div>
      <h2>비로그인 유저도 볼 수 있는 페이지입니다.</h2>
      <ReactApexChart options={radialBarData.options} series={radialBarData.series} type="radialBar" height="390" />
    </div>
  );
};

export default Main;

// 차트 데이터 및 옵션
const radialBarData = {
  series: [32, 31, 30, 57],
  options: {
    chart: {
      height: 390,
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
      fontSize: "16px",
      position: "left",
      offsetX: 200,
      offsetY: 15,
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
