import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Skeleton,
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import SectionHeader from '../Utils/SectionHeader';

axios.defaults.withCredentials = true;

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

// ─────────────────────────────────────────────────────────────────────────────
// Card — same visual language as the catalogue & bidding cards.
// Hover swaps to the second image (if available) instead of the old flip.
// ─────────────────────────────────────────────────────────────────────────────
const RecommendedCard = ({ product }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const second = product.images && product.images[1];
  const display = hover && second ? second : (product.images && product.images[0]);

  const goToProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.owner?._id) navigate(`/profile/${product.owner._id}`);
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ height: '100%', fontFamily: SANS }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{
          display: 'block',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#f2f2f2',
          overflow: 'hidden',
          borderRadius: '16px',
        }}
      >
        {display && (
          <img
            src={display}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </Box>

      <Box sx={{ pt: 1.25 }}>
        <Box
          component={RouterLink}
          to={`/product/${product._id}`}
          sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <Typography
            sx={{
              fontFamily: SANS,
              fontSize: 14,
              color: '#1a1a1a',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.name}
          </Typography>
          <Typography sx={{ fontFamily: SANS, fontSize: 14, color: '#1a1a1a', mt: 0.25 }}>
            Rs. {product.price?.toLocaleString() ?? product.price}
          </Typography>
        </Box>
        {product.owner?.username && (
          <Typography
            onClick={goToProfile}
            sx={{
              fontFamily: SANS,
              fontSize: 12,
              color: '#6a6a6a',
              mt: 0.5,
              cursor: 'pointer',
              '&:hover': { color: '#1a1a1a' },
            }}
          >
            {product.owner.username}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const RecommendedSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '16px', bgcolor: '#f2f2f2' }} />
    <Skeleton variant="text" width="70%" height={18} sx={{ mt: 1.25 }} />
    <Skeleton variant="text" width="30%" height={18} />
  </Box>
);

const RecommendedProductsSection = () => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL_URL}/api/recommendations`,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (cancelled) return;
        if (response.data.success) {
          setRecommendedProducts(response.data.recommendations || []);
        } else {
          throw new Error(response.data.message || 'API returned unsuccessful response');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchRecommendations();
    return () => { cancelled = true; };
  }, []);

  // Hide the section entirely on hard error / no data — no point in showing
  // an empty band on the home page. Catalogue is still one click away.
  if (!loading && (error || recommendedProducts.length === 0)) {
    return null;
  }

  return (
    <Box sx={{ bgcolor: '#f6f1ee', px: { xs: 2.5, md: 4, lg: 6 }, pt: { xs: 4, md: 5 }, pb: { xs: 2, md: 3 } }}>
      <SectionHeader
        title="Just in"
        viewAllTo="/catalogue"
        viewAllLabel="View all"
      />

      <Grid container spacing={2}>
        {(loading ? Array.from({ length: 8 }) : recommendedProducts.slice(0, 8)).map((product, idx) => (
          <Grid item xs={6} sm={4} md={3} lg={3} key={product?._id || idx}>
            {loading
              ? <RecommendedSkeleton />
              : <RecommendedCard product={product} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedProductsSection;
