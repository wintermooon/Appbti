import { Recruit, User } from '../db';

class recruitService {
  static async addPost({ userId, title, content, hashtag }) {
    const author = await User.findById({ userId });
    const newPost = { author, title, content, hashtag };
    const createdNewPost = await Recruit.create({ newPost });
    createdNewPost.errorMessage = null;
    return createdNewPost;
  }

  static async getUserPosts({ userId }) {
    const author = await User.findById({ userId });
    const posts = await Recruit.findAllByUserId({ author: author._id });
    return posts;
  }

  static async getPosts() {
    const posts = await Recruit.findAll();
    return posts;
  }

  static async setPost({ userId, post_id, toUpdate }) {
    let post = await Recruit.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (post.author.id !== userId) {
      const errorMessage = '권한이 없습니다. 자신이 작성한 게시글만 변경할 수 있습니다. ';
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

  static async deletePost({ userId, post_id }) {
    const post = await Recruit.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (post.author.id !== userId) {
      const errorMessage = '권한이 없습니다. 자신이 작성한 게시글만 삭제할 수 있습니다. ';
      return { errorMessage };
    }

    const res = await Recruit.delete({ post_id });

    return res;
  }
}

export { recruitService };
