import { FindTeam, User } from '../db';

class findteamService {
  static async addPost({ userId, title, content, tag  }) {
    const author = await User.findById({ userId })
    const newPost = { author, title, content, tag  };
    const createdNewPost = await FindTeam.create({ newPost });
    createdNewPost.errorMessage = null;
    return createdNewPost;
  }


  static async getPosts(filter, { currentPage, perPage }) {
    let newFilter = {};
    let order;
    // let tag = '';

    if (filter.status) {
      newFilter.status = filter.status;
    }
    if (filter.tag) {
      newFilter.tag = filter.tag.split(',');
    }
    if (filter.order) {
      newFilter.order = filter.order;
    } else {
      order = 'updatedAt';
    }

    const posts = await FindTeam.findAll(newFilter, order, { currentPage, perPage });
    return posts;
  }

  static async setPostlike({ userId, post_id }) {
    const post = await FindTeam.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

  

    const like = await FindTeam.findlike({ post_id, userId });
    let status, result;
    // 이미 좋아요를 누른 상태라면?
    if (like.length != 0) {
      status = '$pull';
      result = -1;
    } else {
      status = '$push';
      result = 1;
    }
    const newValues = {
      [status]: {
        likes: userId,
      },
      $inc: { likesCount: result },
    };

  

    const res = await FindTeam.updatearray({ post_id, newValues });
    return res;
  }

  // static async getPostTag({ tag }) {
    // const post = await FindTeam.findTag({ tag });
  //   return post
  // }


  static async setPost({ userId, post_id, toUpdate }) {
    let post = await FindTeam.findById({ post_id });

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
    if (!toUpdate.tag) {
      toUpdate.tag = post.tag;
    }

    const newValues = {
      title: toUpdate.title,
      content: toUpdate.content,
      status: toUpdate.status,
      tag: toUpdate.tag,
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

  static async deletePost({ userId, post_id }) {
    const post = await FindTeam.findById({ post_id });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (post.author.id !== userId) {
      const errorMessage = '권한이 없습니다. 자신이 작성한 게시글만 삭제할 수 있습니다. ';
      return { errorMessage };
    }

    const res = await FindTeam.delete({ post_id });

    return res;
  }
}

export { findteamService };
