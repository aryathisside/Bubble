// src/components/filters/TimeAndMetricFilters.jsx
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const TimeAndMetricFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setTimeFrame = useDataStore((state) => state.setTimeFrame);
  const setMetricType = useDataStore((state) => state.setMetricType);

  const timeFrames = [
    { label: 'Hour', value: 'hour' },
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ];

  const metricTypes = [
    { label: 'Revenue', value: 'revenue' },
    { label: 'Profit', value: 'profit' },
    { label: 'Growth', value: 'growth' }
  ];

  return (
    <Box p={2}>
      <Stack>
        <Typography typography="h6" color="#cfa935" mb={1}>
          Time Frame
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
          {timeFrames.map((time) => (
            <StyledButton
              key={time.value}
              onClick={() => setTimeFrame(time.value)}
              sx={{
                mr: 1,
                mb: 1,
                background: filter.timeFrame === time.value ? '#0477DD !important' : null
              }}>
              <Typography color="white" textTransform="none">
                {time.label}
              </Typography>
            </StyledButton>
          ))}
        </Box>

        <Typography typography="h6" color="#cfa935" mb={1}>
          Metric Type
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {metricTypes.map((metric) => (
            <StyledButton
              key={metric.value}
              onClick={() => setMetricType(metric.value)}
              sx={{
                mr: 1,
                mb: 1,
                background: filter.metricType === metric.value ? '#0477DD !important' : null,
                // Different style for metric type buttons
                borderColor: '#cfa935'
              }}>
              <Typography color="white" textTransform="none">
                {metric.label}
              </Typography>
            </StyledButton>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default TimeAndMetricFilters;
