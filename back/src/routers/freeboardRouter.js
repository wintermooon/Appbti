import is from '@sindresorhus/is';
import { Router } from 'express';
import { FreeBoard } from '../db';
import { loginRequired } from '../middlewares/loginRequired';
import { freeboardService } from '../services/freeboardService';

const freeboardRouter = Router();
// freeboardRouter.use(loginRequired);

freeboardRouter.post('/freeboards', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '자유게시판 게시글 생성' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const { user_id, name, title, content } = req.body;

    const newPost = await freeboardService.addPost({
      user_id,
      name,
      title,
      content,
    });

    if (newPost.errorMessage) {
      throw new Error(newPost.errorMessage);
    }

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.get('/freeboards/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '게시글 id로 게시글 정보 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const currentPostInfo = await freeboardService.getPostInfo({ post_id });

    if (currentPostInfo.errorMessage) {
      throw new Error(currentPostInfo.errorMessage);
    }

    res.status(200).send(currentPostInfo);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.put('/freeboards/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '게시글 수정하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { title, content };

    const updatedPost = await freeboardService.setPost({ post_id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.get('/freeboardlist/:user_id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '유저 id에 해당하는 모든 게시글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const user_id = req.params.user_id;
    const posts = await freeboardService.getUserPosts({ user_id });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.get('/freeboardlist', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '모든 게시글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const currentPage = req.query.page || 1;
    const perPage = 6;

    const posts = await freeboardService.getPosts({ currentPage, perPage });


    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.delete('/freeboards/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['freeboard'] 
     #swagger.summary = '게시글 삭제하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const deletedPost = await freeboardService.deletePost({ post_id });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(200).send(deletedPost);
  } catch (error) {
    next(error);
  }
});

export { freeboardRouter };
