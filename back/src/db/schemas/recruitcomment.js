import { Schema, model, Mongoose } from 'mongoose';

const RecruitcommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
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
