import React, { useState } from "react";
import { useNavigate } from "react-router";
import AnswerLists from "../Components/AnswerLists";

function Question() {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState([]);

  // const SaveAnswers = (name, value) => {
  //   setTestResult((prev) => ({ ...prev, [name]: value }));
  // };

  const SaveAnswers3 = async (e) => {
    e.preventDefault();
    console.log(testResult);
    testResult.push(AnswerLists[2].value);
    navigate(`/AppbtiTest/3`);
    console.log(testResult);
    setTestResult((prev) => [...prev]);
  };

  const SaveAnswers4 = async (e) => {
    e.preventDefault();
    console.log(testResult);
    testResult.push(AnswerLists[3].value);
    console.log(testResult);
    navigate(`/AppbtiTest/3`);
    setTestResult((prev) => [...prev]);
  };

  return (
    <main>
      <article>
        <h2>Q2. 나는 보통... </h2>
        {/* css 수정하면 br 지우기! */}
        <br />
        <br />
        <br />
        <br />
        <button type="button" value="" onClick={SaveAnswers3}>
          카톡 알림이 쌓여있는 건 못참아!!
        </button>
        <button type="button" value="" onClick={SaveAnswers4}>
          알림..? 300++이 뭐 대수라고..
        </button>
      </article>
    </main>
  );
}
export default Question;
