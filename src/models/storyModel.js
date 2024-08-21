// src/models/storyModel.js
const pool = require('../config/db');

const getAllStories = async () => {
  const [rows] = await pool.query('SELECT * FROM stories');
  return rows;
};

const createStory = async (story, tags, chaptersJson) => {
  const { title, author, synopsis, category, cover_image, status } = story;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insert story
    const [result] = await connection.query('INSERT INTO stories (title, author, synopsis, category, cover_image, status) VALUES (?, ?, ?, ?, ?, ?)', [title, author, synopsis, category, cover_image, status]);
    const storyId = result.insertId;

    // Insert tags and link to story
    if (tags && tags.length > 0) {
      const tagsArray = tags.split(',').map((tag) => tag.trim());
      for (const tag of tagsArray) {
        if (tag) {
          let [tagResult] = await connection.query('SELECT id FROM tags WHERE tag_name = ?', [tag]);
          if (tagResult.length === 0) {
            [tagResult] = await connection.query('INSERT INTO tags (tag_name) VALUES (?)', [tag]);
          }
          const tagId = tagResult.insertId || tagResult[0].id;
          await connection.query('INSERT INTO story_tags (story_id, tag_id) VALUES (?, ?)', [storyId, tagId]);
        }
      }
    }

    // Insert chapters
    if (chaptersJson) {
      const chapters = JSON.parse(chaptersJson); // Uraikan JSON string menjadi array
      for (const chapter of chapters) {
        await connection.query('INSERT INTO chapters (story_id, title, content) VALUES (?, ?, ?)', [storyId, chapter.title, chapter.content]);
      }
    }

    await connection.commit();
    return storyId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

// Function to get all stories with tags
const getAllStoriesWithTags = async () => {
  const [stories] = await pool.query(
    `SELECT s.id, s.title, s.author, s.synopsis, s.category, s.created_at, s.updated_at, s.status,
              GROUP_CONCAT(t.tag_name) AS tags
       FROM stories s
       LEFT JOIN story_tags st ON s.id = st.story_id
       LEFT JOIN tags t ON st.tag_id = t.id
       GROUP BY s.id`
  );
  return stories;
};

// Other CRUD operations can be added here

module.exports = { getAllStories, createStory, getAllStoriesWithTags };
