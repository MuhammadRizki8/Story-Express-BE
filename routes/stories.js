const express = require('express');
const { getStories, createStory, updateStory, deleteStory, addChapter, updateChapter, deleteChapter } = require('../controllers/storyController');

const router = express.Router();

router.get('/', getStories);
router.post('/', createStory);
router.put('/:id', updateStory);
router.delete('/:id', deleteStory);
router.post('/:id/chapters', addChapter);
router.put('/:storyId/chapters/:chapterId', updateChapter);
router.delete('/:storyId/chapters/:chapterId', deleteChapter);

module.exports = router;
