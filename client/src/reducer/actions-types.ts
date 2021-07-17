const SHOW_SETTINGS: string = 'SHOW_SETTINGS';
const MAIN_PAGE: string = 'MAIN_PAGE';
const SET_REBUILD: string = 'SET_REBUILD';
const SET_LIST_BUILDS: string = 'SET_LIST_BUILDS';
const SET_SETTINGS: string = 'SET_SETTINGS';
const SETTINGS_IS_DONE: string = 'SETTINGS_IS_DONE';
const SETTINGS_RESULT: string = 'SETTINGS_RESULT';
const SET_BUILD_DETAILS: string = 'SET_BUILD_DETAILS';
const SET_BUILD_LOG: string = 'SET_BUILD_LOG';
const START_BUILD: string = 'START_BUILD';

export const showSettings = (needShow: boolean) => ({
  type: SHOW_SETTINGS,
  payload: needShow,
});

export const mainPage = () => ({
  type: MAIN_PAGE,
});

export const setRebuild = (value: boolean) => ({
  type: SET_REBUILD,
  payload: value,
});

export const setListBuilds = (arrayBuilds: any[]) => ({
  type: SET_LIST_BUILDS,
  payload: arrayBuilds,
});

export const setSettings = (settings: any) => ({
  type: SET_SETTINGS,
  payload: settings,
});

export const settingsIsDone = (done: string) => ({
  type: SETTINGS_IS_DONE,
  payload: done,
});

export const settingsResult = (result: any) => ({
  type: SETTINGS_RESULT,
  payload: result,
});

export const setBuildDetails = (build: any[]) => ({
  type: SET_BUILD_DETAILS,
  payload: build,
});

export const setBuildLog = (buildLogs: string) => ({
  type: SET_BUILD_LOG,
  payload: buildLogs,
});

export const startBuild = () => ({
  type: START_BUILD,
})
