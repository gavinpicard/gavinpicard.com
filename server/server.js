const express = require('express');
const mysql = require('mysql2');
const multer  = require('multer');
const path    = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

// Environment variables with fallbacks for development
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 8080;

app.use('/cellular', express.static(path.join(__dirname, '../client/public/cellular'), {
  index: 'index.html',
  fallthrough: false  // Don't fall through to next middleware if file not found
}));

// Handle SPA routing for /cellular - serve index.html for all routes
app.get('/cellular/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/cellular', 'index.html'));
});

// CORS configuration
// Automatically include both www and non-www versions of the frontend URL
const getAllowedOrigins = (url) => {
  if (!url) return [];
  const origins = [url];
  
  // Add www version if non-www, remove www if present
  if (url.includes('://www.')) {
    origins.push(url.replace('://www.', '://')); // Remove www
  } else if (url.includes('://') && !url.includes('localhost')) {
    // Add www for non-localhost URLs
    origins.push(url.replace('://', '://www.'));
  }
  
  return origins;
};

const allowedOrigins = [
  ...getAllowedOrigins(FRONTEND_URL),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
].filter(Boolean);

const uniqueOrigins = [...new Set(allowedOrigins)];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (uniqueOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'x-api-key', 'X-Api-Key']
}));

// Admin API Key for protecting blog post creation - REQUIRED
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
if (!ADMIN_API_KEY) {
  throw new Error('ADMIN_API_KEY environment variable is required. Please set it in your .env file.');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads/'));    // your uploads folder
  },
  filename: function (req, file, cb) {
    // e.g. title_timestamp.ext
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

// File upload validation: only images, max 5MB
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
    }
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database configuration from environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog',
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

app.get('/posts', (req, res) => {
  const tag = req.query.tag; // Filter by tag if provided
  let query = 'SELECT * FROM posts';
  let params = [];
  
  if (tag) {
    // Filter posts that contain the specified tag in their JSON tags array
    query += ' WHERE JSON_CONTAINS(tags, ?)';
    params.push(JSON.stringify(tag));
  }
  
  query += ' ORDER BY created_at DESC';
  
  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    // Parse tags JSON for each post
    const posts = results.map(post => {
      if (post.tags) {
        try {
          post.tags = JSON.parse(post.tags);
        } catch (e) {
          post.tags = [];
        }
      } else {
        post.tags = [];
      }
      return post;
    });
    res.json(posts);
  });
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    const post = results[0];
    if (post && post.tags) {
      try {
        post.tags = JSON.parse(post.tags);
      } catch (e) {
        post.tags = [];
      }
    } else if (post) {
      post.tags = [];
    }
    res.json(post);
  });
});

// Helper function to verify API key
const verifyApiKey = (req) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  return apiKey && apiKey === ADMIN_API_KEY;
};

// Input validation helpers
const validateTitle = (title) => {
  if (!title || typeof title !== 'string') return 'Title is required';
  const trimmed = title.trim();
  if (trimmed.length === 0) return 'Title cannot be empty';
  if (trimmed.length > 255) return 'Title must be 255 characters or less';
  return null;
};

const validateSlug = (slug) => {
  if (!slug) return null; // Slug is optional
  if (typeof slug !== 'string') return 'Slug must be a string';
  // Allow only lowercase letters, numbers, and hyphens
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return 'Slug can only contain lowercase letters, numbers, and hyphens';
  }
  if (slug.length > 255) return 'Slug must be 255 characters or less';
  return null;
};

const validateContent = (content) => {
  if (!content || typeof content !== 'string') return 'Content is required';
  if (content.trim().length === 0) return 'Content cannot be empty';
  return null;
};

// Helper function to parse tags from various input formats
const parseTags = (tags) => {
  if (!tags) return null;
  
  // If it's already an array, return it (cleaned)
  if (Array.isArray(tags)) {
    return tags.filter(t => t && typeof t === 'string' && t.trim()).map(t => t.trim());
  }
  
  // If it's a string, check if it's JSON
  if (typeof tags === 'string') {
    const trimmed = tags.trim();
    if (!trimmed) return null;
    
    // Try to parse as JSON first (in case someone sends JSON string or double-encoded JSON)
    try {
      let parsed = JSON.parse(trimmed);
      
      // Handle case where JSON parsing returns a string that might itself be JSON
      if (typeof parsed === 'string' && parsed.trim().startsWith('[')) {
        try {
          parsed = JSON.parse(parsed);
        } catch (e) {
          // If second parse fails, treat the string as comma-separated
        }
      }
      
      // If we got an array from JSON parsing, return it
      if (Array.isArray(parsed)) {
        return parsed.filter(t => t && typeof t === 'string' && t.trim()).map(t => t.trim());
      }
    } catch (e) {
      // Not JSON, will treat as comma-separated string below
    }
    
    // Parse as comma-separated string (fallback for non-JSON strings)
    return trimmed.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
  }
  
  return null;
};

