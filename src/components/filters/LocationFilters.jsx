import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const LocationFilters = () => {
  const revenueData = useDataStore((state) => state.revenueData);
  const filter = useDataStore((state) => state.filter);
  const setLocationFilter = useDataStore((state) => state.setLocationFilter);

  const [availableFilters, setAvailableFilters] = useState({
    countries: [],
    states: [],
    cities: []
  });

  // Function to handle location filter changes with debug logging
  const handleLocationFilter = (newLocationFilter) => {
    console.log('Setting location filter:', newLocationFilter);
    setLocationFilter(newLocationFilter);
  };

  // Calculate available filters based on revenue data
  useEffect(() => {
    if (revenueData.length > 0) {
      // Get unique countries
      const countries = [...new Set(revenueData.map((item) => item.country))];

      // Get all states (we'll filter them when displaying)
      const states = [...new Set(revenueData.map((item) => item.state))];

      // Get all cities (we'll filter them when displaying)
      const cities = [...new Set(revenueData.map((item) => item.name))];

      setAvailableFilters({ countries, states, cities });
      console.log('Available filters updated:', { countries, states, cities });
    }
  }, [revenueData]);

  // Get states for the selected country
  const getStatesForCountry = (country) => {
    if (!country) return [];

    const statesInCountry = [...new Set(revenueData.filter((item) => item.country === country).map((item) => item.state))];

    return statesInCountry;
  };

  // Get cities for the selected state and country
  const getCitiesForState = (country, state) => {
    if (!country || !state) return [];

    const citiesInState = [...new Set(revenueData.filter((item) => item.country === country && item.state === state).map((item) => item.name))];

    return citiesInState;
  };

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
            onClick={() => handleLocationFilter({ country: null, state: null, city: null })}
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
              onClick={() => handleLocationFilter({ country, state: null, city: null })}
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
                onClick={() => handleLocationFilter({ ...filter.location, state: null, city: null })}
                sx={{
                  mr: 1,
                  mb: 1,
                  background: !filter.location.state ? '#0477DD !important' : null
                }}>
                <Typography color="white" textTransform="none">
                  All States
                </Typography>
              </StyledButton>

              {getStatesForCountry(filter.location.country).map((state) => (
                <StyledButton
                  key={state}
                  onClick={() => handleLocationFilter({ ...filter.location, state, city: null })}
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
                onClick={() => handleLocationFilter({ ...filter.location, city: null })}
                sx={{
                  mr: 1,
                  mb: 1,
                  background: !filter.location.city ? '#0477DD !important' : null
                }}>
                <Typography color="white" textTransform="none">
                  All Cities
                </Typography>
              </StyledButton>

              {getCitiesForState(filter.location.country, filter.location.state).map((city) => (
                <StyledButton
                  key={city}
                  onClick={() => handleLocationFilter({ ...filter.location, city })}
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
