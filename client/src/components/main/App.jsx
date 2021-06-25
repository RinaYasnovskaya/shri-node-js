import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, StartPage, BuildList, BuildDetails, Settings } from '../index';
import '../../assets/scss/main.scss';
import { useSelector } from 'react-redux';

export const App = () => {
  const { showSettings, rebuild, isBuildExist } = useSelector((state) => state);

  return (
    <div id="main-block">
      <Header
        settings={showSettings}
        rebuild={rebuild}
        isBuildExist={isBuildExist}
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
