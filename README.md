# Gavin Picard - Personal Website

A modern, responsive personal website featuring a portfolio showcase, blog (Glog), and professional profile. Built with React, Node.js, and MySQL.

## Features

- **Portfolio Showcase**: Display projects with descriptions, technologies, and links
- **Blog (Glog)**: Markdown-based blog with tagging and filtering capabilities
- **Admin Panel**: Secure authentication for creating, editing, and deleting blog posts
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, professional interface with smooth animations and transitions

## Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide React** - Icon library
- **React Icons** - Technology icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL** - Database
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Project Structure

```
gavinpicard/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/        # API configuration
│   │   └── assets/         # Static assets
│   ├── public/            # Public assets
│   └── package.json
│
├── server/                # Node.js backend application
│   ├── server.js         # Express server
│   ├── migrations/       # Database migrations
│   ├── uploads/          # User-uploaded images
│   └── package.json
│
├── setup_database.sql    # Database initialization script
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gavinpicard
   ```

2. **Set up the database**
   ```bash
   mysql -u root -p < setup_database.sql
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

## Configuration

### Server Configuration

Create a `.env` file in the `server/` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog
PORT=8080
ADMIN_API_KEY=your_secure_random_api_key_here
```

**Important**: Generate a secure random string for `ADMIN_API_KEY`. This key is used to authenticate admin actions (creating, editing, deleting blog posts).

### Client Configuration

The client is configured to connect to `http://localhost:8080` by default. To change this, update `client/src/config/api.js` or set the `VITE_API_BASE_URL` environment variable.

## Running the Project

### Development Mode

1. **Start the server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:8080`

2. **Start the client** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:5173`

### Production Build

1. **Build the client**
   ```bash
   cd client
   npm run build
   ```

2. **Start the server**
   ```bash
   cd server
   npm start
   ```

Website: gavinpicard.com