import { Question } from '../db';

class questionService {
  static async addPost({ user_id, name, title, content }) {
    const newPost = { user_id, name, title, content };
    const createdNewPost = await Question.create({ newPost });
    createdNewPost.errorMessage = null;
    return createdNewPost;
  }

  static async getUserPosts({ user_id }) {
    const posts = await Question.findAllByUserId({ user_id });
    return posts;
  }

  static async getPosts({ currentPage, perPage }) {
    const posts = await Question.findAll({ currentPage, perPage })
    return posts;
  }

  static async setPost({ post_id, toUpdate }) {
    let post = await Question.findById({ post_id });

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

    const newValues = {
      title: toUpdate.title,
      content: toUpdate.content,
    };

    post = await Question.update({ post_id, newValues });
    return post;
  }

  static async getPostInfo({ post_id }) {
    const post = await Question.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return post;
  }

  static async deletePost({ post_id }) {
    const post = await Question.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const res = await Question.delete({ post_id });

    return res;
  }
}

export { questionService };
