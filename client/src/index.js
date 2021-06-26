import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { storeReducer } from './reducer';
import thunk from 'redux-thunk';

const store = createStore(storeReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = { store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
