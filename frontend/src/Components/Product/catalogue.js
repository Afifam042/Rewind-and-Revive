import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Skeleton,
  Stack,
  Chip,
  Container,
  Breadcrumbs,
  Link as MuiLink,
  Badge,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TuneIcon from '@mui/icons-material/Tune';
import Layout from "../Layout/layout";
import axios from 'axios';
import sizeRanges from "../Utils/sizeRange";
import womenImage from '../MostPopularItem/images/offwhitegownwomen.webp';
import menImage from '../LimitedTimeDeals/images/men.jpg';
import rackImage from '../LimitedTimeDeals/images/clotheshanging.jpg';

const FilterDrawer = React.lazy(() => import("./filter"));

// ─────────────────────────────────────────────────────────────────────────────
// Theme tokens — keeping these in one place so the page is visually consistent.
// ─────────────────────────────────────────────────────────────────────────────
const TOKENS = {
  border: '#E5E0DA',
  borderHover: '#C9C0B6',
  ink: '#1F1B16',
  inkSoft: '#6B635A',
  bg: '#FFFFFF',
  bgMuted: '#FAF8F5',
  accent: '#85586F',
  accentDark: '#6a4458',
  sold: 'rgba(0, 0, 0, 0.55)',
};

const SANS = '"Helvetica Neue", Helvetica, Arial, sans-serif';

const SHOP_TABS = [
  { id: 'women', title: 'Women', line: 'Dresses, tailoring, one-off finds', image: womenImage, alt: 'Woman in a beige dress' },
  { id: 'men', title: 'Men', line: 'Shirts, layers, everyday pieces', image: menImage, alt: 'Man in a brown overshirt' },
  { id: 'auctions', title: 'Auctions', line: 'A few pieces, highest bid', image: rackImage, alt: 'Clothes on white hangers' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton matching the real product card so loading doesn't shift layout
// ─────────────────────────────────────────────────────────────────────────────
const ProductCardSkeleton = () => (
  <Box>
    <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '16px', bgcolor: '#f2f2f2' }} />
    <Skeleton variant="text" width="70%" height={18} sx={{ mt: 1.25 }} />
    <Skeleton variant="text" width="40%" height={18} />
  </Box>
);

// ─────────────────────────────────────────────────────────────────────────────
// Product card — single component, sane click targets, hover effect, no full-page reloads
// ─────────────────────────────────────────────────────────────────────────────
const ProductCard = React.memo(function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const secondImage = product.images && product.images[1];
  const displayImage = hover && secondImage ? secondImage : (product.images && product.images[0]);

  const handleSellerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.owner?._id) navigate(`/profile/${product.owner._id}`);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(product._id);
  };

  return (
    <Box
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      sx={{ position: 'relative', fontFamily: SANS }}
    >
      <Box
        component={RouterLink}
        to={`/product/${product._id}`}
        sx={{
          display: 'block',
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#f2f2f2',
          overflow: 'hidden',
          borderRadius: '16px',
        }}
      >
        {displayImage && (
          <img
            src={displayImage}
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
              filter: product.isSold ? 'grayscale(70%)' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />
        )}

        {/* Favorite heart — top right, stops bubbling so card link doesn't fire */}
        <IconButton
          size="small"
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(4px)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
          }}
        >
          {isFavorite
            ? <FavoriteIcon fontSize="small" sx={{ color: '#E63946' }} />
            : <FavoriteBorderIcon fontSize="small" sx={{ color: TOKENS.ink }} />}
        </IconButton>

        {/* Sold pill — corner, not a bottom bar */}
        {product.isSold && (
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: TOKENS.sold,
              color: '#fff',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              px: 1,
              py: 0.4,
              borderRadius: 1,
              textTransform: 'uppercase',
            }}
          >
            Sold
          </Box>
        )}
      </Box>

      <Box sx={{ pt: 1.25 }}>
        <Box
          component={RouterLink}
          to={`/product/${product._id}`}
          sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: TOKENS.ink,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mb: 0.25,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: TOKENS.ink, mb: 0.25 }}
          >
            Rs. {product.price?.toLocaleString() ?? product.price}
          </Typography>
        </Box>
        {product.owner?.username && (
          <Typography
            variant="caption"
            onClick={handleSellerClick}
            sx={{
              color: TOKENS.inkSoft,
              cursor: 'pointer',
              '&:hover': { color: TOKENS.ink, textDecoration: 'underline' },
            }}
          >
            @{product.owner.username}
          </Typography>
        )}
      </Box>
    </Box>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
const CataloguePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // UI state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Render-window: only mount this many cards to keep DOM cheap
  const PAGE_SIZE = 24;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const defaultCategories = ['men', 'women', 'kids'];
  const productTypes = ['top', 'bottom', 'top/bottom', 'accessories'];
  const sizes = ['small', 'medium', 'large'];
  const priceOptions = [1000, 2000, 3000];

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_URL}/api/product/catalogue`);
        if (cancelled) return;
        const processedProducts = response.data.map((product) => ({
          ...product,
          category: defaultCategories.includes(product.category?.toLowerCase())
            ? product.category.toLowerCase()
            : 'other',
        }));
        setProducts(processedProducts);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sync ?search= query param ─────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('search') || '');
  }, [location.search]);

  // ── Filtering / sorting (logic preserved from previous version) ───────────
  const isWithinSizeRange = (product, cat, size) => {
    if (!product || !cat || !size || !sizeRanges[cat]?.[size]) return false;
    const { type, topSizes, bottomSizes } = product;
    if (type === 'accessories') return true;

    const checkMeasurements = (measurements, rangeType) => {
      if (!measurements || !sizeRanges[cat][size][rangeType]) return false;
      const rangeForSize = sizeRanges[cat][size][rangeType];
      let hasValidMeasurements = false;
      for (const [measurement, value] of Object.entries(measurements)) {
        if (!value || !rangeForSize[measurement]) continue;
        hasValidMeasurements = true;
        const range = rangeForSize[measurement];
        if (value < range.min || value > range.max) return false;
      }
      return hasValidMeasurements;
    };

    switch (type?.toLowerCase()) {
      case 'top': return checkMeasurements(topSizes, 'top');
      case 'bottom': return checkMeasurements(bottomSizes, 'bottom');
      case 'top/bottom': return checkMeasurements(topSizes, 'top') && checkMeasurements(bottomSizes, 'bottom');
      default: return false;
    }
  };

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = !category || product.category === category;
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
      const priceMatch = !priceRange || product.price <= parseInt(priceRange);
      const sizeMatch = selectedSizes.length === 0 ||
        selectedSizes.some((size) => isWithinSizeRange(product, product.category, size));
      const searchMatch = !searchQuery ||
        (product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && typeMatch && sizeMatch && priceMatch && searchMatch;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
      case 'price-low':  sorted.sort((a, b) => a.price - b.price); break;
      case 'newest':
      default:
        sorted.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, category, selectedTypes, selectedSizes, priceRange, sortBy, searchQuery]);

  // Reset render window when filters change so users don't get stuck on Load More
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [category, selectedTypes, selectedSizes, priceRange, sortBy, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // ── Filter helpers ────────────────────────────────────────────────────────
  const hasActiveFilters = !!(category || selectedTypes.length || selectedSizes.length || priceRange || searchQuery);

  const clearAllFilters = () => {
    setCategory('');
    setSelectedTypes([]);
    setSelectedSizes([]);
    setPriceRange('');
    if (searchQuery) {
      setSearchQuery('');
      const params = new URLSearchParams(location.search);
      params.delete('search');
      navigate(`/catalogue${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
    }
  };

  const removeChip = (kind, value) => {
    if (kind === 'category') setCategory('');
    else if (kind === 'type') setSelectedTypes((t) => t.filter((x) => x !== value));
    else if (kind === 'size') setSelectedSizes((s) => s.filter((x) => x !== value));
    else if (kind === 'price') setPriceRange('');
    else if (kind === 'search') {
      setSearchQuery('');
      const params = new URLSearchParams(location.search);
      params.delete('search');
      navigate(`/catalogue${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
    }
  };

  // ── Favorites (visual-only for now — store in localStorage for persistence) ──
  useEffect(() => {
    try {
      const raw = localStorage.getItem('rr_favorites');
      if (raw) setFavorites(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try { localStorage.setItem('rr_favorites', JSON.stringify([...next])); } catch {}
      return next;
    });
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, fontFamily: SANS }}>

        {/* Breadcrumbs */}
        <Breadcrumbs separator="›" sx={{ mb: 1, fontSize: '0.85rem' }}>
          <MuiLink component={RouterLink} to="/" underline="hover" color="inherit">Home</MuiLink>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>Shop</Typography>
        </Breadcrumbs>

        <Box sx={{ mb: 2.5 }}>
          <Typography
            component="h1"
            sx={{
              fontFamily: SANS,
              fontSize: { xs: '1.35rem', md: '1.6rem' },
              fontWeight: 650,
              letterSpacing: '-0.03em',
              color: '#24181c',
            }}
          >
            {searchQuery ? `Results for "${searchQuery}"` : 'Shop'}
          </Typography>
          <Typography sx={{ fontFamily: SANS, fontSize: 13, color: TOKENS.inkSoft, mt: 0.5 }}>
            {loading
              ? 'Loading items…'
              : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'item' : 'items'}${filteredProducts.length !== products.length ? ` (of ${products.length})` : ''}`}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: 1.5,
            mb: 3,
          }}
        >
          {SHOP_TABS.map((tab) => {
            const selected = tab.id !== 'auctions' && category === tab.id;
            return (
              <Box
                key={tab.id}
                component="button"
                type="button"
                onClick={() => {
                  if (tab.id === 'auctions') navigate('/bidProduct');
                  else setCategory((current) => (current === tab.id ? '' : tab.id));
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: SANS,
                  color: '#24181c',
                  bgcolor: selected ? '#f6eef2' : '#fff',
                  border: selected ? '1.5px solid #85586F' : '1px solid #f0e8ec',
                  borderRadius: '16px',
                  p: 1,
                  pr: 1.5,
                  boxShadow: '0 10px 30px rgba(60, 30, 45, 0.08)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              >
                <Box
                  component="img"
                  src={tab.image}
                  alt={tab.alt}
                  sx={{ width: 64, height: 64, objectFit: 'cover', objectPosition: 'center 20%', borderRadius: '14px', flexShrink: 0 }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontFamily: SANS, fontWeight: 650, fontSize: 16, lineHeight: 1.15 }}>{tab.title}</Typography>
                  <Typography sx={{ fontFamily: SANS, fontSize: 12, color: '#6d5c63', mt: 0.4, lineHeight: 1.35 }}>{tab.line}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

          {/* ───────── MAIN CONTENT ───────── */}
          <Box sx={{ flex: 1, minWidth: 0 }}>

            {/* Sort row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                mb: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant="body2" sx={{ color: TOKENS.inkSoft }}>
                Showing {visibleProducts.length} of {filteredProducts.length}
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <IconButton
                  onClick={() => setIsFilterOpen(true)}
                  aria-label="Filters"
                  sx={{
                    width: 42,
                    height: 42,
                    border: '1px solid #e7e0dc',
                    borderRadius: '999px',
                    color: '#24181c',
                    '&:hover': { bgcolor: '#f6eef2', borderColor: '#85586F' },
                  }}
                >
                  <Badge
                    badgeContent={selectedTypes.length + selectedSizes.length + (priceRange ? 1 : 0)}
                    invisible={!(selectedTypes.length || selectedSizes.length || priceRange)}
                    sx={{ '& .MuiBadge-badge': { bgcolor: '#85586F', color: '#fff' } }}
                  >
                    <TuneIcon sx={{ fontSize: 20 }} />
                  </Badge>
                </IconButton>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort by"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="newest">Newest first</MenuItem>
                    <MenuItem value="price-low">Price: low to high</MenuItem>
                    <MenuItem value="price-high">Price: high to low</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            {/* Active filter chips */}
            {hasActiveFilters && (
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {category && (
                  <Chip
                    label={`Category: ${category}`}
                    onDelete={() => removeChip('category')}
                    deleteIcon={<CloseIcon />}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                )}
                {selectedTypes.map((t) => (
                  <Chip
                    key={t}
                    label={`Type: ${t}`}
                    onDelete={() => removeChip('type', t)}
                    deleteIcon={<CloseIcon />}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
                {selectedSizes.map((s) => (
                  <Chip
                    key={s}
                    label={`Size: ${s.toUpperCase()}`}
                    onDelete={() => removeChip('size', s)}
                    deleteIcon={<CloseIcon />}
                    size="small"
                  />
                ))}
                {priceRange && (
                  <Chip
                    label={`Up to Rs. ${parseInt(priceRange).toLocaleString()}`}
                    onDelete={() => removeChip('price')}
                    deleteIcon={<CloseIcon />}
                    size="small"
                  />
                )}
                {searchQuery && (
                  <Chip
                    label={`Search: "${searchQuery}"`}
                    onDelete={() => removeChip('search')}
                    deleteIcon={<CloseIcon />}
                    size="small"
                  />
                )}
                <Button
                  size="small"
                  onClick={clearAllFilters}
                  sx={{ color: TOKENS.inkSoft, textTransform: 'none', fontSize: '0.8rem' }}
                >
                  Clear all
                </Button>
              </Stack>
            )}

            {/* Product grid */}
            {loading ? (
              <Grid container spacing={2}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <Grid item xs={6} sm={4} md={4} lg={3} key={i}>
                    <ProductCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : filteredProducts.length === 0 ? (
              // Empty state
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  py: { xs: 6, md: 10 },
                  px: 2,
                  border: `1px dashed ${TOKENS.border}`,
                  borderRadius: 2,
                  backgroundColor: TOKENS.bgMuted,
                }}
              >
                <SearchOffIcon sx={{ fontSize: 56, color: TOKENS.inkSoft, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: TOKENS.ink }}>
                  No items match your filters
                </Typography>
                <Typography variant="body2" sx={{ color: TOKENS.inkSoft, mb: 3, maxWidth: 360 }}>
                  Try removing a filter or two, or clear them all to see everything we have.
                </Typography>
                <Button
                  variant="contained"
                  onClick={clearAllFilters}
                  sx={{
                    backgroundColor: TOKENS.accent,
                    '&:hover': { backgroundColor: TOKENS.accentDark },
                    textTransform: 'none',
                  }}
                >
                  Clear all filters
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {visibleProducts.map((product) => (
                    <Grid item xs={6} sm={4} md={4} lg={3} key={product._id}>
                      <ProductCard
                        product={product}
                        isFavorite={favorites.has(product._id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Load more */}
                {visibleCount < filteredProducts.length && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      sx={{
                        color: TOKENS.ink,
                        borderColor: TOKENS.border,
                        textTransform: 'none',
                        px: 4,
                        py: 1,
                        '&:hover': {
                          borderColor: TOKENS.borderHover,
                          backgroundColor: TOKENS.bgMuted,
                        },
                      }}
                    >
                      Load more ({filteredProducts.length - visibleCount} remaining)
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>

        <Suspense fallback={null}>
          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={setIsFilterOpen}
            sizes={sizes}
            productTypes={productTypes}
            priceRanges={priceOptions}
            selectedSizes={selectedSizes}
            selectedTypes={selectedTypes}
            priceRange={priceRange}
            setSelectedSizes={setSelectedSizes}
            setSelectedTypes={setSelectedTypes}
            setPriceRange={setPriceRange}
            onClear={() => {
              setSelectedTypes([]);
              setSelectedSizes([]);
              setPriceRange('');
            }}
          />
        </Suspense>
      </Container>
    </Layout>
  );
};

export default CataloguePage;
