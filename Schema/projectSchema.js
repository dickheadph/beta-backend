const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A project must have a name.'],
  },
  projectImage: {
    type: String,
    required: [true, 'A project must have a cover.'],
  },
  images: [String],
  description: {
    type: String,
    required: [true, 'A project must have a description.'],
    default: 'A simple project.',
  },
  live: {
    type: String,
    required: [true, 'A project must have a live url.'],
  },
  repo: {
    type: String,
    required: [true, 'A project must have a repository.'],
  },
  category: {
    type: String,
    enum: ['frontend', 'api', 'app', 'fullstack'],
    default: 'fullstack',
    lowercase: true,
  },
});

const PROJECT = mongoose.model('PROJECT', projectSchema);

module.exports = PROJECT;
