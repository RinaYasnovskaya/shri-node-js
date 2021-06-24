import React from 'react';
import { Route } from 'react-router-dom';
import { Footer, Header, StartPage, BuildList, BuildDetails, Settings } from '../index';
import '../../assets/scss/main.scss';

export const App = () => {
  let title = "School CI server";
  let buildExist = true;
  let runBuild = false;

  if (buildExist) {
    runBuild = true;
  }

  return (
    <div id="main-block">
      <Route exact path="/" component={() => {
        return (
          <div className="header-content">
            <Header title={ buildExist ? null : title } settings={true} runBuild={runBuild} />
            {
              buildExist ? <BuildList /> : <StartPage />
            }
          </div>
        )
      }} />
      <Route path="/build/:buildId" component={() => {
        return (
          <div className="header-content">
            <Header settings={true} rebuild={true} />
            <BuildDetails />
          </div>
        )
      }} />
      <Route exact path="/settings" component={() => {
        return (
          <div className="header-content">
            <Header title={title} settings={false} />
            <Settings />
          </div>
        )
      }} />
      <Footer />
    </div>
  );
}
