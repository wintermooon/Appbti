import { Appbti } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class appbtiService {
  static async addResult({ userId, answers }) {
    // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    const lastanswer = answers.substring(12, 14);
    const otheranswers = answers.substring(0, 12);
    let resultNum = 20;
    let result = [];

    // 마지막 질문에 대한 답변 추가
    if (lastanswer == 'g1') {
      const lastanswerResult = await Appbti.findByKey({ answers: lastanswer });
      resultNum = 17;
      for (let j = 0; j < 3; j++) {
        result.push(lastanswerResult.result[Math.floor(Math.random() * lastanswerResult.result.length)]);
      }
    }

    const appbtiresult = await Appbti.findByKey({ answers: otheranswers });
    for (let i = 0; i < resultNum; i++) {
      result.push(appbtiresult.result[Math.floor(Math.random() * appbtiresult.result.length)]);
    }

    const newResult = { userId, answers, result };
    const previousresult = await Appbti.findById({ userId });
    let createdAppbtiResult;
    if (previousresult) {
      createdAppbtiResult = await Appbti.update({ userId, newResult });
    } else {
      createdAppbtiResult = await Appbti.create({ newResult });
    }
    createdAppbtiResult.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdAppbtiResult;
  }

  static async getAppbtiResult({ userId }) {
    const appbtiresult = await Appbti.findById({ userId });

    if (!appbtiresult) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return appbtiresult;
  }
}

export { appbtiService };
