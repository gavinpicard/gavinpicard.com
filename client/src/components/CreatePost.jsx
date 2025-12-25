import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown';
import { API_ENDPOINTS } from '../config/api';

function CreatePost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.post;
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [lede, setLede] = useState('');
  const [content, setContent] = useState('# Test');
  const [tags, setTags] = useState('');

  // Check if user is authenticated
  useEffect(() => {
    const apiKey = localStorage.getItem('admin_api_key');
    if (!apiKey) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Populate form if editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setSlug(editingPost.slug || '');
      setLede(editingPost.lede || '');
      setContent(editingPost.content || '');
      if (editingPost.tags && Array.isArray(editingPost.tags)) {
        setTags(editingPost.tags.join(', '));
      } else {
        setTags('');
      }
    }
  }, [editingPost]);

  const savePost = () => {
    const apiKey = localStorage.getItem('admin_api_key');
    if (!apiKey) {
      alert('You are not authenticated. Please log in first.');
      navigate('/admin/login');
      return;
    }

    const formData = new FormData();
    if (image) formData.append('image', image);
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('lede', lede);
    formData.append('content', content);
    // Send tags as comma-separated string (server will parse and convert to JSON)
    formData.append('tags', tags);

    const isEditing = !!editingPost;
    const endpoint = isEditing ? API_ENDPOINTS.UPDATE_POST(editingPost.id) : API_ENDPOINTS.POSTS;
    const method = isEditing ? 'put' : 'post';

    // Note: Don't set Content-Type for FormData - axios sets it automatically with boundary
    axios[method](endpoint, formData, {
      headers: {
        'X-API-Key': apiKey
      }
    })
      .then(() => {
        if (!isEditing) {
          setTitle('');
          setSlug('');
          setLede('');
          setContent('# Test');
          setImage(null);
          setTags('');
        }
        // Redirect to glog page after successful save
        navigate('/glog');
      })
      .catch(err => {
        console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, err);
        if (err.response?.status === 401) {
          alert('Authentication failed. Please log in again.');
          localStorage.removeItem('admin_api_key');
          navigate('/admin/login');
        } else {
          alert(`Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`);
        }
      });
  };

  return (
    <div className="flex flex-col mt-20 mb-10 lg:flex-row w-[90%] max-w-5xl mx-auto py-8 sm:py-12 gap-6 sm:gap-8">
      {/* Editor Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 sm:mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-custom-white">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={() => {
              localStorage.removeItem('admin_api_key');
              navigate('/admin/login');
            }}
            className="px-4 py-2 text-sm bg-background-tertiary text-custom-gray rounded-lg hover:bg-background-tertiary hover:text-custom-white transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm sm:text-base"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Slug
            </label>
            <input
              type="text"
              placeholder="post-url-slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm sm:text-base"
            />
            <p className="mt-2 text-xs text-custom-gray">URL-friendly identifier (e.g., "my-awesome-post")</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Lede
            </label>
            <input
              type="text"
              placeholder="A short summary or introduction to your post..."
              value={lede}
              onChange={e => setLede(e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm sm:text-base"
            />
            <p className="mt-2 text-xs text-custom-gray">Short summary that appears under the title in previews</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="java, politics, react"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="w-full px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm sm:text-base"
            />
            <p className="mt-2 text-xs text-custom-gray">Separate multiple tags with commas (e.g., java, politics, react)</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Cover Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={e => setImage(e.target.files[0])}
                className="w-full px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal file:text-custom-white file:cursor-pointer hover:file:bg-green transition-all cursor-pointer text-sm sm:text-base"
              />
              {image && (
                <p className="mt-2 text-sm text-teal">Selected: {image.name}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              Content (Markdown)
            </label>
            <textarea
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[480px] px-4 py-3 bg-background-secondary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all font-mono text-sm resize-none"
              placeholder="# Your Markdown Content Here

Write your blog post content using Markdown syntax..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          
          <button 
            onClick={savePost}
            className="w-full py-3 px-6 bg-teal text-custom-white font-semibold rounded-lg hover:bg-green transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background-primary text-sm sm:text-base"
          >
            {editingPost ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-1/2">
        <div className="sticky top-4 sm:top-8">
          <h3 className="text-xl sm:text-2xl font-bold text-custom-white mb-4 pb-4 border-b border-background-tertiary">
            Preview
          </h3>
          <div className="bg-background-secondary rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-background-tertiary min-h-64 sm:min-h-96 md:min-h-[600px] max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
            <div className="blog-content text-left">
              <Markdown remarkPlugins={[remarkGfm]}>
                {content || '*Start typing to see preview...*'}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
