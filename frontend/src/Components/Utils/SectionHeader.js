import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const SectionHeader = ({ title, viewAllTo, viewAllLabel = 'View all' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 2,
        mb: { xs: 2.5, md: 3 },
        fontFamily: SANS,
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: SANS,
          fontSize: { xs: '1.15rem', md: '1.25rem' },
          fontWeight: 650,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: '#24181c',
        }}
      >
        {title}
      </Typography>

      {viewAllTo && (
        <Box
          component={RouterLink}
          to={viewAllTo}
          sx={{
            color: '#85586F',
            textDecoration: 'none',
            fontFamily: SANS,
            fontSize: 12,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderBottom: '1px solid #85586F',
            pb: '2px',
            whiteSpace: 'nowrap',
            '&:hover': { opacity: 0.55 },
          }}
        >
          {viewAllLabel}
        </Box>
      )}
    </Box>
  );
};

export default SectionHeader;
