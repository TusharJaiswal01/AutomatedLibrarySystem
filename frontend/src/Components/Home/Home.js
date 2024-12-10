import React, { useEffect } from 'react';
import './Home.css'; // Ensure this file contains any additional styles you might need
import { FaBookOpen } from 'react-icons/fa'; // Importing an icon

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
        <img src="uiImage1.jpg" alt="Library" style={styles.image} />
      </div>
      <div style={styles.textContainer}>
        <h1 style={{ ...styles.title, opacity: animate ? 1 : 0, transform: animate ? 'translateY(0)' : 'translateY(-20px)', transition: 'transform 0.5s, opacity 0.5s' }}>
          <FaBookOpen style={styles.icon} />
          Welcome to VidhyaSthali
        </h1>
        <p style={{ ...styles.subtitle, opacity: animate ? 1 : 0, transition: 'opacity 0.5s 0.3s' }}>
          Discover a world of knowledge and learning.
        </p>
        <p style={{ ...styles.description, opacity: animate ? 1 : 0, transition: 'opacity 0.5s 0.5s' }}>
          Join us in nurturing a love for reading and exploration. Our library offers a vast collection of resources designed to help you grow, learn, and succeed in your academic journey. Whether you are looking for textbooks, reference materials, or the latest fiction, we have it all!
        </p>
        <button style={styles.button}>Explore Our Collection</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between', // Space between the text and image
    alignItems: 'center', // Center align items vertically
    height: '100vh', // Full height of the viewport
    boxSizing: 'border-box',
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)', // Gradient background
    padding: '20px',
    overflow: 'hidden',
    flexDirection: 'row', // Default to row for larger screens
  },
  textContainer: {
    flex: 1,
    padding: '20px',
    maxWidth: '550px',
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
  },
  image: {
    maxWidth: '85%',
    height: 'auto',
    borderRadius: '10px',
    maxHeight: '550px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    color: '#333333',
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
    padding: '10px 20px',
    fontSize: '1rem',
    color: 'black',
    background: 'linear-gradient(to right, #2980b9, #6dd5ed)',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: '10px',
    fontSize: '2rem',
    color: '#2980b9',
  },
  '@media (max-width: 768px)': { // Mobile adjustments
    container: {
      flexDirection: 'column', // Stack content vertically on small screens
      padding: '10px',
      height: 'auto', // Let the height adjust to content
    },
    imageContainer: {
      marginLeft: '0',
      justifyContent: 'center', // Center the image on mobile
      marginTop: '20px',
    },
    textContainer: {
      padding: '10px',
      alignItems: 'center', // Center align text on mobile
      textAlign: 'center',
    },
    title: {
      fontSize: '2rem', // Smaller font size for title
    },
    subtitle: {
      fontSize: '1.2rem', // Smaller font size for subtitle
    },
    description: {
      fontSize: '1rem', // Smaller font size for description
      maxWidth: '100%',
    },
    button: {
      width: '100%', // Full-width button on mobile
      fontSize: '1rem',
      padding: '8px 0',
    },
  },
};

export default Home;
