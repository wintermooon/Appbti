import { Recruit } from '../db';

class recruitService {
  static async addPost({ user_id, name, title, content, hashtag }) {
    const newPost = { user_id, name, title, content, hashtag };
    const createdNewPost = await Recruit.create({ newPost });
    createdNewPost.errorMessage = null;
    return createdNewPost;
  }

  static async getUserPosts({ user_id }) {
    const posts = await Recruit.findAllByUserId({ user_id });
    return posts;
  }

  static async getPosts() {
    const posts = await Recruit.findAll();
    return posts;
  }

  static async setPost({ post_id, toUpdate }) {
    let post = await Recruit.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    if (!toUpdate.title) {
      toUpdate.title = post.title;
    }
    if (!toUpdate.content) {
      toUpdate.content = post.content;
    }
    if (!toUpdate.status) {
      toUpdate.status = post.status;
    }
    if (!toUpdate.hashtag) {
      toUpdate.hashtag = post.hashtag;
    }

    const newValues = {
      title: toUpdate.title,
      content: toUpdate.content,
      status: toUpdate.status,
      hashtag: toUpdate.hashtag,
    };

    post = await Recruit.update({ post_id, newValues });
    return post;
  }

  static async getPostInfo({ post_id }) {
    const post = await Recruit.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return post;
  }

  static async deletePost({ post_id }) {
    const post = await Recruit.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await Recruit.delete({ post_id });

    return res;
  }
}

export { recruitService };
