import { FreeBoardModel } from '../schemas/freeboard';

class FreeBoard {
  static async create({ newPost }) {
    const createdNewPost = await FreeBoardModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    const post = await FreeBoardModel.findOne({ _id: post_id }).populate('comment', 'content');
    return post;
  }

  static async findAll() {
    const posts = await FreeBoardModel.find({}).sort({ updatedAt: -1 });
    return posts;
  }

  static async findAllByUserId({ user_id }) {
    const posts = await FreeBoardModel.find({ user_id: user_id }).sort({ updatedAt: -1 });
    return posts;
  }

  static async update({ post_id, newValues }) {
    const filter = { _id: post_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const updatedPost = await FreeBoardModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ post_id }) {
    await FreeBoardModel.deleteOne({ _id: post_id });
    return '삭제가 완료되었습니다.';
  }
}

export { FreeBoard };
