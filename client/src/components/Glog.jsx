import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Glog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By {post.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Glog;
