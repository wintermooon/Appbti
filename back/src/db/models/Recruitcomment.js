import { RecruitModel } from '../schemas/recruit';

class Recruitcomment {
  static async createComment({ post_id, content, author }) {
    const createdNewComment = await RecruitModel.updateOne(
      { post_id },
      {
        $push: {
          comments: {
            content,
            author,
          },
        },
      }
    );
    return createdNewComment;
  }

  static async findById({ comment_id }) {
    const comment = await RecruitModel.findOne({ _id: comment_id });

    await RecruitModel.populate(post.comments, {
      path: 'author',
    });
    return comment;
  }

  static async findByUserId({ user_id }) {
    const comments = await RecruitModel.find({ user_id });
    return comments;
  }

  static async findByBoardId({ board_id }) {
    const comments = await RecruitModel.find({ board_id });
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
