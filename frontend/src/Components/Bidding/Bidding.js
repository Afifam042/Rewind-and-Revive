import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import {
  Box,
  Typography,
  Skeleton,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import SectionHeader from '../Utils/SectionHeader';

// ─────────────────────────────────────────────────────────────────────────────
// Card matching the new catalogue card style so the site feels consistent.
// ─────────────────────────────────────────────────────────────────────────────
const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const BidCard = ({ product, onPlaceBid }) => {
  const [hover, setHover] = useState(false);
  const second = product.images && product.images[1];
  const display = hover && second ? second : (product.images && product.images[0]);

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onPlaceBid(product._id)}
      sx={{ height: '100%', cursor: 'pointer', fontFamily: SANS }}
    >
      <Box sx={{ aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '16px', bgcolor: '#f2f2f2' }}>
        {display && (
          <img
            src={display}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width="400"
            height="400"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </Box>
      <Box sx={{ pt: 1.25 }}>
        <Typography sx={{ fontFamily: SANS, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6a6a6a' }}>
          Auction
        </Typography>
        <Typography sx={{ fontFamily: SANS, fontSize: 14, color: '#1a1a1a', mt: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {product.name}
        </Typography>
        <Typography sx={{ fontFamily: SANS, fontSize: 14, color: '#1a1a1a', mt: 0.25 }}>
          From Rs. {product.startingPrice?.toLocaleString() ?? product.startingPrice}
        </Typography>
      </Box>
    </Box>
  );
};

const BidCardSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '16px', bgcolor: '#f2f2f2' }} />
    <Skeleton variant="text" width="40%" height={16} sx={{ mt: 1.25 }} />
    <Skeleton variant="text" width="70%" height={18} />
  </Box>
);

const Bidding = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_LOCAL_URL}/api/biddingProduct/get`
        );
        if (!cancelled) setProducts(response.data || []);
      } catch (error) {
        console.error('Error fetching bidding products:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handlePlaceBid = (id) => navigate(`/biddingProduct/${id}`);

  return (
    <Box sx={{ bgcolor: '#fff', px: { xs: 2.5, md: 4, lg: 6 }, py: { xs: 3.5, md: 4 }, fontFamily: SANS }}>
      <SectionHeader
        title="On the block"
        viewAllTo="/bidProduct"
        viewAllLabel="All auctions"
      />

      {loading ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <BidCardSkeleton key={i} />
          ))}
        </Box>
      ) : products.length === 0 ? (
        <Typography sx={{ fontFamily: SANS, fontSize: 14, color: '#4a4a4a', py: 2 }}>
          Nothing is up for bid right now.{' '}
          <Box component={RouterLink} to="/create" sx={{ color: 'inherit' }}>
            Open an auction
          </Box>
        </Typography>
      ) : (
        <Swiper
          modules={[Navigation, A11y]}
          navigation
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1440: { slidesPerView: 5, spaceBetween: 20 },
          }}
          style={{
            paddingBottom: 8,
            // Push the Swiper navigation arrows just outside the viewport so
            // they don't overlap the cards on small screens.
            '--swiper-navigation-color': '#1a1a1a',
            '--swiper-navigation-size': '20px',
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} style={{ height: 'auto' }}>
              <BidCard product={product} onPlaceBid={handlePlaceBid} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};

export default Bidding;
