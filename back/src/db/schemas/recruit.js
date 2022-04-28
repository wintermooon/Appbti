import { Schema, model } from 'mongoose';

const RecruitSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'unrecruited',
    },
    hashtag: {
      type: Array,
      required: false,
      default: [],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Recruitcomment' }],
  },
  {
    timestamps: true,
  }
);

const RecruitModel = model('Recruit', RecruitSchema);

export { RecruitModel };
