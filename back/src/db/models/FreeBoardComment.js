import { FreeBoardCommentModel } from '../schemas/freeboardcomment';

class FreeBoardComment {
  static async createComment({ newComment }) {
    const createdNewComment = await FreeBoardCommentModel.create(newComment);
    return createdNewComment;
  }

  static async findById({ comment_id }) {
    const comment = await FreeBoardCommentModel.findOne({ _id: comment_id });
    return comment;
  }

  static async findByUserId({ user_id }) {
    const comments = await FreeBoardCommentModel.find({ user_id });
    return comments;
  }

  static async findByBoardId({ board_id }) {
    const comments = await FreeBoardCommentModel.find({ board_id });
    return comments;
  }

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await FreeBoardCommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment_id }) {
    const deletedComment = await FreeBoardCommentModel.deleteOne({ _id: comment_id });
    return deletedComment;
  }
}

export { FreeBoardComment };
