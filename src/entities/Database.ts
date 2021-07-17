import { EventEmitter } from 'events';
import { existsSync } from 'fs';
import path from 'path';
import { fsObj } from '../utils/fs';
import { prettifyJsonToString } from '../utils/prettifyJsonToString';

const dbFolder: string = path.resolve(__dirname, '../../db/');
const dbDumpFile: string = path.resolve(dbFolder, 'dump.json');

class Database extends EventEmitter {
  settings: {};
  listOfBuilds: {};

  constructor() {
    super();

    this.settings = {};
    this.listOfBuilds = {};
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

  insertSettings(objectSettings: any) {
    this.settings = objectSettings;
    this.listOfBuilds = {};

    this.emit('changed');
  }

  insertBuildToList(objectBuild: any) {
    this.listOfBuilds[objectBuild.buildId] = objectBuild;

    this.emit('changed');
  }

  getBuildId(): number {
    return Object.keys(this.listOfBuilds).length + 1;
  }

  getSettings(): any {
    return this.settings;
  }

  toJSON(): any {
    return {
      settings: this.settings,
      listOfBuilds: this.listOfBuilds,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  fsObj.writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

export default db;
