import { Schema, model } from 'mongoose';

const AppbtiAnswerSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  answer: [{
    type: String,
    required: true,
  }],
  result: [{
    type: Schema.Types.ObjectId,
    require: true,
    ref: ""
  }]
});

const AppbtiAnswerModel = model('Appbti', AppbtiAnswerSchema);

export { AppbtiAnswerModel };
