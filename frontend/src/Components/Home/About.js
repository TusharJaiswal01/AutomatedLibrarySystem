import React from 'react';
import { FaUsers, FaBook, FaLightbulb, FaHandshake, FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>About Us</h1>
        <div style={styles.content}>
          <div style={styles.leftColumn}>
            <h2 style={styles.subtitle}>Welcome to LibraryXauto</h2>
            <p style={styles.paragraph}>
              At LibraryXauto, we aim to simplify and enhance your library experience through automation. Whether you're looking for books, notes from experts, or need an extension for your book return, we have you covered. Our platform is designed to make the process seamless and efficient for everyone.
            </p>
            
            <h3 style={styles.subheading}>Our Mission</h3>
            <p style={styles.paragraph}>
              Our mission is to bring innovation to library management. We strive to offer a platform that not only manages books and resources but also supports your educational journey by providing essential services like emergency book extensions, request queues, and easy data uploads.
            </p>

            <h3 style={styles.subheading}>Visit Us</h3>
            <p style={styles.paragraph}>
              Explore the world of learning with LibraryXauto. Our online platform is accessible anytime, anywhere. Join us and enjoy features like automatic notifications for book returns, an easy way to request unavailable books, and a comprehensive catalog for students and staff alike.
            </p>
          </div>

          <div style={styles.rightColumn}>
            <h3 style={styles.subheading}>Our Values</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><FaUsers style={styles.icon} /> Inclusivity: We believe in making library resources available to all users equally.</li>
              <li style={styles.listItem}><FaHandshake style={styles.icon} /> Integrity: We are committed to providing transparent and reliable services.</li>
              <li style={styles.listItem}><FaLightbulb style={styles.icon} /> Innovation: We use automation and technology to improve your library experience.</li>
              <li style={styles.listItem}><FaRegCalendarAlt style={styles.icon} /> Community: We actively serve and engage with our library community.</li>
            </ul>

            <h3 style={styles.subheading}>Our Specialties</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><FaBook style={styles.icon} /> Automated Book Management: Easy access to books and resources with real-time availability tracking.</li>
              <li style={styles.listItem}><FaLightbulb style={styles.icon} /> Notes Section: Access to curated notes and educational resources from previous readers.</li>
              <li style={styles.listItem}><FaRegCalendarAlt style={styles.icon} />Advanced Dashboard : Our advanced dashboard allows students to effortlessly track their issued books and complete borrowing history in one place.</li>
              <li style={styles.listItem}><FaMapMarkerAlt style={styles.icon} /> Pre Issue Books: Automatically join a queue for unavailable books and get notified when available.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh', // Full height of the viewport
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Gradient background
    display: 'flex',
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
    padding: '40px 20px', // Space around the content
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Georgia, serif',
    lineHeight: '1.5',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background color with some transparency
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', // Enhanced shadow for a deeper effect
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2.5rem',
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px',
  },
  leftColumn: {
    flex: '1',
    paddingRight: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  rightColumn: {
    flex: '1',
    paddingLeft: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '15px',
    color: '#34495e',
    textAlign: 'left',
  },
  subheading: {
    fontSize: '1.5rem',
    marginTop: '20px',
    color: '#2980b9',
    textAlign: 'left',
  },
  paragraph: {
    fontSize: '1.1rem',
    marginBottom: '10px',
    color: '#555',
    textAlign: 'justify',
  },
  list: {
    marginLeft: '20px',
    color: '#555',
  },
  listItem: {
    fontSize: '1.1rem',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '10px',
    fontSize: '1.3rem',
    color: '#2980b9',
  },
};

export default About;
