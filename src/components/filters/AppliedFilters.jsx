import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import useDataStore from '../../store/useDataStore';

const AppliedFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setLocationFilter = useDataStore((state) => state.setLocationFilter);
  const setCustomerFilter = useDataStore((state) => state.setCustomerFilter);
  const setFinancialFilter = useDataStore((state) => state.setFinancialFilter);
  const setSalesFilter = useDataStore((state) => state.setSalesFilter);
  const setPriorityFilter = useDataStore((state) => state.setPriorityFilter);
  const setAiAdoptionFilter = useDataStore((state) => state.setAiAdoptionFilter);
  const setRegionFilter = useDataStore((state) => state.setRegionFilter);

  const appliedFilters = [];

  // Location filters
  if (filter.location.country) {
    appliedFilters.push({
      label: `Country: ${filter.location.country}`,
      onDelete: () => setLocationFilter({ country: null, state: null, city: null })
    });
  }
  if (filter.location.state) {
    appliedFilters.push({
      label: `State: ${filter.location.state}`,
      onDelete: () => setLocationFilter({ ...filter.location, state: null, city: null })
    });
  }
  if (filter.location.city) {
    appliedFilters.push({
      label: `City: ${filter.location.city}`,
      onDelete: () => setLocationFilter({ ...filter.location, city: null })
    });
  }
  if (filter.location.region) {
    appliedFilters.push({
      label: `Region: ${filter.location.region}`,
      onDelete: () => setRegionFilter(null)
    });
  }

  // Customer filters
  if (filter.customer.industry) {
    appliedFilters.push({
      label: `Industry: ${filter.customer.industry}`,
      onDelete: () => setCustomerFilter({ industry: null })
    });
  }
  if (filter.customer.type) {
    appliedFilters.push({
      label: `Customer Type: ${filter.customer.type}`,
      onDelete: () => setCustomerFilter({ type: null })
    });
  }
  if (filter.customer.brand) {
    appliedFilters.push({
      label: `Brand: ${filter.customer.brand}`,
      onDelete: () => setCustomerFilter({ brand: null })
    });
  }
  if (filter.customer.status) {
    appliedFilters.push({
      label: `Status: ${filter.customer.status}`,
      onDelete: () => setCustomerFilter({ status: null })
    });
  }

  // Financial filters
  if (filter.financial.revenueRange) {
    const labels = {
      under100k: 'Revenue: <$100K',
      '100kTo1m': 'Revenue: $100K-$1M',
      '1mTo10m': 'Revenue: $1M-$10M',
      over10m: 'Revenue: >$10M'
    };
    appliedFilters.push({
      label: labels[filter.financial.revenueRange] || `Revenue Range: ${filter.financial.revenueRange}`,
      onDelete: () => setFinancialFilter({ revenueRange: null })
    });
  }
  if (filter.financial.dealSize) {
    const labels = {
      small: 'Deal: Small (<$10K)',
      medium: 'Deal: Medium ($10K-$50K)',
      large: 'Deal: Large ($50K-$250K)',
      enterprise: 'Deal: Enterprise (>$250K)'
    };
    appliedFilters.push({
      label: labels[filter.financial.dealSize] || `Deal Size: ${filter.financial.dealSize}`,
      onDelete: () => setFinancialFilter({ dealSize: null })
    });
  }

  // Sales filters
  if (filter.sales.rep) {
    appliedFilters.push({
      label: `Rep: ${filter.sales.rep}`,
      onDelete: () => setSalesFilter({ rep: null })
    });
  }
  if (filter.sales.territory) {
    appliedFilters.push({
      label: `Territory: ${filter.sales.territory}`,
      onDelete: () => setSalesFilter({ territory: null })
    });
  }
  if (filter.sales.opportunityStage) {
    appliedFilters.push({
      label: `Stage: ${filter.sales.opportunityStage}`,
      onDelete: () => setSalesFilter({ opportunityStage: null })
    });
  }
  if (filter.sales.engagementRecency) {
    const labels = {
      last30: 'Engaged: Last 30 days',
      '30to90': 'Engaged: 30-90 days',
      over90: 'Engaged: 90+ days'
    };
    appliedFilters.push({
      label: labels[filter.sales.engagementRecency] || `Engagement: ${filter.sales.engagementRecency}`,
      onDelete: () => setSalesFilter({ engagementRecency: null })
    });
  }

  // Priority filters
  if (filter.priority.isCeoPriority === true) {
    appliedFilters.push({
      label: 'CEO Priority',
      onDelete: () => setPriorityFilter(null)
    });
  }

  // AI Adoption filters
  if (filter.aiAdoption) {
    appliedFilters.push({
      label: `AI Adoption: ${filter.aiAdoption}`,
      onDelete: () => setAiAdoptionFilter(null)
    });
  }

  if (appliedFilters.length === 0) {
    return null;
  }

  return (
    <Box sx={{ p: 2, backgroundColor: '#333', borderRadius: '4px', mb: 2 }}>
      <Typography variant="subtitle2" color="#ccc" mb={1}>
        Applied Filters:
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {appliedFilters.map((appliedFilter, index) => (
          <Chip
            key={index}
            label={appliedFilter.label}
            onDelete={appliedFilter.onDelete}
            color="primary"
            sx={{
              backgroundColor: '#0477DD',
              color: 'white',
              '& .MuiChip-deleteIcon': {
                color: 'white'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AppliedFilters;
