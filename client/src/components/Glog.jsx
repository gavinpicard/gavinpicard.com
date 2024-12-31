import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import '../styles/Glog.css';
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
      <CreatePost />
      <div className="posts-container">
        {posts.map(post => (
          <div className="post-cover" key={post._id}>
            <img src={`http://localhost:8080/${post.image}`}/>
            <h2>{post.title}</h2>
            <p>{post.lead}</p>
            <p>By {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Glog;
