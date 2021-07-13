import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Modal } from '../index';
import { mainPage, showSettings } from '../../reducer';
import './header.scss';
import { runBuild } from '../../actions';

export const Header = ({settings, rebuild, repoName, settingsExist}) => {
  const textClassSettings = ((repoName || rebuild) && settings)
                            ? ['little', '']
                            : ['long', 'Settings'];

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const buildsDetails = useSelector((state) => state.main.buildDetails);
  const commitHashBuild = buildsDetails ? buildsDetails.data?.commitHash : '';
  const location = useLocation();

  const path = location.pathname;
  console.log(path);
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
        {((path == '/settings') || settingsExist) ? <h1 className="header__title-main">{titleHead}</h1>
              : <h2 className="header__title-repo" >{repoName}</h2>}
      </Link>
      <div className="header__buttons">
        { (!rebuild && path !== '/settings' && !settingsExist)
          ? <button className="button button_light button__run" onClick={onClickModal}>Run Build</button>
          : ''}
        { rebuild
          ? <button className="button button_light button__rebuild" onClick={onClickRebuild}>Rebuild</button>
          : ''}
        { (settings && path !== '/settings')
          ? <Link  to="/settings"
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
