import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { recruitcommentService } from '../services/recruitcommentService';

const recruitcommentRouter = Router();

recruitcommentRouter.post('/recruits/comment', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
      }] */
    const user_id = req.currentUserId;
    const { board_id, name, content } = req.body;

    const newComment = await recruitcommentService.addComment({
      user_id,
      board_id,
      name,
      content,
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

recruitcommentRouter.get('/recruits/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const comment_id = req.params.id;
    const currentComment = await recruitcommentService.getComment({
      comment_id,
    });

    if (currentComment.errorMessage) {
      throw new Error(currentComment.errorMessage);
    }

    res.status(200).send(currentComment);
  } catch (error) {
    next(error);
  }
});

// 특정 댓글 수정 API
recruitcommentRouter.put('/recruits/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const user_id = req.currentUserId;
    const comment_id = req.params.id;
    const board_id = req.body.board_id ?? null;
    const name = req.body.name ?? null;
    const content = req.body.content ?? null;
    const created_at = req.body.created_at ?? null;

    const toUpdate = { board_id, user_id, name, content, created_at };

    const updatedComment = await recruitcommentService.setComment({
      comment_id,
      toUpdate,
    });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

recruitcommentRouter.delete('/recruits/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const comment_id = req.params.id;
    const deletedComment = await recruitcommentService.deleteComment({
      comment_id,
    });
    if (deletedComment.errorMessage) {
      throw new Error(deletedComment.errorMessage);
    }
    res.status(200).send(deletedComment);
  } catch (error) {
    next(error);
  }
});

recruitcommentRouter.get('/recruit/usercommentlist/:user_id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const user_id = req.params.user_id;
    const comments = await recruitcommentService.getCommentsById({ user_id });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

recruitcommentRouter.get('/recruit/boardcommentlist/:board_id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const board_id = req.params.board_id;
    const comments = await recruitcommentService.getCommentsByBoardId({
      board_id,
    });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});
export { recruitcommentRouter };
