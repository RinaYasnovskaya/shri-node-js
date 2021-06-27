const defaultState = {
  showSettings: true,
  rebuild: false,
  builds: [],
  settings: {},
  settingsIsDone: null,
  settingsResult: {}
};

export const storeReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SHOW_SETTINGS':
      return {
        ...state,
        rebuild: defaultState.rebuild,
        showSettings: action.payload,
      }
    case 'MAIN_PAGE':
      return {
        ...state,
        ...defaultState,
        builds: state.builds,
        settings: state.settings,
      }
    case 'SET_REBUILD':
      return {
        ...state,
        rebuild: action.payload
      }
    case 'SET_LIST_BUILDS':
      return {
        ...state,
        builds: action.payload
      }
    case 'SET_SETTINGS':
      return {
        ...state,
        settings: action.payload
      }
    case 'SETTINGS_IS_DONE':
      return {
        ...state,
        settingsIsDone: action.payload
      }
    case 'SETTINGS_RESULT':
      return {
        ...state,
        settingsResult: action.payload
      }
    default:
      return state;
  }
};
