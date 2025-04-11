import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';
import { getAvailableFilters } from '../../data/revenueData';

const LocationFilters = () => {
  const revenueData = useDataStore((state) => state.revenueData);
  const filter = useDataStore((state) => state.filter);
  const setLocationFilter = useDataStore((state) => state.setLocationFilter);

  const [availableFilters, setAvailableFilters] = useState({
    countries: [],
    states: [],
    cities: []
  });

  const handleLocationFilter = (newLocationFilter) => {
    console.log('Setting location filter:', newLocationFilter);
    setLocationFilter(newLocationFilter);
  };

  useEffect(() => {
    if (revenueData.length > 0) {
      setAvailableFilters(getAvailableFilters(revenueData));
    }
  }, [revenueData]);

  return (
    <Box p={2}>
      <Typography typography="h6" color="#ccc" mb={1}>
        Location Filters
      </Typography>

      <Stack>
        <Typography typography="subtitle2" color="#ccc" mt={1} mb={1}>
          Country
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          <StyledButton
            onClick={() => setLocationFilter({ country: null, state: null, city: null })}
            sx={{
              mr: 1,
              mb: 1,
              background: !filter.location.country ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              All Countries
            </Typography>
          </StyledButton>

          {availableFilters.countries.map((country) => (
            <StyledButton
              key={country}
              onClick={() => setLocationFilter({ country, state: null, city: null })}
              sx={{
                mr: 1,
                mb: 1,
                background: filter.location.country === country ? '#0477DD !important' : null
              }}>
              <Typography color="white" textTransform="none">
                {country}
              </Typography>
            </StyledButton>
          ))}
        </Box>

        {filter.location.country && (
          <>
            <Typography typography="subtitle2" color="#ccc" mt={1} mb={1}>
              State/Region
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
              <StyledButton
                onClick={() => setLocationFilter({ ...filter.location, state: null, city: null })}
                sx={{
                  mr: 1,
                  mb: 1,
                  background: !filter.location.state ? '#0477DD !important' : null
                }}>
                <Typography color="white" textTransform="none">
                  All States
                </Typography>
              </StyledButton>

              {availableFilters.states
                .filter((state) => {
                  // Find states in the selected country
                  return revenueData.some((item) => item.country === filter.location.country && item.state === state);
                })
                .map((state) => (
                  <StyledButton
                    key={state}
                    onClick={() => setLocationFilter({ ...filter.location, state, city: null })}
                    sx={{
                      mr: 1,
                      mb: 1,
                      background: filter.location.state === state ? '#0477DD !important' : null
                    }}>
                    <Typography color="white" textTransform="none">
                      {state}
                    </Typography>
                  </StyledButton>
                ))}
            </Box>
          </>
        )}

        {filter.location.state && (
          <>
            <Typography typography="subtitle2" color="#ccc" mt={1} mb={1}>
              City
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              <StyledButton
                onClick={() => setLocationFilter({ ...filter.location, city: null })}
                sx={{
                  mr: 1,
                  mb: 1,
                  background: !filter.location.city ? '#0477DD !important' : null
                }}>
                <Typography color="white" textTransform="none">
                  All Cities
                </Typography>
              </StyledButton>

              {availableFilters.cities
                .filter((city) => {
                  // Find cities in the selected state
                  return revenueData.some((item) => item.state === filter.location.state && item.name === city);
                })
                .map((city) => (
                  <StyledButton
                    key={city}
                    onClick={() => setLocationFilter({ ...filter.location, city })}
                    sx={{
                      mr: 1,
                      mb: 1,
                      background: filter.location.city === city ? '#0477DD !important' : null
                    }}>
                    <Typography color="white" textTransform="none">
                      {city}
                    </Typography>
                  </StyledButton>
                ))}
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default LocationFilters;
