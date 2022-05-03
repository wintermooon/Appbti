import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { findteamcommentService } from '../services/findteamcommentService';

const findteamcommentRouter = Router();
// ftcommentRouter.use(loginRequired);

findteamcommentRouter.post('/findteamcomments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteamcomment'] 
     #swagger.summary = '팀 찾기 게시글에 댓글 생성' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const post_id = req.query.post_id;
    const { content } = req.body;

    const newComment = await findteamcommentService.addComment({
      userId,
      post_id,
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


// 특정 댓글 수정 API
findteamcommentRouter.put('/findteamcomments/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteamcomment'] 
     #swagger.summary = '댓글 수정하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const comment_id = req.params.id;
    const content = req.body.content ?? null;

    const toUpdate = { content };

    const updatedComment = await findteamcommentService.setComment({ userId, comment_id, toUpdate });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

findteamcommentRouter.delete('/findteamcomments/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteamcomment'] 
     #swagger.summary = '댓글 삭제하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const comment_id = req.params.id;
    const deletedComment = await findteamcommentService.deleteComment({
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

findteamcommentRouter.get('/findteamcomments/:userId', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteamcomment'] 
     #swagger.summary = '유저 id가 작성한 댓글 목록 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.params.userId;
    const comments = await findteamcommentService.getCommentsByUserId({ userId });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

findteamcommentRouter.get('/findteamcomments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteamcomment'] 
     #swagger.summary = '게시글의 모든 댓글 목록 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.query.post_id;
    const comments = await findteamcommentService.getComments({ post_id });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});
export { findteamcommentRouter };
