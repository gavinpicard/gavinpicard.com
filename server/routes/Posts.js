const express = require('express');
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post('/posts', upload.single('image'), async (req, res) => {
  const { title, lead, content, author } = req.body;
  const filePath = req.file ? `uploads/${req.file.filename}` : null;

  try {
    const newPost = new Post({ image: filePath, title, lead, content, author });
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
