import { Schema, model, Mongoose } from 'mongoose';

const FindTeamCommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
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

const FindTeamCommentModel = model('FindTeamComment', FindTeamCommentSchema);

export { FindTeamCommentModel };
