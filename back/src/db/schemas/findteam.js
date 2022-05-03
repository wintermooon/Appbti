import { Schema, model } from 'mongoose';

const FindTeamSchema = new Schema(
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

    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FindTeamComment',
      },
    ],
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

const FindTeamModel = model('FindTeam', FindTeamSchema);

export { FindTeamModel };
