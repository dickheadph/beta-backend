const AppError = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const Project = require('../Schema/projectSchema');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;

exports.getProjects = AsyncHandler(async (req, res, next) => {
  const projects = await Project.find();
  console.log();
  res.status(200).json({
    status: 'success',
    length: projects.length,
    data: {
      projects,
    },
  });
});

exports.getSingleProject = AsyncHandler(async (req, res, next) => {
  // console.log('This is a test');
  // console.log(req.params.projectId);
  const project = await Project.findById(req.params.projectId);
  //const project = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!project) {
    return next(new AppError('No project found with that Id', 404));
  }
  console.log(project);

  res.status(200).json({
    status: 'success',
    data: {
      projects: project,
    },
  });
});

exports.addProject = AsyncHandler(async (req, res, next) => {
  const { name, desc, live, repo, category } = req.body;

  let imageData;

  if (req.file) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    imageData = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Portfolio_Projects',
      resource_type: 'image',
    });
  }
  //console.log(imageData);

  //sharp(imageData).toFormat('jpeg').jpeg({ quality: 90 });

  const newProject = await Project.create({
    name,
    projectImage: imageData.secure_url,
    desc,
    live,
    repo,
    category,
  });

  if (!newProject) {
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

exports.editProject = AsyncHandler(async (req, res, next) => {
  const { name, desc, live, repo, category } = req.body;
  let imageData;

  if (req.file) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    imageData = await cloudinary.uploader.upload(req.file.path, {
      folder: 'Portfolio_Projects',
      resource_type: 'image',
    });
  }
  const currentCover = await Project.findById(req.params.projectId).select(
    '+projectImage'
  );
  //console.log(currentCover.projectImage);
  const project = await Project.findByIdAndUpdate(
    req.params.projectId,
    {
      name,
      projectImage: req.file ? imageData.secure_url : currentCover.projectImage,
      desc,
      live,
      repo,
      category,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!project) {
    return next(new AppError('No project found with that Id.', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      projects: project,
    },
  });
});

exports.deleteProject = AsyncHandler(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.projectId);

  if (!project) {
    return next(new AppError('No tour found with that Id.', 404));
  }
  res.status(201).json({
    status: 'success',
    data: null,
  });
});
