import React from 'react';
import { FaUsers, FaBook, FaLightbulb, FaHandshake, FaRegCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <h1 style={styles.title}>About Us</h1>
        <div style={styles.content}>
          <div style={styles.leftColumn}>
            <h2 style={styles.subtitle}>Welcome to VidhyaSthali Library</h2>
            <p style={styles.paragraph}>
              At VidhyaSthali Library, we are dedicated to fostering a love for reading and lifelong learning. Established in [Year], our library serves as a vital resource for the community, offering a wide range of books, digital resources, and programs designed to inspire and educate.
            </p>
            
            <h3 style={styles.subheading}>Our Mission</h3>
            <p style={styles.paragraph}>
              Our mission is to provide equitable access to information and resources, promoting literacy and learning for all. We strive to create a welcoming environment where everyone feels valued and inspired to explore new ideas.
            </p>

            <h3 style={styles.subheading}>Visit Us</h3>
            <p style={styles.paragraph}>
              We invite you to explore our library! Located at [Address], our doors are open to everyone. Join us for events, discover new books, or find a cozy corner to read. We look forward to welcoming you to VidhyaSthali Library!
            </p>
          </div>

          <div style={styles.rightColumn}>
            <h3 style={styles.subheading}>Our Values</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><FaUsers style={styles.icon} /> **Inclusivity:** We embrace diversity and welcome everyone.</li>
              <li style={styles.listItem}><FaHandshake style={styles.icon} /> **Integrity:** We uphold the highest standards of ethics and professionalism.</li>
              <li style={styles.listItem}><FaLightbulb style={styles.icon} /> **Innovation:** We continuously evolve to meet the needs of our community.</li>
              <li style={styles.listItem}><FaRegCalendarAlt style={styles.icon} /> **Community:** We engage with and serve our community actively.</li>
            </ul>

            <h3 style={styles.subheading}>Our Services</h3>
            <ul style={styles.list}>
              <li style={styles.listItem}><FaBook style={styles.icon} /> **Diverse Collection:** Access to thousands of books and digital resources.</li>
              <li style={styles.listItem}><FaLightbulb style={styles.icon} /> **Research Assistance:** Help with information literacy and research.</li>
              <li style={styles.listItem}><FaRegCalendarAlt style={styles.icon} /> **Events and Workshops:** Engage in community events for all ages.</li>
              <li style={styles.listItem}><FaMapMarkerAlt style={styles.icon} /> **Study Spaces:** Quiet areas for individual and group study.</li>
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
