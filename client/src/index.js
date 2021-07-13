import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { storeReducer } from './reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  main: storeReducer,
  form: formReducer,
})
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  // <React.StrictMode>
    <Provider store = { store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
