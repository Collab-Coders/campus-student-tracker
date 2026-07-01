export const studentStyles = (isDarkMode: boolean) => {
  return {
    container: {
      padding: '12px 4px',
      fontFamily: 'system-ui, sans-serif',
    },
    headerArea: {
      marginBottom: '36px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '800',
      margin: '0 0 8px 0',
      color: isDarkMode ? '#ffffff' : '#2d3748',
      letterSpacing: '-0.02em',
    },
    subtitle: {
      margin: 0,
      color: isDarkMode ? '#94a3b8' : '#718096',
      fontSize: '16px',
      fontWeight: '500',
    },
    editButton: {
      padding: '10px 16px',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? 'rgba(148, 163, 184, 0.1)' : '#f0eff5',
      color: isDarkMode ? '#cbd5e0' : '#2d3748',
      border: isDarkMode ? '1px solid #334155' : '1px solid #dcdbe0',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
  };
};