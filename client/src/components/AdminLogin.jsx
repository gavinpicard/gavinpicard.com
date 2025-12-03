import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

function AdminLogin() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // If already logged in, verify and redirect to create post
  useEffect(() => {
    const storedKey = localStorage.getItem('admin_api_key');
    if (storedKey) {
      // Verify the stored key is still valid
      const baseUrl = API_ENDPOINTS.POSTS.replace('/posts', '');
      axios.post(`${baseUrl}/admin/verify`, {}, {
        headers: {
          'X-API-Key': storedKey
        }
      })
        .then(response => {
          if (response.data.valid) {
            navigate('/createpost');
          } else {
            localStorage.removeItem('admin_api_key');
          }
        })
        .catch(() => {
          localStorage.removeItem('admin_api_key');
        });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const baseUrl = API_ENDPOINTS.POSTS.replace('/posts', '');
      const response = await axios.post(`${baseUrl}/admin/verify`, {}, {
        headers: {
          'X-API-Key': apiKey.trim()
        }
      });

      if (response.data.valid) {
        // Store the API key in localStorage only after verification
        localStorage.setItem('admin_api_key', apiKey.trim());
        navigate('/createpost');
      } else {
        setError('Invalid API key. Please try again.');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid API key. Please try again.');
      } else {
        setError('Failed to verify API key. Please try again.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-[90%] max-w-md mx-auto py-8 sm:py-12">
      <div className="bg-background-secondary rounded-2xl sm:rounded-3xl p-6 sm:p-8 w-full border border-background-tertiary shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-custom-white mb-4 sm:mb-6 text-center">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-custom-gray mb-2">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full px-4 py-3 bg-background-tertiary border border-background-tertiary rounded-lg text-custom-white placeholder-custom-gray focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 transition-all text-sm sm:text-base"
            />
          </div>
          {error && (
            <p className="text-red text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3 px-6 bg-teal text-custom-white font-semibold rounded-lg hover:bg-green transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-background-secondary text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

