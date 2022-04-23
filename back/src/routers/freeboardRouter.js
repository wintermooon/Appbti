import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { freeboardService } from '../services/freeboardService';

const freeboardRouter = Router();
freeboardRouter.use(loginRequired);

freeboardRouter.post('/freeboard/create', async (req, res, next) => {
  try {
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

freeboardRouter.get('/freeboard/:id', async (req, res, next) => {
  try {
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

freeboardRouter.put('/freeboard/:id', async (req, res, next) => {
  try {
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

freeboardRouter.get('/freeboardlist/:user_id', async (req, res, next) => {
  try {
    const user_id = req.params.user_id;
    const posts = await freeboardService.getUserPosts({ user_id });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.get('/freeboardlist', async (req, res, next) => {
  try {
    const posts = await freeboardService.getPosts();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

freeboardRouter.delete('/freeboard/:id', async (req, res, next) => {
  try {
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
