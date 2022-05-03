import { FindTeamComment, User } from '../db';

class findteamcommentService {
  static async addComment({ userId, post_id, content }) {
    const author = await User.findById({ userId });
    const createdNewComment = await FindTeamComment.createComment({ author, post_id, content });
    createdNewComment.errorMessage = null;
    return createdNewComment;
  }


  // 유저가 생성한 모든 댓글
  static async getCommentsByUserId({ userId }) {
    const author = await User.findById({ userId });
    const comments = await FindTeamComment.findByUserId({ author });
    return comments;
  }

  // 게시글의 모든 댓글
  static async getComments({ post_id }) {
    const comments = await FindTeamComment.findByPostId({ post_id });
    return comments;
  }

  // 수정
  static async setComment({ userId, comment_id, toUpdate }) {
    let comment = await FindTeamComment.findByIdWithAuthor({ comment_id });
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

    comment = await FindTeamComment.update({ comment_id, newValues });

    return comment;
  }

  static async deleteComment({ comment_id }) {
    const comment = await FindTeamComment.findById({ comment_id });
    if (!comment) {
      const errorMessage = '해당 댓글이 없습니다.';
      return { errorMessage };
    }
    const deletedComment = await FindTeamComment.delete({ comment });
    return deletedComment;
  }
}

export { findteamcommentService };
