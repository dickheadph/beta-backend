const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A project must have a name.'],
    },
    projectImage: {
      type: String,
      required: [true, 'A project must have a cover.'],
    },
    images: [String],
    desc: {
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
      enum: {
        values: ['frontend', 'api', 'app', 'fullstack'],
        message: 'No project category indicated.',
      },
      default: 'fullstack',
      lowercase: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
