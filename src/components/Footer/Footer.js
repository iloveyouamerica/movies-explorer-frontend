import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__wrapper">
        <span className="footer__copyright">&copy; 2023</span>
        <div className="footer__nav">
          <Link to="/" className="footer__link" target="_blank">Яндекс.Практикум</Link>
          <Link to="/" className="footer__link" target="_blank">Github</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
