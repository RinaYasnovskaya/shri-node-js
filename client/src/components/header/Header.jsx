import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Modal } from '../index';
import { mainPage, showSettings } from '../../reducer';
import './header.scss';
import { runBuild } from '../builds/runBuild';

export const Header = ({settings, rebuild, repoName, settingsExist}) => {
  const textClassSettings = ((repoName || rebuild) && settings)
                            ? ['little', '']
                            : ['long', 'Settings'];

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const buildsDetails = useSelector((state) => state.main.buildDetails);
  const commitHashBuild = buildsDetails ? buildsDetails.data?.commitHash : '';

  const path = window.location.href.split('/');
  const url = path[path.length-1];
  const titleHead = "School CI server";

  const onClickLinkSettings = () => {
    dispatch(showSettings(false));
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

  const onClickRebuild = (e) => {
    e.preventDefault();
    dispatch(runBuild(commitHashBuild, history));
  }

  return (
    <div className="header">
      <Link to="/" className="header__title" onClick={onClickTitle}>
        {((url == 'settings') || settingsExist)
          ? <h1 data-testid="title-main" className="header__title-main">{titleHead}</h1>
          : <h1 className="header__title-repo" >{repoName}</h1>}
      </Link>
      <div className="header__buttons">
        { (!rebuild && url !== 'settings' && !settingsExist)
          ? <button
              data-testid="btn-run"
              className="button button_light button__run"
              onClick={onClickModal}
            >Run Build</button>
          : ''}
        { rebuild
          ? <button
              data-testid="btn-rebuild"
              className="button button_light button__rebuild"
              onClick={onClickRebuild}
            >Rebuild</button>
          : ''}
        { (settings && url !== 'settings')
          ? <Link
              data-testid="link-settings"
              to="/settings"
              className={
                `button button_light button__settings button__settings_${textClassSettings[0]}`
              }
              onClick={onClickLinkSettings}
            >{textClassSettings[1]}</Link>
          : ''}
      </div>
      <Modal isOpen={isOpen} onCancel={onCancelModal} />
    </div>
  );
};
