import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { recruitcommentService } from '../services/recruitcommentService';

const recruitcommentRouter = Router();

recruitcommentRouter.post('/recruits/:id/comments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruitcomments'] 
     #swagger.summary = '팀원 모집 게시글에 댓글 생성' 
     #swagger.description = '팀원 모집 게시글에 댓글을 생성한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const post_id = req.params.id;
    const { content } = req.body;

    const newComment = await recruitcommentService.addComment({
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

recruitcommentRouter.get('/recruits/:id/comments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruitcomments'] 
     #swagger.summary = '특정 게시글내에 있는 댓글 리스트' 
     #swagger.description = '팀원 모집 게시글내에 있는 댓글 리스트를 반환한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const comments = await recruitcommentService.getComment({
      post_id,
    });

    if (comments.errorMessage) {
      throw new Error(comments.errorMessage);
    }

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

// 특정 댓글 수정 API
recruitcommentRouter.put('/recruits/:id/comments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruitcomments'] 
     #swagger.summary = '특정 게시글내에 있는 댓글 수정' 
     #swagger.description = '팀원 모집 게시글내에 있는 댓글을 수정한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const comment_id = req.params.id;
    const content = req.body.content ?? null;

    const toUpdate = { content };
    const updatedComment = await recruitcommentService.setComment({
      userId,
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

recruitcommentRouter.delete('/recruits/:id/comments', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruitcomments'] 
     #swagger.summary = '특정 게시글내에 있는 댓글 삭제' 
     #swagger.description = '팀원 모집 게시글내에 있는 댓글을 삭제한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
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

recruitcommentRouter.get('/recruits/:userId/commentlist', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruitcomments'] 
     #swagger.summary = '특정 유저의 댓글 리스트' 
     #swagger.description = '특정 유저의 댓글 리스트를 반환한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.params.userId;
    const comments = await recruitcommentService.getCommentsById({ userId });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

export { recruitcommentRouter };
