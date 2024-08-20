const express = require('express');
const cors = require('cors');
const storyRoutes = require('./routes/stories');

const app = express();

// Middleware untuk CORS dan JSON parsing
app.use(cors());
app.use(express.json());

// Route untuk story API
app.use('/api/stories', storyRoutes);

// Jalankan server di port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
