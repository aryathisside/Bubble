import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import LocationFilters from './LocationFilters';
import CustomerFilters from './CustomerFilters';
import FinancialFilters from './FinancialFilters';
import SalesFilters from './SalesFilters';
import StrategicFilters from './StrategicFilters';
import TimeAndMetricFilters from './TimeAndMetricFilters';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`filter-tabpanel-${index}`} aria-labelledby={`filter-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

const FilterPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: '#2A2E36', borderRadius: '8px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              color: '#ccc',
              '&.Mui-selected': {
                color: '#fff'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#0477DD'
            }
          }}>
          <Tab label="Location" />
          <Tab label="Customer" />
          <Tab label="Financial" />
          <Tab label="Sales" />
          <Tab label="Strategic" />
          <Tab label="Metrics" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LocationFilters />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomerFilters />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <FinancialFilters />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SalesFilters />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <StrategicFilters />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TimeAndMetricFilters />
      </TabPanel>
    </Box>
  );
};

export default FilterPanel;
