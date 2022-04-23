import { Schema, model } from 'mongoose';

const FreeBoardSchema = new Schema(
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

    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FreeBoardModel = model('FreeBoard', FreeBoardSchema);

export { FreeBoardModel };
