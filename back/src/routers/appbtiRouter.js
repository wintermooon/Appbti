import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';
import { appbtiService } from '../services/appbtiService';

const appbtiRouter = Router();

appbtiRouter.post('/appbti', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['Appbti'] 
     #swagger.summary = 'appbti 결과 생성, 답변을 body로 받음' 
     #swagger.description = 'appbti 테스트 결과를 등록한다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    // req (request) 에서 데이터 가져오기
    const userId = req.currentUserId;
    const answers = req.body.answers;

    // 데이터를 유저 db에 추가하기
    const newresult = await appbtiService.addResult({ userId, answers });

    if (newresult.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newresult);
  } catch (error) {
    next(error);
  }
});

appbtiRouter.get('/appbti', loginRequired, async (req, res, next) => {
  try {
    /*
     #swagger.tags = ['Appbti'] 
     #swagger.summary = 'appbti 결과 보여줌' 
     #swagger.description = 'appbti 테스트 결과를 보내준다.' 
     #swagger.security = [{ "bearerAuth": [] }]
    */

    const userId = req.currentUserId;
    const appbtiresult = await appbtiService.getAppbtiResult({ userId });

    if (appbtiresult.errorMessage) {
      throw new Error(appbtiresult.errorMessage);
    }
    res.status(200).send(appbtiresult);
  } catch (error) {
    next(error);
  }
});

export { appbtiRouter };
