import mongoose from 'mongoose';
import { RecruitcommentModel } from '../schemas/recruitcomment';
import { RecruitModel } from '../schemas/recruit';
import { UserModel } from '../schemas/user';

class Recruitcomment {
  static async createComment({ author, post_id, content }) {
    const newComment = { author, content };
    const createdNewComment = await RecruitcommentModel.create(newComment);
    const id = mongoose.Types.ObjectId(post_id);
    await RecruitModel.updateOne(
      { _id: id },
      {
        $push: {
          comments: createdNewComment._id,
        },
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

  static async update({ comment_id, newValues }) {
    const filter = { _id: comment_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await RecruitcommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment_id }) {
    const deletedComment = await RecruitcommentModel.deleteOne({
      _id: comment_id,
    });
    return deletedComment;
  }
}

export { Recruitcomment };
