import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        <div style={styles.footerLeft}>
          <h2 style={styles.footerTitle}>LibraryXauto</h2>
          <p>Your gateway to knowledge and education.</p>
          <p>Visit us at Acropolis Institute of Technology and Research, Indore, 452010</p>
        </div>

        <div style={styles.footerCenter}>
          <h3 style={styles.footerSubtitle}>Quick Links</h3>
          <ul style={styles.quickLinksList}>
            <li><a href="#home" style={styles.link}>Home</a></li>
            <li><a href="#about" style={styles.link}>About Us</a></li>
            <Link to='/books'>
            <li><a href="#books" style={styles.link}>Books</a></li>
            </Link>
            <li><a href="#contact" style={styles.link}>Contact Us</a></li>
          </ul>
        </div>

        <div style={styles.footerRight}>
          <h3 style={styles.footerSubtitle}>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="https://www.instagram.com" style={styles.socialLink}><FaInstagram size={24} color="#e4405f" /></a>
            <a href="https://www.twitter.com" style={styles.socialLink}><FaTwitter size={24} color="#1da1f2" /></a>
            <a href="https://www.facebook.com" style={styles.socialLink}><FaFacebook size={24} color="#1877f2" /></a>
            <a href="https://www.linkedin.com" style={styles.socialLink}><FaLinkedin size={24} color="#0077b5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footerContainer: {
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '40px 20px',
    textAlign: 'center',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
  },
  footerLeft: {
    flex: 1,
    minWidth: '250px',
  },
  footerTitle: {
    fontSize: '1.8rem',
    marginBottom: '10px',
    color: '#ecf0f1',
  },
  footerCenter: {
    flex: 1,
    minWidth: '250px',
  },
  footerSubtitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#ecf0f1',
  },
  quickLinksList: {
    listStyleType: 'none',
    padding: '0',
  },
  link: {
    textDecoration: 'none',
    color: '#ecf0f1',
    fontSize: '1rem',
    display: 'block',
    marginBottom: '10px',
    transition: 'color 0.3s',
  },
  linkHover: {
    color: '#3498db',
  },
  footerRight: {
    flex: 1,
    minWidth: '250px',
  },
  socialIcons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '15px',
  },
  socialLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
};

export default Footer;
