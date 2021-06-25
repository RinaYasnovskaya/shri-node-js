const defaultState = {
  showSettings: true,
  rebuild: false,
  isBuildExist: true,
};

export const storeReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SHOW_SETTINGS':
      return {
        ...state,
        showSettings: action.payload.show,
        isSetting: action.payload.isSettings
      }
    case 'MAIN_PAGE':
      return {
        ...state,
        ...defaultState,
        isBuildExist: state.isBuildExist
      }
    case 'SET_REBUILD':
      return {
        ...state,
        rebuild: action.payload
      }
    default:
      return state;
  }
};
