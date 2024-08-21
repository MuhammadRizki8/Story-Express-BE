// src/models/chapterModel.js
const pool = require('../config/db');

const getChaptersByStoryId = async (storyId) => {
  const [rows] = await pool.query('SELECT * FROM chapters WHERE story_id = ?', [storyId]);
  return rows;
};

const createChapter = async (storyId, title, content) => {
  await pool.query('INSERT INTO chapters (story_id, title, content) VALUES (?, ?, ?)', [storyId, title, content]);
};

// Other CRUD operations can be added here

module.exports = { getChaptersByStoryId, createChapter };
