import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { buildSettings } from '../../js/test-backend';
import { Modal } from '../index';
import './header.scss';

export const Header = ({title, settings, runBuild, rebuild}) => {
  const { data: { repoName } } = buildSettings;
  const textClassSettings = ((runBuild || rebuild) && settings) ? ['little', ''] : ['long', 'Settings'];
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    return setIsOpen(true);
  };

  const onCancel = () => {
    return setIsOpen(false);
  }

  return (
    <div className="header">
      <div className="header__title">
        {title ? <h1 className="header__title-main">{title}</h1>
              : <h2 className="header__title-repo">{repoName}</h2>}
      </div>
      <div className="header__buttons">
        { runBuild ? <button className="button button_light button__run" onClick={onClick} >Run Build</button> : ''}
        { rebuild ? <button className="button button_light button__rebuild">Rebuild</button> : ''}
        { settings ? <Link  to="/settings"
            className={
              `button button_light button__settings button__settings_${textClassSettings[0]}`
            }>{textClassSettings[1]}</Link> : ''}
      </div>
      <Modal isOpen={isOpen} onCancel={onCancel} />
    </div>
  );
};
