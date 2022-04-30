import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { qtcommentService } from '../services/qtcommentService';

const qtcommentRouter = Router();
// qtcommentRouter.use(loginRequired);

qtcommentRouter.post('/questions/comments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['qeustioncomment'] 
     #swagger.summary = '질문게시판 게시글에 댓글 생성' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const { board_id, user_id, name, content } = req.body;

    const newComment = await qtcommentService.addComment({
      board_id,
      user_id,
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

// 특정 댓글 조회 API
qtcommentRouter.get('/questions/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['questioncomment'] 
     #swagger.summary = '댓글 id에 해당하는 댓글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const comment_id = req.params.id;
    const currentComment = await qtcommentService.getComment({ comment_id });

    if (currentComment.errorMessage) {
      throw new Error(currentComment.errorMessage);
    }

    res.status(200).send(currentComment);
  } catch (error) {
    next(error);
  }
});

// 특정 댓글 수정 API
qtcommentRouter.put('/questions/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['questioncomment'] 
     #swagger.summary = '댓글 수정하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const comment_id = req.params.id;
    const board_id = req.body.board_id ?? null;
    const user_id = req.body.user_id ?? null;
    const name = req.body.name ?? null;
    const content = req.body.content ?? null;
    const created_at = req.body.created_at ?? null;

    const toUpdate = { board_id, user_id, name, content, created_at };

    const updatedComment = await qtcommentService.setComment({ comment_id, toUpdate });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

qtcommentRouter.delete('/questions/comments/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['questioncomment'] 
     #swagger.summary = '댓글 삭제하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const comment_id = req.params.id;
    const deletedComment = await qtcommentService.deleteComment({
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

qtcommentRouter.get('/quedstions/usercommentlist/:user_id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['questioncomment'] 
     #swagger.summary = '유저 id의 모든 작성 댓글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const user_id = req.params.user_id;
    const comments = await qtcommentService.getCommentsById({ user_id });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

qtcommentRouter.get('/questions/boardcommentlist/:board_id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['questioncomment'] 
     #swagger.summary = '게시글의 모든 댓글 목록 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const board_id = req.params.board_id;
    const comments = await qtcommentService.getCommentsByBoardId({ board_id });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});
export { qtcommentRouter };
