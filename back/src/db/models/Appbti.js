import { AppbtiAnswerModel } from '../schemas/appbtianswer';
import { AppbtiResultModel } from '../schemas/appbtiresult';

class Appbti {
  static async findByKey({ answers }) {
    const apps = await AppbtiAnswerModel.find({ key: { $in: answers } });
    return apps;
  }
  static async create({ newResult }) {
    const createdNewResult = await AppbtiResultModel.create(newResult);
    return createdNewResult;
  }
}

export { Appbti };
