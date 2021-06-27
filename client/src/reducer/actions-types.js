export const showSettings = (needShow) => ({
  type: 'SHOW_SETTINGS',
  payload: needShow,
});

export const mainPage = () => ({
  type: 'MAIN_PAGE',
});

export const setRebuild = (value) => ({
  type: 'SET_REBUILD',
  payload: value,
});

export const setListBuilds = (arrayBuilds) => ({
  type: 'SET_LIST_BUILDS',
  payload: arrayBuilds,
});

export const setSettings = (settings) => ({
  type: 'SET_SETTINGS',
  payload: settings,
});

export const settingsIsDone = (isDone) => ({
  type: 'SETTINGS_IS_DONE',
  payload: isDone,
});

export const settingsResult = (result) => ({
  type: 'SETTINGS_RESULT',
  payload: result
});

export const setBuildDetails = (build) => ({
  type: 'SET_BUILD_DETAILS',
  payload: build
});

export const setBuildLog = (buildLogs) => ({
  type: 'SET_BUILD_LOG',
  payload: buildLogs
});
