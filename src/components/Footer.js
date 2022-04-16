import React from "react";
import { BsGithub, BsInstagram, BsHeartFill } from "react-icons/bs";

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="social-icons-container">
          <BsGithub />
          <BsInstagram />
        </div>
        <p className="footer-text-info">
          This is a personal project website made for practice. Application
          holds all entered tasks and user can filter them by day, remove them,
          sort by day or name or check as done.
        </p>
        <p className="footer-thanks-text">
          Thank you for having a look <BsHeartFill />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
