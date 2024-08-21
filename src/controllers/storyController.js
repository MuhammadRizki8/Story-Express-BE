// src/controllers/storyController.js
const Story = require('../models/storyModel');
const Tag = require('../models/tagModel');
const Chapter = require('../models/chapterModel');

const addStory = async (req, res) => {
  try {
    const { title, author, synopsis, category, status, tags, chapters } = req.body;
    const cover_image = req.file ? req.file.filename : null; // Handle file upload

    // Create the story
    const storyId = await Story.createStory({ title, author, synopsis, category, cover_image, status }, tags);

    // Add chapters
    if (chapters && chapters.length > 0) {
      for (const chapter of chapters) {
        await Chapter.createChapter(storyId, chapter.title, chapter.content);
      }
    }

    res.status(201).json({ message: 'Story added successfully', storyId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.getAllStoriesWithTags();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Additional controller methods (create, update, delete) can be added here

module.exports = { getAllStories, addStory };
