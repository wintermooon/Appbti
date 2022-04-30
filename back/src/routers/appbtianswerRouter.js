import is from '@sindresorhus/is';
import { Router } from 'express';
// import { loginRequired } from '../middlewares/loginRequired';
import { appbtianswerService } from '../services/appbtianswerService';

const appbtianswerRouter = Router();

appbtianswerRouter.post('/appbtianswers', async (req, res, next) => {
    try {
        const { user_id, answer } = req.body;

        const newAnswer = await appbtianswerService.addAnswer({
            user_id,
            answer
          });

    if (newAnswer.errorMessage) {
       throw new Error(newAnswer.errorMessage);
    }
      
       res.status(201).json(newAnswer);
    }
    catch (error){
    next(error);
    }
});

appbtianswerRouter.get('/apptianswers/:answer_id', async (req, res, next)=> {
    try {
        const answer_id = req.params.id;

        const newResult = await appbtianswerService.getResult({
            answer_id
          });

    if (newResult.errorMessage) {
       throw new Error(newResult.errorMessage);
    }
      
       res.status(201).json(newResult);
    }
    catch (error){
    next(error);
    }
});
