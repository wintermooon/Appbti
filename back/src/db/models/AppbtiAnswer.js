import { AppbtiAnswerModel } from '../schemas/appbtianswer';

class AppbtiAnswer {
  static async create({ newAnswer }) {
    const createdNewAnswer = await AppbtiAnswerModel.create(newAnswer);
    return createdNewAnswer;
  }

  static async findById({  }) {
    const Answer = await AppbtiAnswerModel.findOne({   });
    return Answer;
  }
}

export { AppbtiAnswer };
