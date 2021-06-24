import React from 'react';
import { Link } from 'react-router-dom';
import './start-page.scss';

export const StartPage = () => {
  return (
    <div className="start-page">
      <div className="start-page__inner">
        <img src="../../assets/img/logo 3.svg" alt="" />
        <span>Configure repository connection and synchronization settings</span>
        <Link to="/settings" className="button button__start button_bright">Open Settings</Link>
      </div>
    </div>
  );
};
