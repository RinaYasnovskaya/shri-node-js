import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { buildSettings } from '../../js/test-backend';
import { Modal } from '../index';
import { mainPage, showSettings } from '../../reducer';
import './header.scss';

export const Header = ({settings, rebuild, isBuildExist}) => {
  const { data: { repoName } } = buildSettings;
  const textClassSettings = ((isBuildExist || rebuild) && settings) ? ['little', ''] : ['long', 'Settings'];
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const path = window.location.href.split('/');
  const url = path[path.length-1];
  const titleHead = "School CI server";

  const onClickLink = () => {
    dispatch(showSettings({show: false}));
  };

  const onClickTitle = () => {
    dispatch(mainPage());
  };

  const onClickModal = () => {
    return setIsOpen(true);
  };

  const onCancelModal = () => {
    return setIsOpen(false);
  }

  return (
    <div className="header">
      <Link to="/" className="header__title" onClick={onClickTitle}>
        {(url == 'settings') ? <h1 className="header__title-main">{titleHead}</h1>
              : <h2 className="header__title-repo" >{repoName}</h2>}
      </Link>
      <div className="header__buttons">
        { !rebuild
          ? <button className="button button_light button__run" onClick={onClickModal}>Run Build</button>
          : ''}
        { rebuild ? <button className="button button_light button__rebuild">Rebuild</button> : ''}
        { (settings && url !== 'settings')
          ? <Link  to="/settings"
              className={
                `button button_light button__settings button__settings_${textClassSettings[0]}`
              }
              onClick={onClickLink}
            >{textClassSettings[1]}</Link>
          : ''}
      </div>
      <Modal isOpen={isOpen} onCancel={onCancelModal} />
    </div>
  );
};
