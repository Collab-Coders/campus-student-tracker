import React from 'react';
import { Link } from 'react-router-dom';

// hooks
import { useStore } from '../hooks/useStore';

import { notFoundStyles } from '../styling/styles';

const NotFound = () => {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const styles = notFoundStyles(isDarkMode);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" style={styles.homeLink}>
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;