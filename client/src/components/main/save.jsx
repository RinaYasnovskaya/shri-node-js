import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Footer, Header, StartPage, BuildList, BuildDetails, Settings } from '../index';
import '../../assets/scss/main.scss';
import { useSelector } from 'react-redux';

export const App = () => {
  let title = "School CI server";
  const { showSettings, runBuild, rebuild, isBuildExist } = useSelector((state) => state);

  return (
    <div id="main-block">
      <Switch>
        <Route exact path="/" component={() => {
          return (
            <div className="header-content">
              <Header title={ isBuildExist ? null : title } settings={showSettings} runBuild={runBuild} />
              {
                isBuildExist ? <BuildList /> : <StartPage />
              }
            </div>
          )
        }} />
        <Route path="/build/:buildId" component={() => {
          return (
            <div className="header-content">
              <Header settings={showSettings} rebuild={rebuild} />
              <BuildDetails />
            </div>
          )
        }} />
        <Route exact path="/settings" component={() => {
          return (
            <div className="header-content">
              <Header title={title} settings={showSettings} />
              <Settings />
            </div>
          )
        }} />
      </Switch>
      <Footer />
    </div>
  );
}
