import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, StartPage, BuildList, BuildDetails, Settings } from '../index';
import '../../assets/scss/main.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingsAsync } from '../../actions';

export const App = () => {
  const showSettings = useSelector((state) => state.showSettings);
  const rebuild = useSelector((state) => state.rebuild);
  const isBuildExist = useSelector((state) => state.isBuildExist);
  const { repoName } = useSelector((state) => state.settings);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSettingsAsync());
  },[]);

  return (
    <div id="main-block">
      <Header
        settings={showSettings}
        rebuild={rebuild}
        isBuildExist={isBuildExist}
        repoName={repoName}
      />
      <div className="header-content">
        <Switch>
          <Route exact path="/" component={() => {
            return (
              <>
                {
                  isBuildExist ? <BuildList /> : <StartPage />
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
