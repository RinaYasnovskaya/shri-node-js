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
