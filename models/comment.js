const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  parentPost: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    require: true,
  },
});

const Model = mongoose.model('comment', commentSchema);

module.exports = Model;
