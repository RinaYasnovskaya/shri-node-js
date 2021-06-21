const getSettings = require('./settings/getSettings');
const postSettings = require('./settings/postSettings');
const getBuilds = require('./build/getBuilds');
const getBuildInformation = require('./build/getBuildInformation');
const getBuildLogs = require('./build/getBuildLogs');
const postBuildWithCommitHash = require('./build/postBuildWithCommitHash');

module.exports = {
  getSettings,
  postSettings,
  getBuilds,
  getBuildInformation,
  getBuildLogs,
  postBuildWithCommitHash,
};
