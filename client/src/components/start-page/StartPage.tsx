import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { showSettings } from '../../reducer';
import './start-page.scss';

export const StartPage: React.FC = () => {
  const dispatch = useDispatch();

  const onClickLinkSettings = () => {
    dispatch(showSettings(false));
  };

  return (
    <div className="start-page">
      <div className="start-page__inner">
        <img src="../../assets/img/logo 3.svg" alt="" />
        <span>Configure repository connection and synchronization settings</span>
        <Link
          to="/settings"
          className="button button__start button_bright"
          onClick={onClickLinkSettings}
        >Open Settings</Link>
      </div>
    </div>
  );
};
