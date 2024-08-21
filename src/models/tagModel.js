// src/models/tagModel.js
const pool = require('../config/db');

const getTagsByStoryId = async (storyId) => {
  const [rows] = await pool.query('SELECT * FROM tags WHERE story_id = ?', [storyId]);
  return rows;
};

const createTag = async (storyId, tagName) => {
  await pool.query('INSERT INTO tags (story_id, tag_name) VALUES (?, ?)', [storyId, tagName]);
};

// Other CRUD operations can be added here

module.exports = { getTagsByStoryId, createTag };
