import React, { useState } from "react";
import { useNavigate } from "react-router";
import AnswerLists from "../Components/AnswerLists";

function Question() {
  const navigate = useNavigate();
  const [testResult, setTestResult] = useState([]);

  // const SaveAnswers = (name, value) => {
  //   setTestResult((prev) => ({ ...prev, [name]: value }));
  // };

  const SaveAnswers7 = async (e) => {
    e.preventDefault();
    console.log(testResult);
    testResult.push(AnswerLists[0].value);
    navigate(`/AppbtiTest/5`);
    console.log(testResult);
    setTestResult((prev) => [...prev]);
  };

  const SaveAnswers8 = async (e) => {
    e.preventDefault();
    console.log(testResult);
    testResult.push(AnswerLists[1].value);
    console.log(testResult);
    navigate(`/AppbtiTest/5`);
    setTestResult((prev) => [...prev]);
  };

  return (
    <main>
      <article>
        <h2>Q1. 내가 만드는 앱은~ 다른 사람들이 사용할 때 </h2>
        {/* css 수정하면 br 지우기! */}
        <br />
        <br />
        <br />
        <br />
        <button type="button" value="" onClick={SaveAnswers7}>
          Sugar처럼 즐길 수 있는 앱이면 좋겠어!
        </button>
        <button type="button" value="" onClick={SaveAnswers8}>
          Salt처럼 꼭 필요한 앱이면 좋겠어!
        </button>
      </article>
    </main>
  );
}

export default Question;