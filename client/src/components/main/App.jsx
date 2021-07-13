import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, StartPage, BuildList, BuildDetails, Settings } from '../index';
import '../../assets/scss/main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingsAsync } from '../../actions';

export const App = () => {
  const showSettings = useSelector((state) => state.main.showSettings);
  const rebuild = useSelector((state) => state.main.rebuild);
  const settings = useSelector((state) => state.main.settings);
  const check = Object.keys(settings).length === 0;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettingsAsync());
  },[]);

  return (
    <div id="main-block">
      <Header
        settings={showSettings}
        rebuild={rebuild}
        repoName={settings.repoName}
        settingsExist={check}
      />
      <div className="header-content">
        <Switch>
          <Route exact path="/" component={() => {
            return (
              <>
                {
                  !check ? <BuildList /> : <StartPage />
                }
              </>
            )
          }} />
          <Route path="/build/:buildId" component={() => <BuildDetails />} />
          <Route exact path="/settings" component={() => <Settings />} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
