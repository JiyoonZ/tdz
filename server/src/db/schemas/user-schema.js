import { Schema } from 'mongoose';
import { shortId } from './types/short-id';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    login_path: {
      type: String,
      default: 'tdz',
    },
    role: {
      type: String,
      default: 'basic-user',
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    current_weight: {
      type: Number,
      required: true,
    },
    goal_weight: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    nutrient: {
      type: new Schema(
        {
          kcal: Number,
          carb: Number,
          protein: Number,
          fat: Number,
        },
        {
          _id: false,
        },
      ),
      required: true,
    },
    profile_image: {
      type: String,
      default: 'url',
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      default: '각오를 적어 주세요!',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export { UserSchema };
