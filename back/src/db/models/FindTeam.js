import { FindTeamModel } from '../schemas/findteam';

class FindTeam {
  static async create({ newPost }) {
    const createdNewPost = await FindTeamModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    const post = await FindTeamModel.findOne({ _id: post_id })
    return post;
  }

  static async findAll() {
    const posts = await FindTeamModel.find({}).sort({ updatedAt: -1 });
    return posts;
  }

  static async findAllByUserId({ user_id }) {
    const posts = await FindTeamModel.find({ user_id: user_id }).sort({ updatedAt: -1 });
    return posts;
  }

  static async update({ post_id, newValues }) {
    const filter = { _id: post_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedPost = await FindTeamModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ post_id }) {
    await FindTeamModel.deleteOne({ _id: post_id });
    return '삭제가 완료되었습니다.';
  }
}

export { FindTeam };
