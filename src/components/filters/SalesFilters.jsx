import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const SalesFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setSalesFilter = useDataStore((state) => state.setSalesFilter);
  const revenueData = useDataStore((state) => state.revenueData);

  const [availableReps, setAvailableReps] = useState([]);
  const [availableTerritories, setAvailableTerritories] = useState([]);

  // Predefined opportunity stages
  const opportunityStages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  // Predefined engagement recency options
  const engagementRecency = [
    { label: 'Last 30 days', value: 'last30' },
    { label: '30-90 days', value: '30to90' },
    { label: '90+ days', value: 'over90' }
  ];

  // Get available values from data
  useEffect(() => {
    if (revenueData.length > 0) {
      setAvailableReps([...new Set(revenueData.map((item) => item.assigned_sales_rep).filter(Boolean))]);
      setAvailableTerritories([...new Set(revenueData.map((item) => item.rep_territory).filter(Boolean))]);
    }
  }, [revenueData]);

  return (
    <Box p={2}>
      <Typography variant="h6" color="#ccc" mb={1}>
        Sales Filters
      </Typography>

      {/* Sales Rep Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Sales Representative
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setSalesFilter({ rep: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.sales.rep ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Reps
          </Typography>
        </StyledButton>

        {availableReps.map((rep) => (
          <StyledButton
            key={rep}
            onClick={() => setSalesFilter({ rep })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.sales.rep === rep ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {rep}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Territory Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Territory
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setSalesFilter({ territory: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.sales.territory ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Territories
          </Typography>
        </StyledButton>

        {availableTerritories.map((territory) => (
          <StyledButton
            key={territory}
            onClick={() => setSalesFilter({ territory })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.sales.territory === territory ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {territory}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Opportunity Stage Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Opportunity Stage
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setSalesFilter({ opportunityStage: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.sales.opportunityStage ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Stages
          </Typography>
        </StyledButton>

        {opportunityStages.map((stage) => (
          <StyledButton
            key={stage}
            onClick={() => setSalesFilter({ opportunityStage: stage })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.sales.opportunityStage === stage ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {stage}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Engagement Recency Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Last Engagement
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setSalesFilter({ engagementRecency: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.sales.engagementRecency ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            Any Time
          </Typography>
        </StyledButton>

        {engagementRecency.map((option) => (
          <StyledButton
            key={option.value}
            onClick={() => setSalesFilter({ engagementRecency: option.value })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.sales.engagementRecency === option.value ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {option.label}
            </Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
};

export default SalesFilters;
