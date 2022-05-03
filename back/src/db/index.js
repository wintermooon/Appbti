import mongoose from 'mongoose';
import { User } from './models/User';
import { Appbti } from './models/Appbti';
import { FreeBoard } from './models/FreeBoard';
import { FreeBoardComment } from './models/FreeBoardComment';
import { FindTeam } from './models/FindTeam';
import { FindTeamComment } from './models/FindTeamComment';
import { Recruit } from './models/Recruit';
import { Recruitcomment } from './models/Recruitcomment';
import { Question } from './models/Question';
import { QTcomment } from './models/QTcomment';

const DB_URL = process.env.MONGODB_URL || '';

if (DB_URL === '') {
  throw new Error('MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.');
}

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL));
db.on('error', error => console.error('MongoDB 연결에 실패하였습니다...\n' + DB_URL + '\n' + error));

export { User, Appbti, FreeBoard, FreeBoardComment, FindTeam, FindTeamComment, Recruit, Recruitcomment, Question, QTcomment };
