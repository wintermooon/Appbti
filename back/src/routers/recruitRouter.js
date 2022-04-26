import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { recruitService } from '../services/recruitService';

const recruitRouter = Router();

recruitRouter.post('/recruits', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '팀원 모집 게시글 생성' 
     #swagger.description = '팀원 모집 게시글 생성한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */

    const user_id = req.currentUserId;

    const { name, title, content, hashtag } = req.body;

    const newPost = await recruitService.addPost({
      user_id,
      name,
      title,
      content,
      hashtag,
    });

    if (newPost.errorMessage) {
      throw new Error(newPost.errorMessage);
    }

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

recruitRouter.get('/recruits/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '게시글 id에 해당하는 게시글 정보 가져오기' 
     #swagger.description = '특정 게시글 정보 가져오기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const currentPostInfo = await recruitService.getPostInfo({ post_id });

    if (currentPostInfo.errorMessage) {
      throw new Error(currentPostInfo.errorMessage);
    }
    console.log(currentPostInfo);
    res.status(200).send(currentPostInfo);
  } catch (error) {
    next(error);
  }
});

recruitRouter.put('/recruits/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '게시글 수정하기' 
     #swagger.description = '팀원 모집 게시글을 수정한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;
    const status = req.body.status ?? null;
    const hashtag = req.body.hashtag ?? null;

    const toUpdate = { title, content, status, hashtag };

    const updatedPost = await recruitService.setPost({ post_id, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

recruitRouter.get('/recruitlist/:user_id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '특정 user의 게시글 확인하기' 
     #swagger.description = '특정 user의 게시글 확인하기' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const user_id = req.params.user_id;
    const posts = await recruitService.getUserPosts({ user_id });
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

recruitRouter.get('/recruitlist', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '게시글 목록' 
     #swagger.description = '전체 게시글 목록' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const posts = await recruitService.getPosts();
    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

recruitRouter.delete('/recruits/:id', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['recruit'] 
     #swagger.summary = '팀원 모집 게시글 삭제' 
     #swagger.description = '팀원 모집 게시글 삭제한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    const post_id = req.params.id;
    const deletedPost = await recruitService.deletePost({ post_id });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(200).send(deletedPost);
  } catch (error) {
    next(error);
  }
});

export { recruitRouter };
