const defaultState = {
  showSettings: true,
  rebuild: false,
  builds: null,
  settings: {},
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
    default:
      return state;
  }
};
