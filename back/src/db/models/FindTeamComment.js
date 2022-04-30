import { FindTeamCommentModel } from '../schemas/findteamcomment';

class FindTeamComment {
  static async createComment({ newComment }) {
    const createdNewComment = await FindTeamCommentModel.create(newComment);
    return createdNewComment;
  }

  static async findById({ comment_id }) {
    const comment = await FindTeamCommentModel.findOne({ _id: comment_id });
    return comment;
  }

  static async findByUserId({ user_id }) {
    const comments = await FindTeamCommentModel.find({ user_id });
    return comments;
  }

  static async findByBoardId({ board_id }) {
    const comments = await FindTeamCommentModel.find({ board_id });
    return comments;
  }

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await FindTeamCommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment_id }) {
    const deletedComment = await FindTeamCommentModel.deleteOne({ _id: comment_id });
    return deletedComment;
  }
}

export { FindTeamComment };