// Admin API key verification endpoint
app.post('/admin/verify', (req, res) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  if (apiKey && apiKey === ADMIN_API_KEY) {
    return res.json({ valid: true });
  }
  return res.status(401).json({ valid: false, error: 'Invalid API key' });
});

// Error handler for multer file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size too large. Maximum size is 5MB.' });
    }
    return res.status(400).json({ error: 'File upload error: ' + err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

app.post('/posts', upload.single('image'), handleUploadError, (req, res) => {
  // Check for API key in header
  if (!verifyApiKey(req)) {
    return res.status(401).json({ error: 'Unauthorized. Valid API key required.' });
  }
  
  const { title, slug, lede, content, tags } = req.body;
  
  // Input validation
  const titleError = validateTitle(title);
  if (titleError) {
    return res.status(400).json({ error: titleError });
  }
  
  const slugError = validateSlug(slug);
  if (slugError) {
    return res.status(400).json({ error: slugError });
  }
  
  const contentError = validateContent(content);
  if (contentError) {
    return res.status(400).json({ error: contentError });
  }
  
  // Handle file upload errors
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  
  let imagePath = null;
  if (req.file) {
    // e.g. "uploads/1612345678901.png"
    imagePath = `uploads/${req.file.filename}`;
  }
  
  // Parse and store tags as JSON string (array of tag strings)
  const tagsArray = parseTags(tags);
  const tagsJson = tagsArray && tagsArray.length > 0 ? JSON.stringify(tagsArray) : null;
  
  db.query('INSERT INTO posts (title, slug, lede, cover_path, content, tags) VALUES (?, ?, ?, ?, ?, ?)', 
    [title.trim(), slug ? slug.trim() : null, lede ? lede.trim() : null, imagePath, content.trim(), tagsJson], 
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ id: results.insertId });
    }
  );
});

app.put('/posts/:id', upload.single('image'), handleUploadError, (req, res) => {
  // Check for API key in header
  if (!verifyApiKey(req)) {
    return res.status(401).json({ error: 'Unauthorized. Valid API key required.' });
  }
  
  const { id } = req.params;
  const { title, slug, lede, content, tags } = req.body;
  
  // Input validation
  const titleError = validateTitle(title);
  if (titleError) {
    return res.status(400).json({ error: titleError });
  }
  
  const slugError = validateSlug(slug);
  if (slugError) {
    return res.status(400).json({ error: slugError });
  }
  
  const contentError = validateContent(content);
  if (contentError) {
    return res.status(400).json({ error: contentError });
  }
  
  // Handle file upload errors
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  
  // First, get the existing post to preserve the image if no new one is uploaded
  db.query('SELECT cover_path FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    let imagePath = results[0].cover_path; // Keep existing image by default
    if (req.file) {
      // New image uploaded, use it
      imagePath = `uploads/${req.file.filename}`;
    }
    
    // Parse and store tags as JSON string (array of tag strings)
    const tagsArray = parseTags(tags);
    const tagsJson = tagsArray && tagsArray.length > 0 ? JSON.stringify(tagsArray) : null;
    
    db.query('UPDATE posts SET title = ?, slug = ?, lede = ?, cover_path = ?, content = ?, tags = ? WHERE id = ?', 
      [title.trim(), slug ? slug.trim() : null, lede ? lede.trim() : null, imagePath, content.trim(), tagsJson, id], 
      (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ id: parseInt(id), message: 'Post updated successfully' });
      }
    );
  });
});

app.delete('/posts/:id', (req, res) => {
  // Check for API key in header
  if (!verifyApiKey(req)) {
    return res.status(401).json({ error: 'Unauthorized. Valid API key required.' });
  }
  
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
