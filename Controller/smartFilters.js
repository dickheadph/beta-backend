const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const PROJECT = require('../Schema/projectSchema');

const responseStat = (res, data, stat) => {
  res.status(stat).json({
    status: 'success',
    data: {
      projects: data,
    },
  });
};

exports.getFullstack = AsyncHandler(async (req, res, next) => {
  const fullstack = await PROJECT.find({ category: 'fullstack' });
  if (!fullstack) {
    return next(new AppErr('No category found with fullstack', 404));
  }
  responseStat(res, fullstack, 200);
});

exports.getFrontend = AsyncHandler(async (req, res, next) => {
  const frontend = await PROJECT.find({ category: 'frontend' });
  if (!frontend) {
    return next(new AppErr('No category found with frontend', 404));
  }
  responseStat(res, frontend, 200);
});

exports.getApi = AsyncHandler(async (req, res, next) => {
  const api = await PROJECT.find({ category: 'api' });
  if (!api) {
    return next(new AppErr('No category found with api', 404));
  }
  responseStat(res, api, 200);
});

exports.getApp = AsyncHandler(async (req, res, next) => {
  const app = await PROJECT.find({ category: 'app' });
  if (!app) {
    return next(new AppErr('No category found with app', 404));
  }
  responseStat(res, app, 200);
});
