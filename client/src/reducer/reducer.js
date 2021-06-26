const defaultState = {
  showSettings: true,
  rebuild: false,
  isBuildExist: true,
  builds: [],
  settings: {},
};

export const storeReducer = (state = defaultState, action) => {
  switch(action.type) {
    case 'SHOW_SETTINGS':
      return {
        ...state,
        showSettings: action.payload,
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
