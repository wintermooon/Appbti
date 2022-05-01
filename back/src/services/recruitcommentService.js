import { Recruitcomment, User } from '../db';

class recruitcommentService {
  static async addComment({ userId, post_id, content }) {
    const author = await User.findById({ userId });
    const createdNewComment = await Recruitcomment.createComment({ author, post_id, content });
    createdNewComment.errorMessage = null;
    return createdNewComment;
  }

  // 유저가 생성한 모든 댓글
  static async getCommentsById({ userId }) {
    const author = await User.findById({ userId });
    const comments = await Recruitcomment.findByUserId({ author });
    return comments;
  }

  // 게시판 댓글
  static async getComments({ post_id }) {
    const comments = await Recruitcomment.findByPostId({ post_id });
    return comments;
  }

  // 수정
  static async setComment({ userId, comment_id, toUpdate }) {
    let comment = await Recruitcomment.findById({ comment_id });
    const author = await User.findById({ userId });
    if (!comment) {
      const errorMessage = '댓글 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    if (author.id != comment.author.id) {
      const errorMessage = '자신의 댓글만 수정할 수 있습니다.';
      return { errorMessage };
    }
    if (!toUpdate.content) {
      toUpdate.content = comment.content;
    }

    const newValues = {
      content: toUpdate.content,
    };

    comment = await Recruitcomment.update({ comment_id, newValues });

    return comment;
  }

  static async deleteComment({ comment_id }) {
    const comment = await Recruitcomment.findById({ comment_id });
    if (!comment) {
      const errorMessage = '해당 댓글이 없습니다.';
      return { errorMessage };
    }
    const deletedComment = await Recruitcomment.delete({ comment });
    return deletedComment;
  }
}

export { recruitcommentService };
