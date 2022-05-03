import { Schema, model } from 'mongoose';

const AppbtiAnswerSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    result: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const AppbtiAnswerModel = model('AppbtiAnswer', AppbtiAnswerSchema);

export { AppbtiAnswerModel };
