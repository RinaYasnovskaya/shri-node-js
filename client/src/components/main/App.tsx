import * as React from 'react';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../assets/scss/main.scss';
import {
  Footer,
  Header,
  StartPage,
  BuildList,
  BuildDetails,
  Settings,
} from '../';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingsAsync } from '../../actions';
import { RootState } from '../..';

export const App: React.FC = () => {
  const showSettings = useSelector((state: RootState) => state.main.showSettings);
  const rebuild = useSelector((state: RootState) => state.main.rebuild);
  const settings = useSelector((state: RootState) => state.main.settings);
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
};
