import { Comment } from '../db';

class commentService {
  static async addComment({ board_id, user_id, name, content }) {
    const newComment = { board_id, user_id, name, content };
    const createdNewComment = await Comment.createComment({ newComment });
    createdNewComment.errorMessage = null;
    return createdNewComment;
  }

  static async getComment({ comment_id }) {
    const comment = await Comment.findById({ comment_id });

    if (!comment) {
      const errorMessage = '해당 댓글 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return comment;
  }

  // 유저가 생성한 모든 댓글
  static async getCommentsById({ user_id }) {
    const comments = await Comment.findByUserId({ user_id });
    return comments;
  }

  // 게시글의 모든 댓글
  static async getCommentsByBoardId({ board_id }) {
    const comments = await Comment.findByBoardId({ board_id });
    return comments;
  }

  // 수정
  static async setComment({ comment_id, toUpdate }) {
    let comment = await Comment.findById({ comment_id });

    if (!comment) {
      const errorMessage = '댓글 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!toUpdate.board_id) {
      toUpdate.board_id = comment.board_id;
    }

    if (!toUpdate.user_id) {
      toUpdate.user_id = comment.user_id;
    }

    if (!toUpdate.name) {
      toUpdate.name = comment.name;
    }

    if (!toUpdate.content) {
      toUpdate.content = comment.content;
    }

    if (!toUpdate.created_at) {
      toUpdate.created_at = comment.created_at;
    }

    const newValues = {
      board_id: toUpdate.board_id,
      user_id: toUpdate.user_id,
      name: toUpdate.name,
      content: toUpdate.content,
      created_at: toUpdate.created_at,
    };

    comment = await Comment.update({ comment_id, newValues });

    return comment;
  }

  static async deleteComment({ comment_id }) {
    const comment = await Comment.findById({ comment_id });
    if (!comment) {
      const errorMessage = '해당 댓글이 없습니다.';
      return { errorMessage };
    }
    const deletedComment = await Comment.delete({ comment_id });
    return deletedComment;
  }
}

export { commentService };
