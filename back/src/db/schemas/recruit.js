import { Schema, model } from 'mongoose';

const RecruitSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
    status: {
      type: String,
      required: false,
      default: 'unrecruited',
    },
    tag: {
      type: Array,
      required: false,
      default: [],
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Recruitcomment' }],
    commentsCount: {
      type: Number,
      default: 0,
    },
    likes: [{ type: String }],
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const RecruitModel = model('Recruit', RecruitSchema);

export { RecruitModel };
