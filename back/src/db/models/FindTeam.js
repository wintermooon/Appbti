import { FindTeamModel } from '../schemas/findteam';

class FindTeam {
  static async create({ newPost }) {
    const createdNewPost = await FindTeamModel.create(newPost);
    return createdNewPost;
  }

  static async findById({ post_id }) {
    // 변수명 수정
    const findTeamPost = await FindTeamModel.findOne({ _id: post_id }).populate('author', 'id email name');
    return findTeamPost;
  }

  static async findlike({ post_id, userId }) {
    const post = await FindTeamModel.findOne({ _id: post_id }, { likes: { $elemMatch: { $eq: userId } } });
    return post.likes;
  }

  // static async findTag({ tag }) {
  //   const posts = await FindTeamModel.find().where('tag').in(tag)
  //   return posts
   
  // }

  static async findAll(newFilter, order, { currentPage, perPage }) {
    // 변수명 변경
    const findTeamPosts = await FindTeamModel.find(newFilter) 
    .where('tag').in(newFilter.tag)
    .populate('author', 'id email name')
    .sort({ [order]: -1 })
    .skip(perPage * (currentPage -1))
    .limit(perPage);
    return findTeamPosts;
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
    return true;
  }
}

export { FindTeam };
