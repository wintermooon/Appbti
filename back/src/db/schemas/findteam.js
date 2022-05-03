import { Schema, model } from 'mongoose';

const FindTeamSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // 기술 스택
    stack: {
        type: String,
        required: true,
      },

    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FTComment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FindTeamModel = model('FindTeam', FindTeamSchema);

export { FindTeamModel };
