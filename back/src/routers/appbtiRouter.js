import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired';

const appbtiRouter = Router();

appbtiRouter.post('/appbti/1'), async (req, res, next) => {
    try {
        const { q1 } = req.body
        const newAnswer = await appbtiService.addAnswer({
            q1
        })
    }
};

appbtiRouter.post('/appbti/2'), async (req, res, next) => {};

appbtiRouter.post('/appbti/3'), async (req, res, next) => {};

appbtiRouter.post('/appbti/4'), async (req, res, next) => {};

appbtiRouter.post('/appbti/5'), async (req, res, next) => {};

appbtiRouter.post('/appbti/6'), async (req, res, next) => {};

appbtiRouter.post('/appbti/7'), async (req, res, next) => {};
