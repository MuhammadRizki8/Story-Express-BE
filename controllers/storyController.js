let stories = [
  {
    id: 1,
    title: 'The Rise of Technology',
    author: 'John Doe',
    synopsis: 'A story about the rapid growth of technology.',
    category: 'Technology',
    coverImage: 'cover-tech.jpg',
    tags: ['Tech', 'AI', 'Innovation'],
    status: 'Publish',
    chapters: [
      { id: 1, title: 'Introduction to Tech', updatedAt: new Date('2023-08-10') },
      { id: 2, title: 'The AI Revolution', updatedAt: new Date('2023-08-12') },
    ],
  },
  {
    id: 2,
    title: 'Financial Freedom',
    author: 'Jane Smith',
    synopsis: 'A guide to achieve financial freedom.',
    category: 'Financial',
    coverImage: 'cover-finance.jpg',
    tags: ['Finance', 'Investment'],
    status: 'Draft',
    chapters: [{ id: 1, title: 'Basics of Finance', updatedAt: new Date('2023-07-05') }],
  },
];

let chapters = [
  { id: 1, title: 'Introduction to Tech', content: 'Chapter content here', storyId: 1, updatedAt: new Date('2023-08-10') },
  { id: 2, title: 'The AI Revolution', content: 'Chapter content here', storyId: 1, updatedAt: new Date('2023-08-12') },
  { id: 3, title: 'Basics of Finance', content: 'Chapter content here', storyId: 2, updatedAt: new Date('2023-07-05') },
];

// Fetch all stories with optional filtering
const getStories = (req, res) => {
  const { search, category, status } = req.query;
  let filteredStories = stories;

  if (search) {
    filteredStories = filteredStories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()) || story.author.toLowerCase().includes(search.toLowerCase()));
  }

  if (category) {
    filteredStories = filteredStories.filter((story) => story.category === category);
  }

  if (status) {
    filteredStories = filteredStories.filter((story) => story.status === status);
  }

  // Format date for chapters
  filteredStories = filteredStories.map((story) => ({
    ...story,
    chapters: story.chapters.map((chapter) => ({
      ...chapter,
      updatedAt: new Date(chapter.updatedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    })),
  }));

  res.json(filteredStories);
};

// Create a new story
const createStory = (req, res) => {
  const { title, author, synopsis, category, coverImage, tags, status } = req.body;
  const newStory = {
    id: stories.length + 1,
    title,
    author,
    synopsis,
    category,
    coverImage,
    tags,
    status,
    chapters: [],
  };
  stories.push(newStory);
  res.status(201).json(newStory);
};

// Update a story
const updateStory = (req, res) => {
  const { id } = req.params;
  const story = stories.find((story) => story.id == id);

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  Object.assign(story, req.body);
  res.json(story);
};

// Delete a story
const deleteStory = (req, res) => {
  const { id } = req.params;
  stories = stories.filter((story) => story.id != id);
  res.json({ message: 'Story deleted' });
};

// Add a chapter to a story
const addChapter = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const story = stories.find((story) => story.id == id);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  const newChapter = {
    id: chapters.length + 1,
    title,
    content,
    storyId: id,
    updatedAt: new Date(),
  };

  chapters.push(newChapter);
  story.chapters.push(newChapter);
  res.status(201).json(newChapter);
};

// Update a chapter
const updateChapter = (req, res) => {
  const { storyId, chapterId } = req.params;
  const chapter = chapters.find((chap) => chap.id == chapterId && chap.storyId == storyId);

  if (!chapter) {
    return res.status(404).json({ message: 'Chapter not found' });
  }

  Object.assign(chapter, req.body, { updatedAt: new Date() });
  res.json(chapter);
};

// Delete a chapter
const deleteChapter = (req, res) => {
  const { storyId, chapterId } = req.params;

  const story = stories.find((story) => story.id == storyId);
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  chapters = chapters.filter((chap) => chap.id != chapterId);
  story.chapters = story.chapters.filter((chap) => chap.id != chapterId);

  res.json({ message: 'Chapter deleted' });
};

module.exports = {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  addChapter,
  updateChapter,
  deleteChapter,
};
