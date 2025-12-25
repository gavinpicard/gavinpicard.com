import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { API_ENDPOINTS, getImageUrl } from '../config/api';

function Glog() {
  const [posts, setPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const navigate = useNavigate()

  function truncate(str, max = 20) {
    return str.length > max
      ? str.slice(0, max) + '…'
      : str;
  }

  function BlogDate({ createdAt }) {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const humanDate = date.toLocaleDateString(undefined, options);

    return (
      <p className="text-xs text-custom-gray m-0 font-medium uppercase tracking-wide">
        {humanDate}
      </p>
    );
  }

  useEffect(() => {
    // Check if user is admin
    const apiKey = localStorage.getItem('admin_api_key');
    setIsAdmin(!!apiKey);
  }, []);

  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo(0, 0);
    
    const url = selectedTag ? `${API_ENDPOINTS.POSTS}?tag=${encodeURIComponent(selectedTag)}` : API_ENDPOINTS.POSTS;
    axios.get(url).then(response => {
      const postsData = response.data;
      setPosts(postsData);
      
      // Extract all unique tags from all posts (need to fetch all posts for tag list)
      if (!selectedTag) {
        axios.get(API_ENDPOINTS.POSTS).then(allPostsResponse => {
          const allPosts = allPostsResponse.data;
          const tagsSet = new Set();
          allPosts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach(tag => tagsSet.add(tag));
            }
          });
          setAllTags(Array.from(tagsSet).sort());
        });
      }
    });
  }, [selectedTag]);

  const handleDelete = (postToDelete, e) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    
    const apiKey = localStorage.getItem('admin_api_key');
    if (!apiKey) {
      alert('You are not authenticated. Please log in first.');
      navigate('/admin/login');
      return;
    }

    axios.delete(API_ENDPOINTS.DELETE_POST(postToDelete.id), {
      headers: {
        'X-API-Key': apiKey
      }
    })
      .then(() => {
        // Remove the post from the list
        setPosts(posts.filter(p => p.id !== postToDelete.id));
        setShowDeleteConfirm(null);
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

  return (
    <div className="flex flex-col w-[90%] max-w-5xl min-h-screen py-8 sm:py-12 mx-auto pt-32 md:pt-40 px-4 sm:px-6 md:px-8 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {selectedTag ? `Posts tagged: #${selectedTag}` : 'All Posts'}
          </h2>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-6 py-3 text-sm bg-background-tertiary text-custom-white rounded-lg hover:bg-background-secondary transition-all duration-200 border border-background-tertiary shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
            >
              Clear Filter
            </button>
          )}
        </div>
        
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-medium text-custom-gray mb-4">Filter by tag:</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] ${
                    selectedTag === tag
                      ? 'bg-teal text-custom-white border border-teal/50'
                      : 'bg-background-secondary text-custom-gray hover:bg-background-tertiary hover:text-custom-white border border-background-tertiary'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {posts.length === 0 ? (
          <div className="w-full py-16 sm:py-24 flex flex-col items-center justify-center text-center">
            <p className="text-xl sm:text-2xl text-custom-gray mb-4">
              No blog posts yet
            </p>
            <p className="text-base sm:text-lg text-custom-gray/80">
              Posts are coming soon!
            </p>
          </div>
        ) : (
        <div className="w-full space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
        {posts.map(post => (
          <article
            key={post.id || post.title}
            className="group cursor-pointer relative"
            onClick={() => 
              navigate(`/glog/${post.title}`, { state: { blog: post } })
            }
          >
            {/* Admin Delete Button */}
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(post);
                }}
                className="absolute top-4 right-4 z-20 p-2 bg-red/80 hover:bg-red text-custom-white rounded-lg transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)]"
                aria-label="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="relative aspect-[21/9] sm:aspect-[16/6] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-background-tertiary shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)] transition-all duration-300">
              <img 
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                src={getImageUrl(post.cover_path)}
                alt={post.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-gray/95 via-dark-gray/60 to-dark-gray/20"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-8">
                <div className="text-left space-y-2 lg:space-y-2">
                  <div className="flex items-center gap-2 lg:gap-2 flex-wrap">
                    <div className="text-xs sm:text-sm text-teal font-medium uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      <BlogDate createdAt={post.created_at} />
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-xs px-1.5 py-0.5 bg-teal/20 text-teal rounded-md border border-teal/30 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs px-1.5 py-0.5 text-custom-gray drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-xl xl:text-2xl font-bold text-custom-white leading-tight group-hover:text-teal transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    {truncate(post.title, 60)}
                  </h3>
                  {post.lede && (
                    <p className="text-sm sm:text-base lg:text-xs xl:text-sm text-custom-gray/95 leading-relaxed line-clamp-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {truncate(post.lede, 80)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
        </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDeleteConfirm(null)}>
            <div className="bg-background-secondary rounded-2xl p-6 sm:p-8 max-w-md w-full border border-background-tertiary" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-custom-white mb-4">Delete Post?</h3>
              <p className="text-custom-gray mb-6">
                Are you sure you want to delete "{showDeleteConfirm.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-background-tertiary text-custom-gray rounded-lg hover:bg-background-tertiary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => handleDelete(showDeleteConfirm, e)}
                  className="px-4 py-2 bg-red text-custom-white rounded-lg hover:bg-red/80 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Glog;
