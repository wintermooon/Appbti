import mongoose from 'mongoose';
import { RecruitcommentModel } from '../schemas/recruitcomment';
import { RecruitModel } from '../schemas/recruit';
import { UserModel } from '../schemas/user';

class Recruitcomment {
  static async createComment({ author, post_id, content }) {
    const newComment = { author, post_id, content };
    const createdNewComment = await RecruitcommentModel.create(newComment);
    const id = mongoose.Types.ObjectId(post_id);
    await RecruitModel.findOneAndUpdate(
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

  static async findById({ comment_id }) {
    const comment = await RecruitcommentModel.findOne({ _id: comment_id });

    await UserModel.populate(comment, {
      path: 'author',
      select: 'id email name',
    });

    return comment;
  }

  static async findByUserId({ author }) {
    const comments = await RecruitcommentModel.find({ author });
    return comments;
  }

  static async findByPostId({ post_id }) {
    const comments = await RecruitcommentModel.find({ post_id });
    return comments;
  }

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await RecruitcommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment }) {
    const deletedComment = await RecruitcommentModel.deleteOne({
      _id: comment._id,
    });
    await RecruitModel.findOneAndUpdate(
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

export { Recruitcomment };
