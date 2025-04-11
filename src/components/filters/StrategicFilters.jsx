// src/components/filters/StrategicFilters.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Switch, FormControlLabel } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const StrategicFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setPriorityFilter = useDataStore((state) => state.setPriorityFilter);
  const setAiAdoptionFilter = useDataStore((state) => state.setAiAdoptionFilter);
  const setRegionFilter = useDataStore((state) => state.setRegionFilter);
  const revenueData = useDataStore((state) => state.revenueData);

  const [availableRegions, setAvailableRegions] = useState([]);

  // Predefined AI adoption levels
  const aiAdoptionLevels = ['None', 'Exploring', 'Scaling'];

  // Get available values from data
  useEffect(() => {
    if (revenueData.length > 0) {
      // Extract region tags if they exist in your data
      setAvailableRegions([...new Set(revenueData.map((item) => item.region_tag).filter(Boolean))]);
    }
  }, [revenueData]);

  return (
    <Box p={2}>
      <Typography variant="h6" color="#ccc" mb={1}>
        Strategic Filters
      </Typography>

      {/* CEO Priority Filter */}
      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={filter.priority.isCeoPriority === true}
              onChange={(e) => setPriorityFilter(e.target.checked ? true : null)}
              color="primary"
            />
          }
          label={<Typography color="white">CEO Priority Accounts Only</Typography>}
        />
      </Box>

      {/* Region Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Region
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setRegionFilter(null)}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.location.region ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Regions
          </Typography>
        </StyledButton>

        {availableRegions.map((region) => (
          <StyledButton
            key={region}
            onClick={() => setRegionFilter(region)}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.location.region === region ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {region}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* AI Adoption Level Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        AI Adoption Level
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setAiAdoptionFilter(null)}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.aiAdoption ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Levels
          </Typography>
        </StyledButton>

        {aiAdoptionLevels.map((level) => (
          <StyledButton
            key={level}
            onClick={() => setAiAdoptionFilter(level)}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.aiAdoption === level ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {level}
            </Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
};

export default StrategicFilters;
