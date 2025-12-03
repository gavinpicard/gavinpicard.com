import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import Markdown from 'react-markdown';
import axios from 'axios';
import { Edit, Trash2 } from 'lucide-react';
import { API_ENDPOINTS, getImageUrl } from '../config/api';

function BlogPost() {
  const { state } = useLocation()
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(state?.blog ?? null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const apiKey = localStorage.getItem('admin_api_key');
    setIsAdmin(!!apiKey);
  }, []);

  useEffect(() => {
    // If post not in state, try to fetch by title/id
    if (!post && id) {
      // Try to find post by title (since routes use title)
      axios.get(API_ENDPOINTS.POSTS)
        .then(res => {
          const foundPost = res.data.find(p => p.title === decodeURIComponent(id));
          if (foundPost) {
            setPost(foundPost);
          }
        })
        .catch(err => {
          console.error('Error fetching post:', err);
        });
    }
  }, [id, post]);

  const handleDelete = () => {
    const apiKey = localStorage.getItem('admin_api_key');
    if (!apiKey) {
      alert('You are not authenticated. Please log in first.');
      navigate('/admin/login');
      return;
    }

    axios.delete(API_ENDPOINTS.DELETE_POST(post.id), {
      headers: {
        'X-API-Key': apiKey
      }
    })
      .then(() => {
        navigate('/glog');
      })
      .catch(err => {
        console.error('Error deleting post:', err);
        if (err.response?.status === 401) {
          alert('Authentication failed. Please log in again.');
          localStorage.removeItem('admin_api_key');
          navigate('/admin/login');
        } else {
          alert('Failed to delete post. Please try again.');
        }
      });
  };

  const handleEdit = () => {
    navigate('/createpost', { state: { post } });
  };

  if (!post) {
    return (
      <div className="w-full min-h-screen py-8 sm:py-12 pt-32 md:pt-40 flex items-center justify-center">
        <p className="text-custom-gray">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 pt-32 md:pt-40 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>
      <article className="w-[90%] max-w-5xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Admin Actions */}
        {isAdmin && post && (
          <div className="flex gap-3 mb-6 justify-end">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-background-secondary text-teal rounded-lg border border-background-tertiary hover:bg-teal hover:text-custom-white transition-all duration-200"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-background-secondary text-red rounded-lg border border-background-tertiary hover:bg-red hover:text-custom-white transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background-secondary rounded-2xl p-6 sm:p-8 max-w-md w-full border border-background-tertiary">
              <h3 className="text-xl font-bold text-custom-white mb-4">Delete Post?</h3>
              <p className="text-custom-gray mb-6">
                Are you sure you want to delete "{post?.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-background-tertiary text-custom-gray rounded-lg hover:bg-background-tertiary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red text-custom-white rounded-lg hover:bg-red/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-left text-3xl sm:text-4xl md:text-5xl font-bold text-custom-white mb-8 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {post?.title}
          </h1>
          {post.created_at && (
            <p className="text-left text-xs sm:text-sm text-custom-gray font-medium uppercase tracking-wide mb-4">
              {new Date(post.created_at).toLocaleDateString(undefined, { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, idx) => (
                <span key={idx} className="text-sm px-4 py-1.5 bg-background-secondary text-teal rounded-lg border border-background-tertiary shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {post.cover_path && (
          <div className="mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
            <img 
              className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 object-cover"
              src={getImageUrl(post.cover_path)}
              alt={post.title}
            />
          </div>
        )}

        {/* Content */}
        <div className="blog-content text-left">
          <Markdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </Markdown>
        </div>
      </article>
    </div>
  );
}

export default BlogPost;
