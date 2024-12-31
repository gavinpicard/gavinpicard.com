import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [lead, setLead] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('title', title);
    formData.append('lead', lead);
    formData.append('content', content);
    formData.append('author', author);
    try {
      await axios.post('http://localhost:8080/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created successfully!');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" width="48" height="48" onChange={e => setImage(e.target.files[0])} />
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="lead" value={lead} onChange={e => setLead(e.target.value)} required />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default CreatePost;
