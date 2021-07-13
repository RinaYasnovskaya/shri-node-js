import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__left-elem">
        <Link className="footer__support" to="/support">Support</Link>
        <Link className="footer__learning" to="/learning">Learning</Link>
        <button className="footer__lang">Русская версия</button>

      </div>
      <div className="footer__right-elem">
        <span className="footer__name">
          @2021 RinaYasnovskaya
        </span>
      </div>
    </div>
  );
};
