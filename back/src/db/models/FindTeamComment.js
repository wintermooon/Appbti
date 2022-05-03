import mongoose from 'mongoose';
import { FindTeamCommentModel } from '../schemas/findteamcomment';
import { FindTeamModel } from '../schemas/findteam';
import { UserModel } from '../schemas/user'

class FindTeamComment {
  static async createComment({ author, post_id, content }) {
    const newComment = { author, post_id, content };
    const createdNewComment = await FindTeamCommentModel.create(newComment);
    const id = mongoose.Types.ObjectId(post_id);
    await FindTeamModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comments: createdNewComment._id,
        },
        $inc: { commentsCount: 1 },
      }
    );
    return createdNewComment;
  }

  // 함수명 변경
  static async findByIdWithAuthor({ comment_id }) {
    const comment = await FindTeamCommentModel.findOne({ _id: comment_id });

    await UserModel.populate(comment, {
      path: 'author',
      select: 'id email name',
    });

    return comment;
  }

  static async findByUserId({ author }) {
    const comment = await FindTeamCommentModel.find({ author });
    return comment;
  }

  static async findByPostId({ post_id }) {
    const comments = await FindTeamCommentModel.find({ post_id });
    return comments;
  }

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await FindTeamCommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment }) {
    const deletedComment = await FindTeamCommentModel.deleteOne({
      _id: comment._id,
    });
    await FindTeamModel.findOneAndUpdate(
      { _id: comment.post_id },
      {
        $pull: {
          comments: comment._id,
        },
        $inc: { commentsCount: -1 },
      }
    );

    return deletedComment;
  }
}

export { FindTeamComment };
