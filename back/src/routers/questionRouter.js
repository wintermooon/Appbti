import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { questionService } from '../services/questionService';

const questionRouter = Router();
// questionRouter.use(loginRequired);

questionRouter.post('/question/create', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
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

questionRouter.get('/question/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
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

questionRouter.put('/question/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
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
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const user_id = req.params.user_id;
    const posts = await questionService.getUserPosts({ user_id });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

questionRouter.get('/questionlist', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
    const posts = await questionService.getPosts();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

questionRouter.delete('/question/:id', loginRequired, async (req, res, next) => {
  try {
    /* #swagger.security = [{
         "bearerAuth": []
    }] */
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
