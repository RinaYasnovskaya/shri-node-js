import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mainPage } from '../../reducer';
import './settings.scss';

export const Settings = () => {
  const dispatch = useDispatch();

  const onClickLink = () => {
    dispatch(mainPage());
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form action="" className="form">
      <div className="form__title">
        <p className="form__title-main" id="title_settings">Settings</p>
        <p className="form__title-description" id="description_settings">
          Configure repository connection and synchronization settings.
        </p>
      </div>
      <div className="form__inner">
        <label htmlFor="repo-name">
          GitHub repository <span className="red-star">*</span>
        </label>
        <input required id="repo-name" type="text" placeholder="user-name/repo-name" />
        <label id="build_command">
          Build Command <span className="red-star">*</span>
        </label>
        <input required htmlFor="build-command" type="text" placeholder="build command: npm start" />
        <label htmlFor="main-branch">Main Branch</label>
        <input type="text" id="main-branch" placeholder="main branch: main" />
        <label htmlFor="time">
          Synchronize every <input id="time" type="number" /> minutes
        </label>
      </div>
        <input type="submit" value="Save" className="button button_bright" onClick={submitForm} />
        <Link to="/" onClick={onClickLink} className="button button_light cancel">Cancel</Link>
    </form>
  );
};