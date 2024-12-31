const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  image: { type: String, required: false },
  title: { type: String, required: true },
  lead: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
