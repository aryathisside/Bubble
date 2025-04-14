import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import StyledButton from '../../ui/overrides/Button';
import useDataStore from '../../store/useDataStore';

const CustomerFilters = () => {
  const filter = useDataStore((state) => state.filter);
  const setCustomerFilter = useDataStore((state) => state.setCustomerFilter);
  const revenueData = useDataStore((state) => state.revenueData);

  const [availableIndustries, setAvailableIndustries] = useState([]);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [availableStatuses, setAvailableStatuses] = useState([]);

  // Get available values from data
  useEffect(() => {
    if (revenueData.length > 0) {
      const uniqueBrands = [...new Set(revenueData.map((item) => item.brand).filter(Boolean))];

      setAvailableIndustries([...new Set(revenueData.map((item) => item.industry).filter(Boolean))]);
      setAvailableTypes([...new Set(revenueData.map((item) => item.customer_type).filter(Boolean))]);
      console.log('Available brands:', uniqueBrands);
      setAvailableBrands(uniqueBrands);
      setAvailableStatuses([...new Set(revenueData.map((item) => item.account_status).filter(Boolean))]);
    }
  }, [revenueData]);

  return (
    <Box p={2}>
      <Typography variant="h6" color="#ccc" mb={1}>
        Customer Filters
      </Typography>

      {/* Industry Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Industry
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setCustomerFilter({ industry: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.customer.industry ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Industries
          </Typography>
        </StyledButton>

        {availableIndustries.map((industry) => (
          <StyledButton
            key={industry}
            onClick={() => setCustomerFilter({ industry })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.customer.industry === industry ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {industry}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Customer Type Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Customer Type
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setCustomerFilter({ type: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.customer.type ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Types
          </Typography>
        </StyledButton>

        {availableTypes.map((type) => (
          <StyledButton
            key={type}
            onClick={() => setCustomerFilter({ type })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.customer.type === type ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {type}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Brand Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Brand
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setCustomerFilter({ brand: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.customer.brand ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Brands
          </Typography>
        </StyledButton>

        {availableBrands.map((brand) => (
          <StyledButton
            key={brand}
            onClick={() => setCustomerFilter({ brand })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.customer?.brand === brand ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {brand}
            </Typography>
          </StyledButton>
        ))}
      </Box>

      {/* Account Status Filter */}
      <Typography variant="subtitle2" color="#ccc" mt={2} mb={1}>
        Account Status
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
        <StyledButton
          onClick={() => setCustomerFilter({ status: null })}
          sx={{
            mr: 1,
            mb: 1,
            background: !filter.customer.status ? '#0477DD !important' : null
          }}>
          <Typography color="white" textTransform="none">
            All Statuses
          </Typography>
        </StyledButton>

        {availableStatuses.map((status) => (
          <StyledButton
            key={status}
            onClick={() => setCustomerFilter({ status })}
            sx={{
              mr: 1,
              mb: 1,
              background: filter.customer.status === status ? '#0477DD !important' : null
            }}>
            <Typography color="white" textTransform="none">
              {status}
            </Typography>
          </StyledButton>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerFilters;
