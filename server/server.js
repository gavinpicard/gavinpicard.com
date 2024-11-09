const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/Posts');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests
app.use('/api', postRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 8080
app.listen(8080, () => {
  console.log(`Server started on port ${PORT}`);
});
