// src/routes/storyRoutes.js
const express = require('express');
const upload = require('../config/multer');
const { getAllStories, addStory } = require('../controllers/storyController');

const router = express.Router();

router.get('/stories', getAllStories);
router.post('/stories', upload.single('cover_image'), addStory); // Handle file upload

module.exports = router;
