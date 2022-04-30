import { QTcommentModel } from '../schemas/qtcomment';

class QTcomment {
  static async createComment({ newComment }) {
    const createdNewComment = await QTcommentModel.create(newComment);
    return createdNewComment;
  }

  static async findById({ comment_id }) {
    const comment = await QTcommentModel.findOne({ _id: comment_id });
    return comment;
  }

  static async findByUserId({ user_id }) {
    const comments = await QTcommentModel.find({ user_id });
    return comments;
  }

  static async findByBoardId({ board_id }) {
    const comments = await QTcommentModel.find({ board_id });
    return comments;
  }

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await QTcommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment_id }) {
    const deletedComment = await QTcommentModel.deleteOne({ _id: comment_id });
    return deletedComment;
  }
}

export { QTcomment };
