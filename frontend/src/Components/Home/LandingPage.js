import React from 'react';

const LandingPage = () => {
  // Inline CSS styles for a cleaner design
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f4f4f4',
      padding: '0',
      margin: '0',
      color: '#333',
    },
    header: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '20px',
      fontSize: '2.5em',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    },
    heroSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '70vh',
      backgroundColor: '#6c757d',
      color: '#fff',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    },
    heroTitle: {
      fontSize: '3em',
      margin: '0',
    },
    heroSubtitle: {
      fontSize: '1.5em',
      margin: '10px 0',
    },
    button: {
      padding: '15px 30px',
      fontSize: '1em',
      margin: '10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: '#28a745',
      color: '#fff',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
    featuresSection: {
      display: 'flex',
      justifyContent: 'space-around',
      margin: '40px 0',
      padding: '20px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      borderRadius: '5px',
    },
    featureCard: {
      flex: '1',
      margin: '0 10px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      textAlign: 'left',
    },
    footer: {
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#343a40',
      color: '#fff',
      position: 'relative',
      bottom: '0',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        Professional Landing Page
      </header>

      <section style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Welcome to Our Service</h1>
        <p style={styles.heroSubtitle}>Your satisfaction is our priority!</p>
        <button style={styles.button}>Get Started</button>
        <button style={{ ...styles.button, backgroundColor: '#007bff' }}>Learn More</button>
      </section>

      <section style={styles.featuresSection}>
        <div style={styles.featureCard}>
          <h3>Feature One</h3>
          <p>Brief description of feature one that provides value to the user.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Feature Two</h3>
          <p>Brief description of feature two that highlights its benefits.</p>
        </div>
        <div style={styles.featureCard}>
          <h3>Feature Three</h3>
          <p>Brief description of feature three to engage the audience.</p>
        </div>
      </section>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
