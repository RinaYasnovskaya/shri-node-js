import { it, expect } from '@jest/globals';
import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { storeReducer } from './src/reducer';
import { reducer as formReducer } from 'redux-form';
import { App, Header, BuildList } from './src/components';
import { BrowserRouter } from "react-router-dom";
import { Router } from "react-router";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render, screen } from '@testing-library/react';
import events from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

it('при отсутствии настроек титул = School CI server', () => {
  const rootReducer = combineReducers({
    main: storeReducer,
    form: formReducer,
  })
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const app = (
    <Provider store = { store }>
      <BrowserRouter>
        <Header
          settings={true}
          rebuild={false}
          repoName={''}
          settingsExist={true}
        />
      </BrowserRouter>
    </Provider>
  );

  const { container, getByRole } = render(app);

  const title = getByRole('heading');
  expect(title.textContent).toBe('School CI server');
});

it('при отсутствии настроек на главной нет кнопки Run Build', () => {
  const rootReducer = combineReducers({
    main: storeReducer,
    form: formReducer,
  })
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const app = (
    <Provider store = { store }>
      <BrowserRouter>
        <Header
          settings={true}
          rebuild={false}
          repoName={''}
          settingsExist={true}
        />
      </BrowserRouter>
    </Provider>
  );

  const { container } = render(app);

  const title = container.querySelector('.button__run');
  expect(title).toBeFalsy();
});

it('при клике по кнопке Settings переходит на страницу /settings', () => {
  const rootReducer = combineReducers({
    main: storeReducer,
    form: formReducer,
  })
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const history = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0
  });

  const app = (
    <Provider store = { store }>
      <Router history={history} >
        <App />
      </Router>
    </Provider>
  );

  const { container, getByTestId } = render(app);
  events.click(getByTestId('link-settings'));
  const titleSettings = getByTestId('ttl-settings');
  expect(titleSettings).toBeTruthy();
});

it('при клике по кнопке Run Build открывается модальное окно', () => {
  const rootReducer = combineReducers({
    main: storeReducer,
    form: formReducer,
  })
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const app = (
    <Provider store = { store }>
      <BrowserRouter>
        <Header
          settings={true}
          rebuild={false}
          repoName={'repo-name'}
          settingsExist={false}
        />
      </BrowserRouter>
    </Provider>
  );

  const { container, getByTestId } = render(app);
  events.click(getByTestId('btn-run'));
  const windowModal = getByTestId('wndw-modal');
  expect(windowModal).toBeTruthy();
});

const renderWithRedux = (
  component,
  { defaultState, store = createStore(storeReducer, defaultState, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>
          {component}
        </BrowserRouter>
      </Provider>),
    store
  }
};

it('добавление билда в очередь отражается в списке билдов', () => {
  const main = {
     main: {
      builds: [{
        id: 'qwerty-qwerty',
        buildNumber: '1',
        commitMessage: 'delete',
        commitHash: 'qwertyu-qwertyu-qwertyu',
        branchName: 'main',
        authorName: 'author',
        status: 'waiting',
        start: '2021-07-02T20:21:13.055Z',
        duration: '30'
      }]
    }
  };

  const { container } = renderWithRedux(<BuildList />, {
    defaultState: {
      ...main
    }
  });

  const { main: { builds } } = main;
  builds.push({
    id: 'qwerty-qwerty2',
    buildNumber: '2',
    commitMessage: 'update',
    commitHash: 'qwertyu-qwertyu-qwertyu',
    branchName: 'main',
    authorName: 'author',
    status: 'waiting',
    start: '2021-07-02T20:21:13.055Z',
    duration: '40'
  });

  const { container: containerAfter } = renderWithRedux(<BuildList />, {
    defaultState: {
      ...main
    }
  });

  const countBuildsPrev = container.getElementsByClassName('card').length;
  const countBuildsAfter = containerAfter.getElementsByClassName('card').length;

  expect(countBuildsAfter-countBuildsPrev).toEqual(1);
});

