import { Schema, model } from 'mongoose';

const AppbtiResultSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    answers: {
      type: String,
      required: true,
    },
    result: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const AppbtiResultModel = model('AppbtiResult', AppbtiResultSchema);

export { AppbtiResultModel };
