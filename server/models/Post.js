const mongoose = require('mongoose');

const postSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
},
content: { 
    type: String, 
    required: true, 
    trim: true
},
image: String,
title: {
  type: String,
  required: true
},
createdAt: {
  type: Date,
  default: Date.now,
},

  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;