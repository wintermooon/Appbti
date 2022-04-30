import { Schema, model } from 'mongoose';

const AppbtiSchema = new Schema({
  q1: {
    type: Number,
    required: true,
  },
  q2: {
    type: Number,
    required: true,
  },
  q3: {
    type: Number,
    required: true,
  },
  q4: {
    type: Number,
    required: true,
  },
  q5: {
    type: Number,
    required: true,
  },
  q6: {
    type: Number,
    required: true,
  },
  q7: {
    type: Number,
    required: true,
  },
});

const AppbtiModel = model('Appbti', AppbtiSchema);

export { AppbtiModel };
