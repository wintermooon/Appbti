import { Schema, model } from 'mongoose';

const RecruitSchema = new Schema(
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
    status: {
      type: Boolean,
      required: false,
      default: false,
    },
    hashtag: {
      type: Array,
      required: false,
      default: [],
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recruitcomment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const RecruitModel = model('Recruit', RecruitSchema);

export { RecruitModel };
