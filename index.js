const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Default Route
app.get('/', (req, res) => {
  res.send('BIGIO Story App Backend');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
