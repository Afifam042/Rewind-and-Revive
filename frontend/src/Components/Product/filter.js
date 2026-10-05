import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  FormGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const MAUVE = '#85586F';

const FilterDrawer = ({
  isOpen,
  onClose,
  sizes = ['small', 'medium', 'large'],
  productTypes = ['top', 'bottom', 'top/bottom', 'accessories'],
  priceRanges = [1000, 2000, 3000],
  selectedSizes,
  selectedTypes,
  priceRange,
  setSelectedSizes,
  setSelectedTypes,
  setPriceRange,
  onClear,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => onClose(false)}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 360 }, borderRadius: { sm: '16px 0 0 16px' } },
      }}
    >
      <Box sx={{ p: 2.5, borderBottom: '1px solid #E7E0DC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 650, fontSize: 18 }}>
          Filters
        </Typography>
        <IconButton onClick={() => onClose(false)} aria-label="Close filters">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ p: 2, overflowY: 'auto', pb: 12 }}>
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 650 }}>Size</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {sizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={selectedSizes.includes(size)}
                      onChange={() => {
                        setSelectedSizes((prev) =>
                          prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                        );
                      }}
                      sx={{ color: MAUVE, '&.Mui-checked': { color: MAUVE } }}
                    />
                  }
                  label={size.toUpperCase()}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 650 }}>Type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {productTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={selectedTypes.includes(type)}
                      onChange={() => {
                        setSelectedTypes((prev) =>
                          prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
                        );
                      }}
                      sx={{ color: MAUVE, '&.Mui-checked': { color: MAUVE } }}
                    />
                  }
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 650 }}>Price</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
              {priceRanges.map((price) => (
                <FormControlLabel
                  key={price}
                  value={price.toString()}
                  control={<Radio sx={{ color: MAUVE, '&.Mui-checked': { color: MAUVE } }} />}
                  label={`Up to Rs. ${price.toLocaleString()}`}
                  onClick={(e) => {
                    if (priceRange === price.toString()) {
                      e.preventDefault();
                      setPriceRange('');
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, display: 'flex', gap: 1, bgcolor: '#fff', borderTop: '1px solid #E7E0DC' }}>
        <Button
          onClick={onClear}
          sx={{ flex: 1, textTransform: 'none', color: '#24181c' }}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          onClick={() => onClose(false)}
          sx={{ flex: 1, textTransform: 'none', bgcolor: MAUVE, boxShadow: 'none', '&:hover': { bgcolor: '#6a4458', boxShadow: 'none' } }}
        >
          Show results
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
