const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chapter', chapterSchema);
