import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import womenImage from '../MostPopularItem/images/offwhitegownwomen.webp';
import menImage from '../LimitedTimeDeals/images/men.jpg';
import rackImage from '../LimitedTimeDeals/images/clotheshanging.jpg';

const HERO = '/img-removebg-preview.png';

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';
const MAUVE = '#85586F';
const MAUVE_DEEP = '#6a4458';
const CREAM = '#f6f1ee';
const INK = '#24181c';

const LOOKS = [
  { title: 'Women', line: 'Dresses, tailoring, one-off finds', image: womenImage, to: '/catalogue', alt: 'Woman in a beige dress' },
  { title: 'Men', line: 'Shirts, layers, everyday pieces', image: menImage, to: '/catalogue', alt: 'Man in a brown overshirt' },
  { title: 'Auctions', line: 'A few pieces, highest bid', image: rackImage, to: '/bidProduct', alt: 'Clothes on white hangers' },
];

const LookCard = ({ title, line, image, to, alt }) => (
  <Box
    component={Link}
    to={to}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      textDecoration: 'none',
      color: INK,
      bgcolor: '#fff',
      borderRadius: '16px',
      p: 1,
      pr: 1.5,
      boxShadow: '0 10px 30px rgba(60, 30, 45, 0.12)',
      '&:hover': { transform: 'translateY(-2px)' },
      transition: 'transform 0.2s ease',
    }}
  >
    <Box
      component="img"
      src={image}
      alt={alt}
      sx={{ width: 76, height: 76, objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '16px', flexShrink: 0 }}
    />
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography sx={{ fontFamily: SANS, fontWeight: 650, fontSize: 16, lineHeight: 1.15 }}>{title}</Typography>
      <Typography sx={{ fontFamily: SANS, fontSize: 12, color: '#6d5c63', mt: 0.4, lineHeight: 1.35 }}>{line}</Typography>
    </Box>
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: MAUVE,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <ArrowForwardIcon sx={{ fontSize: 16 }} />
    </Box>
  </Box>
);

function Header() {
  return (
    <Box sx={{ bgcolor: CREAM, fontFamily: SANS, color: INK, '& .MuiTypography-root': { fontFamily: 'inherit' }, pb: { xs: 1, md: 2 } }}>
      <Box
        component="section"
        sx={{
          position: 'relative',
          mx: { xs: 1.5, md: 2.5 },
          mt: { xs: 1.5, md: 2 },
          borderRadius: { xs: '20px', md: '28px' },
          bgcolor: MAUVE_DEEP,
          overflow: 'hidden',
          minHeight: { md: 470 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          alignItems: 'center',
          px: { xs: 2.5, md: 4, lg: 5 },
          pt: { xs: 3, md: 3.5 },
          pb: { xs: 3, md: 5 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { md: 0 },
            right: { md: 0 },
            top: { md: '50%' },
            transform: { md: 'translateY(calc(-50% - 1.5cm))' },
            zIndex: 0,
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: { xs: '12.6vw', sm: '4rem', md: '5.625rem', lg: '7.35rem' },
            lineHeight: 1,
            letterSpacing: { xs: '-0.03em', md: '0.02em' },
            textAlign: 'center',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.9)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            mt: { xs: 0.5, md: 0 },
            mb: { xs: 1, md: 0 },
          }}
        >
          REWIND & REVIVE
        </Box>

        <Box sx={{ position: 'relative', zIndex: 2, py: { md: 4 }, pr: { md: 2 } }}>
          <Typography sx={{ color: '#f3d5df', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            New this week
          </Typography>
          <Typography
            component="h1"
            sx={{
              mt: 1.25,
              color: '#fff',
              fontSize: { xs: '1.85rem', md: '2.15rem' },
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: '11ch',
            }}
          >
            Back in rotation.
          </Typography>
        </Box>

        <Box
          component="img"
          src={HERO}
          alt="Illustrated group of four women"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            left: { md: '50%' },
            bottom: { md: 46 },
            transform: { md: 'translateX(-50%)' },
            zIndex: 1,
            width: { xs: '78%', md: 420, lg: 460 },
            height: { xs: 210, md: 276, lg: 300 },
            mx: { xs: 'auto', md: 0 },
            my: { xs: 1.5, md: 0 },
            objectFit: 'contain',
            objectPosition: 'center bottom',
            display: 'block',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 2, py: { xs: 1, md: 4 }, pl: { md: 3 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'center', textAlign: { md: 'right' } }}>
          <Typography sx={{ color: '#f6e7ec', fontSize: 14, lineHeight: 1.5, maxWidth: 260 }}>
            Pre-loved clothes, still sharp. Shop someone’s closet, or list what you’ve outgrown.
          </Typography>
          <Box
            component={Link}
            to="/catalogue"
            sx={{
              mt: 2.5,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#fff',
              color: MAUVE_DEEP,
              textDecoration: 'none',
              borderRadius: '999px',
              px: 2.25,
              py: 1.1,
              fontSize: 13,
              fontWeight: 650,
              letterSpacing: '0.04em',
              '&:hover': { bgcolor: '#f3e4ea' },
            }}
          >
            Shop now
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
          gap: 1.5,
          px: { xs: 1.5, md: 5, lg: 8 },
          mt: { xs: 1.5, md: -3 },
        }}
      >
        {LOOKS.map((look) => (
          <LookCard key={look.title} {...look} />
        ))}
      </Box>
    </Box>
  );
}

export default Header;
