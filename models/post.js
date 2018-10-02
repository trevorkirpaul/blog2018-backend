const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
});

const Model = mongoose.model('post', postSchema);

module.exports = Model;
