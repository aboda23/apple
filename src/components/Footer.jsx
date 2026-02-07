import React from 'react'
import logo from "../assets/images/logo.svg";
import { footerLinks } from '../Store';

const Footer = () => {
  return (
      <footer>
          <div className="info">
              <p>More ways to: Find an Apple or other retailer near you. Or call 000800 040 1966. </p>
              <img src={logo} alt="" />
          </div>
          <hr />
          <div className="links">
        <p>Copyright © 2027 Apple Inc. All rights reserved.</p>
        <ul>
          {footerLinks.map(({ label, link }) => (
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
          </div>
      </footer>
  );
}

export default Footer