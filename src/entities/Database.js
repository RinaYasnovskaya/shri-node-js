const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const path = require('path');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString');

const dbFolder = path.resolve(__dirname, '../../db/');
const dbDumpFile = path.resolve(dbFolder, 'dump.json');

class Database extends EventEmitter {
  constructor() {
    super();

    this.settings = {};
    this.builds = {};
  }

  async initFromDump() {
    if (existsSync(dbDumpFile) === false) {
      return;
    }

    const dump = require(dbDumpFile);

    if (typeof dump.settings === 'object') {
      this.settings = {};
    }

    if (typeof dump.listOfBuilds === 'object') {
      this.listOfBuilds = { ...dump.listOfBuilds };
    }
  }

  insertSettings(objectSettings) {
    this.settings = objectSettings;
    this.listOfBuilds = {};

    this.emit('changed');
  }

  insertBuildToList(objectBuild) {
    this.listOfBuilds[objectBuild.buildId] = objectBuild;

    this.emit('changed');
  }

  getBuildId() {
    return Object.keys(this.listOfBuilds).length + 1;
  }

  getSettings() {
    return this.settings;
  }

  toJSON() {
    return {
      settings: this.settings,
      listOfBuilds: this.listOfBuilds,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
