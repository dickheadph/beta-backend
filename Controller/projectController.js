const AppError = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const PROJECT = require('../Schema/projectSchema');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

const getProjects = AsyncHandler(async (req, res, next) => {
  const projects = await PROJECT.find();

  res.status(200).json({
    status: 'success',
    length: projects.length,
    data: {
      projects,
    },
  });
});

const getProject = AsyncHandler(async (req, res, next) => {
  const project = await PROJECT.findById(req.body.id);
  if (!project) {
    return next(new AppError('No tour found with that Id.', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      projects: project,
    },
  });
});

const addProject = AsyncHandler(async (req, res, next) => {
  const { name, description, live, repo, category } = req.body;

  let imageData = {};

  if (req.file) {
    let chosenImage;

    try {
      chosenImage = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Edwood_Users',
        resource_type: 'image',
      });
    } catch (error) {
      return new AppError('Something went wrong. Image not uploaded.', 500);
    }

    imageData = {
      fileName: req.file.originalname,
      fileUrl: chosenImage.secure_url,
    };
  }

  sharp(imageData).toFormat('jpeg').jpeg({ quality: 90 });

  const newProject = await PROJECT.create({
    name,
    projectImage: imageData,
    description,
    live,
    repo,
    category,
  });
  const liveUrl = req.body.live.startsWith('http');
  const liveRepo = req.body.repo.contains('github.com');

  if (!liveUrl && !liveRepo && !newProject) {
    return next(
      new AppError('Create project failed. Check feilds for wrong input.', 404)
    );
  }
  res.status(200).json({
    status: 'success',
    data: {
      projects: newProject,
    },
  });
});

const editProject = AsyncHandler(async (req, res, next) => {
  const project = await PROJECT.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return next(new AppError('No tour found with that Id.', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      projects: project,
    },
  });
});

const deleteProject = AsyncHandler(async (req, res, next) => {
  const project = await PROJECT.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError('No tour found with that Id.', 404));
  }
  res.status(201).json({
    status: 'success',
    data: null,
  });
});

module.exports = {
  getProjects,
  getProject,
  addProject,
  editProject,
  deleteProject,
};
