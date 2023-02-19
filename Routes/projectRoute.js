const express = require('express');

const projectController = require('../Controller/projectController');
const smartFilters = require('../Controller/smartFilters');
const adminAuthController = require('../Controller/adminAuthController');
const uploadCover = require('../Utility/ImageUpload');

const {
  getProjects,
  getSingleProject,
  addProject,
  editProject,
  deleteProject,
} = projectController;
const { getFullstack, getFrontend, getApi, getApp } = smartFilters;
const { protectRoute } = adminAuthController;
const router = express.Router();

//Smartfilters
router.get('/full-stack', getFullstack, getProjects);
router.get('/front-end', getFrontend, getProjects);
router.get('/back-end-api', getApi, getProjects);
router.get('/native-app', getApp, getProjects); 

router.route('/').get(getProjects).post(protectRoute, uploadCover, addProject);
router
  .route('/:projectId')
  .get(getSingleProject)
  .patch(protectRoute, uploadCover, editProject)
  .delete(protectRoute, deleteProject);

module.exports = router;
