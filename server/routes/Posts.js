const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
