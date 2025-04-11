import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const FinancialFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setFinancialFilter = useDataStore((state) => state.setFinancialFilter);

  // Predefined revenue ranges
  const revenueRanges = [
    { label: '<$100K', value: 'under100k' },
    { label: '$100K-$1M', value: '100kTo1m' },
    { label: '$1M-$10M', value: '1mTo10m' },
    { label: '>$10M', value: 'over10m' }
  ];

  // Predefined deal size categories
  const dealSizes = [
    { label: 'Small (<$10K)', value: 'small' },
    { label: 'Medium ($10K-$50K)', value: 'medium' },
    { label: 'Large ($50K-$250K)', value: 'large' },
    { label: 'Enterprise (>$250K)', value: 'enterprise' }
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" color="#ccc" mb={1}>
        Financial Filters
      </Typography>

      {/* Revenue Range Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Annual Revenue
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setFinancialFilter({ revenueRange: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.financial.revenueRange ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Revenues
          </Typography>
        </StyledButton>

        {revenueRanges.map((range) => (
          <StyledButton
            key={range.value}
            onClick={() => setFinancialFilter({ revenueRange: range.value })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.financial.revenueRange === range.value ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {range.label}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Deal Size Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Deal Size
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setFinancialFilter({ dealSize: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.financial.dealSize ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Deal Sizes
          </Typography>
        </StyledButton>

        {dealSizes.map((size) => (
          <StyledButton
            key={size.value}
            onClick={() => setFinancialFilter({ dealSize: size.value })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.financial.dealSize === size.value ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {size.label}
            </Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
};

export default FinancialFilters;
