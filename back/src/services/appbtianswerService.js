import { AppbtiAnswer } from '../db';

class appbtianswerService {
  static async addAnswer({ user_id, answer }) {
    const newAnswer = { user_id, answer };
    const createdNewAnswers = await AppbtiAnswer.create({ newAnswer });
    createdNewAnswers.errorMessage = null;
    return createdNewAnswers;
  }

  static async getAnswers({  }) {
    const Answers = await AppbtiAnswer.findAllByUserId({  });
    return Answers;
  }

}

export { appbtianswerService };
