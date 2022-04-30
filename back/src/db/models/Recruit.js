import { RecruitModel } from '../schemas/recruit';
import { UserModel } from '../schemas/user';

class Recruit {
  static async create({ newPost }) {
    const createdNewPost = await RecruitModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    const post = await RecruitModel.findOne({ _id: post_id }).populate('author', 'id email name');

    return post;
  }

  static async findAll(newFilter, order) {
    const posts = await RecruitModel.find(newFilter)
      .populate('author', 'id email name')
      .sort({ [order]: -1 });
    return posts;
  }

  static async update({ post_id, newValues }) {
    const filter = { _id: post_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedPost = await RecruitModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ post_id }) {
    await RecruitModel.deleteOne({ _id: post_id });
    return '삭제가 완료되었습니다.';
  }
}

export { Recruit };
