import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// CORS 에러 방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요.');
});

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
