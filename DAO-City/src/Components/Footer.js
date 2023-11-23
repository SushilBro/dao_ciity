// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-middle">&copy; {new Date().getFullYear()} DAO City. All rights reserved.</div>
      <div className="footer-right"></div>
    </footer>
  );
};

export default Footer;
