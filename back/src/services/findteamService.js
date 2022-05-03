import { FindTeam } from '../db';

class findteamService {
  static async addPost({ user_id, name, title, content, stack }) {
    const newPost = { user_id, name, title, content, stack };
    const createdNewPost = await FindTeam.create({ newPost });
    createdNewPost.errorMessage = null;
    return createdNewPost;
  }

  static async getUserPosts({ user_id }) {
    const posts = await FindTeam.findAllByUserId({ user_id });
    return posts;
  }

  static async getPosts() {
    const posts = await FindTeam.findAll();
    return posts;
  }

  static async setPost({ post_id, toUpdate }) {
    let post = await FindTeam.findById({ post_id });

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
    if (!toUpdate.stack) {
        toUpdate.stack = post.stack;
      }

    const newValues = {
      title: toUpdate.title,
      content: toUpdate.content,
      stack: toUpdate.stack,
    };

    post = await FindTeam.update({ post_id, newValues });
    return post;
  }

  static async getPostInfo({ post_id }) {
    const post = await FindTeam.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return post;
  }

  static async deletePost({ post_id }) {
    const post = await FindTeam.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await FindTeam.delete({ post_id });

    return res;
  }
}

export { findteamService };
