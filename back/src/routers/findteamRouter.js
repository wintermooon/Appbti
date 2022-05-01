import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { findteamService } from '../services/findteamService';

const findteamRouter = Router();
// findteamRouter.use(loginRequired);

// 특정 글 조회 API
findteamRouter.post('/findteams', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '팀 찾기 게시글에 글 생성' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const { title, content, tag } = req.body;

    const newPost = await findteamService.addPost({
      userId,
      title,
      content,
      tag,
    });

    if (newPost.errorMessage) {
      throw new Error(newPost.errorMessage);
    }

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// 특정 글 조회 API
findteamRouter.get('/findteams/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '게시글 id에 해당하는 글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const currentPostInfo = await findteamService.getPostInfo({ post_id });

    if (currentPostInfo.errorMessage) {
      throw new Error(currentPostInfo.errorMessage);
    }

    res.status(200).send(currentPostInfo);
  } catch (error) {
    next(error);
  }
});

findteamRouter.put('/findteams/:id/likes', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '좋아요' 
     #swagger.description = '좋아요!' 
     #swagger.security = [{ "bearerAuth": [] }]
    */

    const userId = req.currentUserId;
    const post_id = req.params.id;

    const like = await findteamService.setPostlike({ userId, post_id });
    res.status(200).send(like);
  } catch (error) {
    next(error);
  }
});

findteamRouter.get('/findteamstag', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '태그 필터' 
     #swagger.security = [{ "bearerAuth": [] }]
    */

    const tag = req.query.tag.split(',');

    const posts = await findteamService.getPostTag({ tag })
    res.status(200).send(posts)

  } catch (error) {
    next(error);
  }
})


// 특정 글 수정 API
findteamRouter.put('/findteams/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '게시글 수정하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */

    const userId = req.currentUserId;
    const post_id = req.params.id;
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;
    const status = req.body.status ?? null;
    const tag = req.body.hashtag ?? null;

    const toUpdate = { title, content, status, tag };

    const updatedPost = await findteamService.setPost({ userId, post_id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});


// findteam 게시판의 모든 글
findteamRouter.get('/findteams', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '모든 게시글 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const status = req.query.status ?? null;
    const order = req.query.order ?? null;
    const tag = req.query.tag ?? null;
    const filter = { status, order, tag };
    const posts = await findteamService.getPosts(filter);
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

// 특정 글 삭제 API
findteamRouter.delete('/findteams/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['findteam'] 
     #swagger.summary = '게시글 삭제하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const userId = req.currentUserId;
    const post_id = req.params.id;
    const deletedPost = await findteamService.deletePost({ userId, post_id });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(200).send(deletedPost);
  } catch (error) {
    next(error);
  }
});

export { findteamRouter };
