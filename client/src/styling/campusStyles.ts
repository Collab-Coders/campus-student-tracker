export const campusStyles = (isDarkMode: boolean) => {
  return {
    // Campus
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '28px',
    },
    card: {
      backgroundColor: isDarkMode ? '#111c2a' : '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: isDarkMode 
        ? '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)'
        : '0 8px 20px rgba(45, 55, 72, 0.02)',
      border: isDarkMode ? '1px solid #1e293b' : '1px solid #d8e6e2',
      display: 'flex',
      flexDirection: 'column' as const,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    imageContainer: {
      width: '100%',
      height: '190px',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    contentArea: {
      padding: '24px',
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column' as const,
    },
    campusName: {
      margin: '0 0 8px 0',
      fontSize: '20px',
      fontWeight: '700',
      color: isDarkMode ? '#f8fafc' : '#2d3748',
      letterSpacing: '-0.01em',
    },
    address: {
      margin: '0 0 16px 0',
      fontSize: '13px',
      color: isDarkMode ? '#818cf8' : '#4a5568',
      fontWeight: '600',
      opacity: isDarkMode ? 1 : 0.8,
    },
    description: {
      margin: '0 0 24px 0',
      fontSize: '14px',
      color: isDarkMode ? '#94a3b8' : '#4a5568',
      lineHeight: '1.6',
      flexGrow: 1,
    },
    actionRow: {
      display: 'flex',
      gap: '12px',
      borderTop: isDarkMode ? '1px solid #1e293b' : '1px solid #edf4f2',
      paddingTop: '20px',
    },
    viewButton: {
      flex: 1,
      padding: '10px 16px',
      borderRadius: '8px',
      backgroundColor: isDarkMode ? '#38bdf8' : '#2d3748',
      color: isDarkMode ? '#0f172a' : '#faf8f5',
      border: 'none',
      fontWeight: '700',
      fontSize: '14px',
      cursor: 'pointer',
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

    // Campus Detail
    detailContainer: {
      animation: 'fadeIn 0.2s ease-out',
    },
    profileLayout: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px, 450px) 1fr',
      gap: '32px',
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      padding: '32px',
      borderRadius: '12px',
      boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
    },
    detailImageWrapper: {
      width: '100%',
      height: '300px',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    detailImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    profileInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    addressText: {
      fontSize: '15px',
      color: isDarkMode ? '#38bdf8' : '#4f46e5',
      fontWeight: '600',
      margin: '4px 0 0 0',
    },
    descriptionText: {
      fontSize: '15px',
      lineHeight: '1.6',
      color: isDarkMode ? '#94a3b8' : '#4a5568',
      margin: 0,
    },

    /* Form */
    formCard: {
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
      padding: '32px',
      borderRadius: '12px',
      maxWidth: '700px',
      margin: '0 auto',
      boxShadow: isDarkMode ? '0 10px 15px -3px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '6px',
      marginBottom: '16px',
    },
    formLabel: {
      fontSize: '13px',
      fontWeight: '700',
      color: isDarkMode ? '#94a3b8' : '#4a5568',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    formInput: {
      padding: '10px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontFamily: 'inherit',
      border: isDarkMode ? '1px solid #334155' : '1px solid #cbd5e1',
      backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
      color: isDarkMode ? '#f8fafc' : '#1e293b',
      outline: 'none',
      transition: 'border-color 0.15s ease',
    },
  };
};