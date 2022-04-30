import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { questionService } from '../services/questionService';

const questionRouter = Router();
// questionRouter.use(loginRequired);

questionRouter.post('/questions', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '질문게시판 게시글 생성' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const { user_id, name, title, content } = req.body;

    const newPost = await questionService.addPost({
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

questionRouter.get('/questions/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '게시 id에 해당하는 글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const currentPostInfo = await questionService.getPostInfo({ post_id });

    if (currentPostInfo.errorMessage) {
      throw new Error(currentPostInfo.errorMessage);
    }

    res.status(200).send(currentPostInfo);
  } catch (error) {
    next(error);
  }
});

questionRouter.put('/questions/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '게시글 수정하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { title, content };

    const updatedPost = await questionService.setPost({ post_id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

questionRouter.get('/questionlist/:user_id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '유저 id에 해당하는 모든 글 목록 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const user_id = req.params.user_id;
    const posts = await questionService.getUserPosts({ user_id });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

questionRouter.get('/questionlist', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '모든 게시글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const posts = await questionService.getPosts();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

questionRouter.delete('/questiosn/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['question'] 
     #swagger.summary = '게시글 삭제하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const deletedPost = await questionService.deletePost({ post_id });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(200).send(deletedPost);
  } catch (error) {
    next(error);
  }
});

export { questionRouter };
