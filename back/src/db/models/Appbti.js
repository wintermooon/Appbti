import { AppbtiAnswerModel } from '../schemas/appbtianswer';
import { AppbtiResultModel } from '../schemas/appbtiresult';

class Appbti {
  static async findByKey({ answers }) {
    const apps = await AppbtiAnswerModel.findOne({ key: { $in: answers } });
    return apps;
  }
  static async create({ newResult }) {
    const createdNewResult = await AppbtiResultModel.create(newResult);
    return createdNewResult;
  }
  static async findById({ userId }) {
    const appbtiresult = await AppbtiResultModel.findOne({ userId });

    return appbtiresult;
  }

  static async update({ userId, newResult }) {
    const filter = { userId };
    const update = { $set: newResult };
    const option = { returnOriginal: false };
    const updatedPost = await AppbtiResultModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }
}

export { Appbti };
