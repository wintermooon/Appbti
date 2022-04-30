import { Schema, model, Mongoose } from 'mongoose';

const FreeBoardCommentSchema = new Schema(
  {
    board_id: {
      type: Schema.Types.ObjectId,
      ref: 'FreeBoard',
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

const FreeBoardCommentModel = model('FreeBoardComment', FreeBoardCommentSchema);

export { FreeBoardCommentModel };
