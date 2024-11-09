import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, content, author };
    try {
      await axios.post('http://localhost:8080/api/posts', newPost);
      alert('Post created successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
