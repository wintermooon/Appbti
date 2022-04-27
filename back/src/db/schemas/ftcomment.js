import { Schema, model, Mongoose } from 'mongoose';

const FTCommentSchema = new Schema(
  {
    board_id: {
      type: Schema.Types.ObjectId,
      ref: 'FindTeam',
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

const FTCommentModel = model('FTComment', FTCommentSchema);

export { FTCommentModel };
