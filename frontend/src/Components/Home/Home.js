import React, { useEffect } from 'react';
import './Home.css'; // Ensure this file contains any additional styles you might need
import { FaBookOpen } from 'react-icons/fa'; // Importing an icon
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";

const Home = () => {
  const [animate, setAnimate] = React.useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // Delay for animation to start after component mounts

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src="uiImage1.jpg" alt="Library" style={{ ...styles.image, width: '600px' }} /> {/* Force width to 600px */}
      </div>
      <div style={styles.textContainer}>
        <h1 style={{ ...styles.title, opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(-20px)', transition: 'transform 0.5s, opacity 0.5s' }}>
          <FaBookOpen style={styles.icon} />
          Welcome to LibraryXauto
        </h1>
        <p style={{ ...styles.subtitle, opacity: animate ? 1 : 0, transition: 'opacity 0.5s 0.3s' }}>
          Discover the world of knowledge and learning.
        </p>
        <p style={{ ...styles.description, opacity: animate ? 1 : 0, transition: 'opacity 0.5s 0.5s' }}>
        LibraryXauto is an automated platform that streamlines library management. It tracks book availability, provides notes by previous readers, and supports emergency extensions for book return dates. Features include report generation for all or specific departments, Excel upload for book and student data, and a request queue for unavailable books with email notifications when available.
        </p>

        <Link to='/books'>
            <button style={styles.button}>Get Started <FaArrowCircleRight size={25} style={{marginLeft:"15px"}} /></button>
        </Link>
        
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: '100vh',
    boxSizing: 'border-box',
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
    padding: '20px',
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft : "-2rem",
    
    
  },
  textContainer: {
    flex: 1,
    padding: '20px',
    maxWidth: '660px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '60%',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    marginLeft: '150px',
    marginTop: '90px',
    maxWidth: '500px', // Set maxWidth for the container to 600px
  },
  image: {
    height: '500px',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333333',
    fontWeight : "bold",
    margin: '0 0 10px',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.5s, opacity 0.5s',
    
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#666666',
    margin: '0 0 10px',
    transition: 'opacity 0.5s 0.3s',
  },
  description: {
    fontSize: '1.2rem',
    color: '#333333',
    maxWidth: '600px',
    margin: '0 0 20px',
    transition: 'opacity 0.5s 0.5s',
  },
  button: {
    padding: '20px 35px',
    marginTop : '1rem',
    fontSize: '1.5rem',
    color: 'black',
    
    background: 'linear-gradient(to right, #2980b9, #6dd5ed)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    alignSelf: 'flex-start',
    display : 'flex',
    alignItems : 'center',
  
    
  },
  icon: {
    marginRight: '10px',
    fontSize: '2rem',
    color: '#2980b9',
  },
  '@media (max-width: 768px)': { // Mobile adjustments
    container: {
      flexDirection: 'column',
      padding: '10px',
      height: 'auto',
    },
    imageContainer: {
      marginLeft: '0',
      justifyContent: 'center',
      marginTop: '20px',
    },
    textContainer: {
      padding: '10px',
      alignItems: 'center',
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem',
    },
    subtitle: {
      fontSize: '1.2rem',
    },
    description: {
      fontSize: '1rem',
      maxWidth: '100%',
    },
    button: {
      width: '100%',
      fontSize: '1rem',
      padding: '8px 0',
    },
  },
};

export default Home;
