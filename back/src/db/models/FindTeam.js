import { FindTeamModel } from '../schemas/findteam';

class FindTeam {
  static async create({ newPost }) {
    const createdNewPost = await FindTeamModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    const post = await FindTeamModel.findOne({ _id: post_id }).populate('author', 'id email name');
    return post;
  }

  static async findlike({ post_id, userId }) {
    const post = await FindTeamModel.findOne({ _id: post_id }, { likes: { $elemMatch: { $eq: userId } } });
    return post.likes;
  }

  static async findTag({ tag }) {
    const posts = await FindTeamModel.find().where('tag').in(tag)
    return posts
    // tag: { $elemMatch: { $eq: tag }
  }

  static async findAll(newFilter, order) {
    const posts = await FindTeamModel.find(newFilter)
     .populate('author', 'id email name')
     .sort({ [order]: -1 });
    return posts;
  }


  static async update({ post_id, newValues }) {
    const filter = { _id: post_id };
    const update = { $set: newValues };
    const option = { returnOriginal: false };
    const updatedPost = await FindTeamModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async updatearray({ post_id, newValues }) {
    const filter = { _id: post_id };
    const update = newValues;
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
