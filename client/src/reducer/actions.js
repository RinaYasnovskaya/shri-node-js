export const showSettings = (needShow) => ({
  type: 'SHOW_SETTINGS',
  payload: needShow
});

export const mainPage = () => ({
  type: 'MAIN_PAGE'
});

export const setRebuild = (value) => ({
  type: 'SET_REBUILD',
  payload: value
});
