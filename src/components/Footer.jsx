import "./CSS/Footer.css";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-title">Connect with me</h3>
        <div className="social-links">
          <a
            href="https://linkedin.com/in/nikhil-khobragade-360302256"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon linkedin"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/nikhilend"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon github"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/nikhilkhobragade02/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} Nikhil K • All rights reserved
      </p>
    </footer>
  )
}

export default Footer