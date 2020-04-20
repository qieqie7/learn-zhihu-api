const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String }, // 头像
  name: { type: String, required: true }, // 昵称
  gender: { type: String, enum: ['male', 'female'], default: 'male', required: true }, // 性别
  headline: { type: String }, // 一句话介绍
  locations: { type: [{ type: Schema.Types.ObjectId, ref: 'Topic' }], select: false }, // 居住地
  business: { type: Schema.Types.ObjectId, ref: 'Topic', select: false }, //所在行业
  employments: {
    type: [
      {
        company: { type: Schema.Types.ObjectId, ref: 'Topic' },
        job: { type: Schema.Types.ObjectId, ref: 'Topic' },
      },
    ],
    select: false,
  },
  educations: {
    type: [
      {
        school: { type: Schema.Types.ObjectId, ref: 'Topic' },
        major: { type: Schema.Types.ObjectId, ref: 'Topic' },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        entrance_year: { type: Number },
        graduation_year: { type: Number },
      },
    ],
    select: false,
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    select: false,
  },
});

module.exports = model('User', userSchema);
