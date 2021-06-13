const getSettings = require('./getSettings');
const postSettings = require('./postSettings');
const getBuilds = require('./getBuilds');
const getBuildInformation = require('./getBuildInformation');
const getBuildLogs = require('./getBuildLogs');
const postBuildWithCommitHash = require('./postBuildWithCommitHash');

module.exports = {
  getSettings,
  postSettings,
  getBuilds,
  getBuildInformation,
  getBuildLogs,
  postBuildWithCommitHash,
};
