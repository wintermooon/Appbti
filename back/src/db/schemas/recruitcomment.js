import { Schema, model, Mongoose } from 'mongoose';

const RecruitcommentSchema = new Schema(
  {
    board_id: {
      type: Schema.Types.ObjectId,
      ref: 'Recruit',
    },
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RecruitcommentModel = model('Recruitcomment', RecruitcommentSchema);

export { RecruitcommentModel };
