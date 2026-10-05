import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import coatImage from '../Header/images/r.jpg';

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const SERIF = '"Newsreader", "Iowan Old Style", Georgia, serif';

const LimitedTimeDeals = () => null;

export const SellCloser = () => (
  <Box
    component="section"
    sx={{
      mt: { xs: 3, md: 4 },
      mx: { xs: 1.5, md: 2.5 },
      mb: { xs: 2, md: 3 },
      borderRadius: { xs: '20px', md: '28px' },
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
      alignItems: 'center',
      bgcolor: '#85586F',
      color: '#fff',
      fontFamily: SANS,
      '& .MuiTypography-root': { fontFamily: 'inherit' },
    }}
  >
    <Box sx={{ p: { xs: 2.5, md: 3 }, pb: { xs: 0, md: 3 }, display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
      <Box
        component="img"
        src={coatImage}
        alt="Black coat and white bag hanging on a wall"
        sx={{
          width: { xs: 148, md: 168 },
          height: { xs: 148, md: 168 },
          objectFit: 'cover',
          objectPosition: 'center',
          borderRadius: '16px',
          display: 'block',
        }}
      />
    </Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        px: { xs: 2.5, md: 4, lg: 5 },
        py: { xs: 3, md: 0 },
      }}
    >
      <Typography sx={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', mb: 1, color: '#f3d5df' }}>
        For sellers
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontFamily: `${SERIF} !important`,
          fontWeight: 400,
          fontSize: { xs: '1.5rem', md: '1.75rem' },
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: '18ch',
        }}
      >
        Sell what you no longer wear.
      </Typography>
      <Typography sx={{ mt: 1, maxWidth: 420, fontSize: 14, lineHeight: 1.5, color: '#f6e7ec' }}>
        Photograph the piece, set a price or open it to bids, and it goes on the shop.
      </Typography>
      <Box
        component={Link}
        to="/createproduct"
        sx={{
          mt: 2,
          alignSelf: 'flex-start',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderBottom: '1px solid #fff',
          pb: '2px',
          '&:hover': { opacity: 0.65 },
        }}
      >
        List a piece
      </Box>
    </Box>
  </Box>
);

export default LimitedTimeDeals;
