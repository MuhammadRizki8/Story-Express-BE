const mongoose = require('mongoose');

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    synopsis: { type: String },
    category: { type: String, enum: ['Financial', 'Technology', 'Health'], required: true },
    coverImage: { type: String }, // URL or file path
    tags: [String],
    status: { type: String, enum: ['Publish', 'Draft'], required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Story', storySchema);
