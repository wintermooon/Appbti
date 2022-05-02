import { Appbti } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.

class appbtiService {
  static async addResult({ userId, answers }) {
    // { field: { $in: [<value1>, <value2>, ... <valueN> ] } }
    const apps = await Appbti.findByKey({ answers });
    let previousResult = [...apps[0].result];
    let intersectResult = [];
    let temp;
    for (let i = 1; i < apps.length; i++) {
      if (i != 1) {
        previousResult = [...intersectResult];
        intersectResult = [];
      }
      console.log('------------------', previousResult);
      console.log('0000000000000000000000000', intersectResult);
      temp = apps[i].result;
      for (let j = 0; j < previousResult.length; j++) {
        if (~temp.indexOf(previousResult[j])) {
          console.log(j);
          intersectResult.push(previousResult[i]);
        }
      }
    }
    // const a = ['app', '1', 'j'];
    // console.log(a);
    // const b = ['app', '2', 'l'];
    // console.log(b);

    // console.log(a.filter(x => b.includes(x)));

    const newResult = { userId, answers, intersectResult };
    const createdAppbtiResult = await Appbti.create({ newResult });

    createdAppbtiResult.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdAppbtiResult;
  }
}

export { appbtiService };
