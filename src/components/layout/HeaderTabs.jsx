// import { Box, ClickAwayListener, Grow, Stack, Typography } from '@mui/material';
// import { Add, Edit, Search } from '@mui/icons-material';
// import { StyledTab, StyledTabs } from '../../ui/overrides/Tabs';
// import StyledIconButton from '../../ui/overrides/IconButton';
// import HeaderProgress from './HeaderProgress';
// import useConfigStore from '../../store/useConfigStore';
// import useDataStore from '../../store/useDataStore';
// import Helper from '../../utils/Helper';
// import Constant from '../../utils/Constant';
// import { useEffect, useRef, useState } from 'react';
// import ConfigurationDialog from './ConfigurationDialog';
// import icon from "../../assets/images/icon.png";
// import logo from "../../assets/images/logo.png";
// import StyledTextField from '../../ui/overrides/TextField';
// import Scrollbar from 'react-scrollbars-custom';

// const HeaderTabs = () => {
//   const config = useConfigStore((state) => state.configuration);
//   const layout = useConfigStore((state) => state.layout);
//   const updateConfig = useConfigStore((state) => state.setConfig);
//   const currencies = useDataStore((state) => state.currencies);
//   const [isMobile, setIsMobile] = useState(false);
//   const [searchEnabled, setSearchEnabled] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const symbols = useDataStore((state) => state.currencies);
//   const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
//   const [filteredSymbols, setFilteredSymbols] = useState(symbols);
//   const anchorEl = useRef();
//   const setEditConfig = useConfigStore((state) => state.setEditConfig);
//   const allConfigs = useConfigStore((state) => state.allConfigs);
//   const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);
//   const setConfig = useConfigStore((state) => state.setConfig);

//   const calculateVarient = (item) => {
//     const weight = Helper.calculateConfigurationWeight(item, currencies);
//     if (weight > 0) {
//       return 'buy';
//     }
//     if (weight < 0) {
//       return 'sell';
//     }
//     return 'neutral';
//   };

//   useEffect(() => {
//     const cleanup = Helper.handleResize(setIsMobile);

//     return cleanup;
//   }, []);

//   useEffect(() => {
//     if (searchTerm && searchTerm !== '') {
//       const filter = symbols.filter(
//         (item) => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       setFilteredSymbols(filter);
//     } else {
//       setFilteredSymbols(symbols);
//     }
//   }, [searchTerm]);

//   const handleClose = (currency) => {
//     setSearchEnabled(false);
//     setSearchTerm('');
//     if (currency) {
//       setSelectedCurrency(currency);
//     }
//   };

//   const handleAddConfig = () => {
//     const item = { ...Constant.DEFAULT_CONFIGS[0] };
//     item.period = 'min15';
//     item.id = Date.now();
//     allConfigs.push(item);
//     updateAllConfig(allConfigs);
//     setConfig(item);
//     setEditConfig(true);
//   };

//   return (
//     <Stack direction="row"
//     height={isMobile ? '60px' : '70px'}
//     gap={isMobile ? 1 : 2}>
//       <HeaderProgress />
//       {layout === 'bubble' && (

//         <>
//           <Box width={"150px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
//           <img
//             className="ml-2"
//             src={isMobile ? icon : logo}
//             alt="Brand Image"

//             style={{ height: 40,}}
//           />

//           </Box>
//           <Scrollbar
//             style={{ height: '100%', display: 'flex', justifyContent: 'center' }} // Ensure it spans horizontally
//             noScrollY // Disable vertical scrolling
//             thumbXProps={{
//               renderer: (props) => {
//                 const { elementRef, ...restProps } = props;
//                 return (
//                   <div
//                     {...restProps}
//                     ref={elementRef}
//                     style={{
//                       backgroundColor: '#CFA935', // Thumb color
//                       borderRadius: '8px', // Rounded corners
//                       height: '5px', // Thumb height
//                       cursor: 'grab'
//                     }}
//                   />
//                 );
//               }
//             }}>
//                <div style={{ display: 'flex', width: 'max-content', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//                <StyledTabs
//             variant="scrollable"
//             value={config.id}
//             onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
//             scrollButtons={false}
//             sx={{
//               visibility: searchEnabled && isMobile ? 'hidden' : 'visible',
//               width: searchEnabled && isMobile ? '0%' : 'auto',
//             }}
//           >
//             {allConfigs.map((item) => {
//               return <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />;
//             })}
//           </StyledTabs>

//                </div>

//             </Scrollbar>

//       </>
//       )}
//       <Box p={1}>
//           <StyledIconButton onClick={() => setEditConfig(true)}>
//             <Edit />
//           </StyledIconButton>
//       </Box>
//       <Box p={1}>
//           <StyledIconButton onClick={() => handleAddConfig()}>
//             <Add />
//           </StyledIconButton>
//       </Box>
//       <Box p={1}>
//         {!searchEnabled && (
//           <StyledIconButton onClick={() => setSearchEnabled(true)}>
//             <Search />
//           </StyledIconButton>
//         )}
//       </Box>
//         {searchEnabled && (
//           <ClickAwayListener onClickAway={() => handleClose()}>
//             <Box
//               width={isMobile ? '70%' : '30%'} // 70% width on mobile view
//               position="relative"
//             >
//               <StyledTextField
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 autoFocus
//                 fullWidth
//                 ref={anchorEl}
//                 placeholder="Search symbol"
//                 InputProps={{ startAdornment: <Search /> }}
//                 sx={{
//                   ...(isMobile && searchEnabled && {
//                     left: '-16em',
//                     width: '306px',
//                     position: 'absolute',
//                     background: '#2b2929',
//                   }),
//                 }}
//               />

//               <Grow in={isMobile ? searchEnabled : searchTerm !== ''}>
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     zIndex: 9999,
//                     border: 0,
//                     mt: 1 / 2,
//                     mr: 1,
//                     borderRadius: 1,
//                     maxHeight: { xs: '400px', sm: 'auto' }, // For mobile, set max height
//                     width: { xs: '330px', sm: 'auto' }, // For mobile, set width
//                     transform: { xs: 'translate(-17.5em, 3em) !important', sm: 'none' },
//                     background: '#444444e6',
//                     backdropFilter: 'blur(8px)',
//                     overflow: 'scroll',
//                     boxShadow: '0px 0px 7px 7px #00000027'
//                   }}>
//                   {filteredSymbols.map((symbol, index) => {
//                     return (
//                       <Box
//                         display="flex"
//                         key={symbol.symbol}
//                         alignItems="center"
//                         justifyContent="space-between"
//                         onClick={() => handleClose(symbol)}
//                         sx={{
//                           cursor: 'pointer',
//                           px: 2,
//                           transition: 'background .4s',
//                           ':hover': { background: '#ffffff14' },
//                           borderBottom: filteredSymbols.length - 1 !== index ? '1px solid #656565' : ''
//                         }}>
//                         <Box display="flex" alignItems="center">
//                           <img width={20} height={20} src={symbol.image} alt={symbol.name} />
//                           <Typography color="white" ml={1} px={1} py={1}>
//                             {symbol.name}
//                           </Typography>
//                         </Box>
//                         <Typography fontWeight="600" color="#CCC" mr={1} px={1} py={1}>
//                           {symbol.symbol}
//                         </Typography>
//                       </Box>
//                     );
//                   })}
//                   {filteredSymbols.length === 0 && (
//                     <Typography variant="h6" color="#CCC" ml={1} px={1} py={1}>
//                       No symbols found
//                     </Typography>
//                   )}
//                 </Box>
//               </Grow>
//             </Box>
//           </ClickAwayListener>
//         )}
//       <ConfigurationDialog/>
//     </Stack>
//   );
// };

// export default HeaderTabs;

// import { Box, ClickAwayListener, Grow, Stack, Typography, Divider, Tooltip } from '@mui/material';
// import { Add, Edit, Search, FilterList, KeyboardArrowDown } from '@mui/icons-material';
// import { StyledTab, StyledTabs } from '../../ui/overrides/Tabs';
// import StyledIconButton from '../../ui/overrides/IconButton';
// import StyledButton from '../../ui/overrides/Button';
// import HeaderProgress from './HeaderProgress';
// import useConfigStore from '../../store/useConfigStore';
// import useDataStore from '../../store/useDataStore';
// import Helper from '../../utils/Helper';
// import Constant from '../../utils/Constant';
// import { useEffect, useRef, useState } from 'react';
// import ConfigurationDialog from './ConfigurationDialog';
// import icon from '../../assets/images/icon.png';
// import logo from '../../assets/images/logo.png';
// import StyledTextField from '../../ui/overrides/TextField';
// import Scrollbar from 'react-scrollbars-custom';
// import LocationFilters from '../filters/LocationFilters';
// import TimeAndMetricFilters from '../filters/TimeAndMetricFilters';

// const HeaderTabs = () => {
//   const config = useConfigStore((state) => state.configuration);
//   const layout = useConfigStore((state) => state.layout);
//   const updateConfig = useConfigStore((state) => state.setConfig);
//   const currencies = useDataStore((state) => state.currencies);
//   const [isMobile, setIsMobile] = useState(false);
//   const [searchEnabled, setSearchEnabled] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const symbols = useDataStore((state) => state.currencies);
//   const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
//   const [filteredSymbols, setFilteredSymbols] = useState(symbols);
//   const anchorEl = useRef();
//   const setEditConfig = useConfigStore((state) => state.setEditConfig);
//   const allConfigs = useConfigStore((state) => state.allConfigs);
//   const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);
//   const setConfig = useConfigStore((state) => state.setConfig);
//   const [filtersExpanded, setFiltersExpanded] = useState(false);

//   const calculateVarient = (item) => {
//     const weight = Helper.calculateConfigurationWeight(item, currencies);
//     if (weight > 0) {
//       return 'buy';
//     }
//     if (weight < 0) {
//       return 'sell';
//     }
//     return 'neutral';
//   };

//   useEffect(() => {
//     const cleanup = Helper.handleResize(setIsMobile);
//     return cleanup;
//   }, []);

//   useEffect(() => {
//     if (searchTerm && searchTerm !== '') {
//       const filter = symbols.filter(
//         (item) => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredSymbols(filter);
//     } else {
//       setFilteredSymbols(symbols);
//     }
//   }, [searchTerm]);

//   const handleClose = (currency) => {
//     setSearchEnabled(false);
//     setSearchTerm('');
//     if (currency) {
//       setSelectedCurrency(currency);
//     }
//   };

//   const handleAddConfig = () => {
//     const item = { ...Constant.DEFAULT_CONFIGS[0] };
//     item.period = 'min15';
//     item.id = Date.now();
//     allConfigs.push(item);
//     updateAllConfig(allConfigs);
//     setConfig(item);
//     setEditConfig(true);
//   };

//   const toggleFilters = () => {
//     setFiltersExpanded(!filtersExpanded);
//   };

//   return (
//     <Stack>
//       <Stack direction="row" height={isMobile ? '60px' : '70px'} gap={isMobile ? 1 : 2}>
//         <HeaderProgress />
//         {layout === 'bubble' && (
//           <>
//             <Box width={'150px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
//               <img className="ml-2" src={isMobile ? icon : logo} alt="Brand Image" style={{ height: 40 }} />
//             </Box>
//             <Scrollbar
//               style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
//               noScrollY
//               thumbXProps={{
//                 renderer: (props) => {
//                   const { elementRef, ...restProps } = props;
//                   return (
//                     <div
//                       {...restProps}
//                       ref={elementRef}
//                       style={{
//                         backgroundColor: '#CFA935',
//                         borderRadius: '8px',
//                         height: '5px',
//                         cursor: 'grab'
//                       }}
//                     />
//                   );
//                 }
//               }}>
//               <div style={{ display: 'flex', width: 'max-content', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
//                 <StyledTabs
//                   variant="scrollable"
//                   value={config.id}
//                   onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
//                   scrollButtons={false}
//                   sx={{
//                     visibility: searchEnabled && isMobile ? 'hidden' : 'visible',
//                     width: searchEnabled && isMobile ? '0%' : 'auto'
//                   }}>
//                   {allConfigs.map((item) => {
//                     return (
//                       <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />
//                     );
//                   })}
//                 </StyledTabs>
//               </div>
//             </Scrollbar>
//           </>
//         )}
//         <Box p={1}>
//           <StyledIconButton onClick={() => setEditConfig(true)}>
//             <Edit />
//           </StyledIconButton>
//         </Box>
//         <Box p={1}>
//           <StyledIconButton onClick={() => handleAddConfig()}>
//             <Add />
//           </StyledIconButton>
//         </Box>
//         <Box p={1} position="relative">
//           <StyledButton onClick={() => setFiltersExpanded(!filtersExpanded)} sx={{ background: filtersExpanded ? '#0676DB !important' : null }}>
//             <Stack direction="row" gap={1} alignItems="center">
//               <FilterList />
//               <Typography color="white" fontWeight="bold" textTransform="none">
//                 Filters
//               </Typography>
//               <KeyboardArrowDown
//                 sx={{
//                   transition: 'transform 0.4s',
//                   transform: filtersExpanded ? 'rotateZ(180deg)' : ''
//                 }}
//               />
//             </Stack>
//           </StyledButton>
//         </Box>
//         <Box p={1}>
//           {!searchEnabled && (
//             <StyledIconButton onClick={() => setSearchEnabled(true)}>
//               <Search />
//             </StyledIconButton>
//           )}
//         </Box>
//         {searchEnabled && (
//           <ClickAwayListener onClickAway={() => handleClose()}>
//             <Box width={isMobile ? '70%' : '30%'} position="relative">
//               <StyledTextField
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 autoFocus
//                 fullWidth
//                 ref={anchorEl}
//                 placeholder="Search symbol"
//                 InputProps={{ startAdornment: <Search /> }}
//                 sx={{
//                   ...(isMobile &&
//                     searchEnabled && {
//                       left: '-16em',
//                       width: '306px',
//                       position: 'absolute',
//                       background: '#2b2929'
//                     })
//                 }}
//               />

//               <Grow in={isMobile ? searchEnabled : searchTerm !== ''}>
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     zIndex: 9999,
//                     border: 0,
//                     mt: 1 / 2,
//                     mr: 1,
//                     borderRadius: 1,
//                     maxHeight: { xs: '400px', sm: 'auto' },
//                     width: { xs: '330px', sm: 'auto' },
//                     transform: { xs: 'translate(-17.5em, 3em) !important', sm: 'none' },
//                     background: '#444444e6',
//                     backdropFilter: 'blur(8px)',
//                     overflow: 'scroll',
//                     boxShadow: '0px 0px 7px 7px #00000027'
//                   }}>
//                   {filteredSymbols.map((symbol, index) => {
//                     return (
//                       <Box
//                         display="flex"
//                         key={symbol.symbol}
//                         alignItems="center"
//                         justifyContent="space-between"
//                         onClick={() => handleClose(symbol)}
//                         sx={{
//                           cursor: 'pointer',
//                           px: 2,
//                           transition: 'background .4s',
//                           ':hover': { background: '#ffffff14' },
//                           borderBottom: filteredSymbols.length - 1 !== index ? '1px solid #656565' : ''
//                         }}>
//                         <Box display="flex" alignItems="center">
//                           <img width={20} height={20} src={symbol.image} alt={symbol.name} />
//                           <Typography color="white" ml={1} px={1} py={1}>
//                             {symbol.name}
//                           </Typography>
//                         </Box>
//                         <Typography fontWeight="600" color="#CCC" mr={1} px={1} py={1}>
//                           {symbol.symbol}
//                         </Typography>
//                       </Box>
//                     );
//                   })}
//                   {filteredSymbols.length === 0 && (
//                     <Typography variant="h6" color="#CCC" ml={1} px={1} py={1}>
//                       No symbols found
//                     </Typography>
//                   )}
//                 </Box>
//               </Grow>
//             </Box>
//           </ClickAwayListener>
//         )}
//         <ConfigurationDialog />
//       </Stack>

//       <Grow in={filtersExpanded}>
//         <Box
//           sx={{
//             display: filtersExpanded ? 'block' : 'none',
//             background: '#444444e6',
//             backdropFilter: 'blur(8px)',
//             mx: 2,
//             mb: 2,
//             borderRadius: 1,
//             boxShadow: '0px 0px 7px 7px #00000027',
//             p: 2
//           }}>
//           <Typography typography="h6" color="#ccc" mb={1}>
//             Location
//           </Typography>
//           <Box mb={2}>
//             <LocationFilters />
//           </Box>

//           <Typography typography="h6" color="#ccc" mb={1}>
//             Time & Metrics
//           </Typography>
//           <Box>
//             <TimeAndMetricFilters />
//           </Box>
//         </Box>
//       </Grow>
//     </Stack>
//   );
// };

// export default HeaderTabs;

import { Box, ClickAwayListener, Grow, Stack, Typography, Menu, MenuItem } from '@mui/material';
import { Add, Edit, Search, FilterList, KeyboardArrowDown, AccessTime } from '@mui/icons-material';
import { StyledTab, StyledTabs } from '../../ui/overrides/Tabs';
import StyledIconButton from '../../ui/overrides/IconButton';
import StyledButton from '../../ui/overrides/Button';
import HeaderProgress from './HeaderProgress';
import useConfigStore from '../../store/useConfigStore';
import useDataStore from '../../store/useDataStore';
import Helper from '../../utils/Helper';
import Constant from '../../utils/Constant';
import { useEffect, useRef, useState } from 'react';
import ConfigurationDialog from './ConfigurationDialog';
import icon from '../../assets/images/icon.png';
import logo from '../../assets/images/logo.png';
import StyledTextField from '../../ui/overrides/TextField';
import Scrollbar from 'react-scrollbars-custom';
import LocationFilters from '../filters/LocationFilters';

const HeaderTabs = () => {
  const config = useConfigStore((state) => state.configuration);
  const layout = useConfigStore((state) => state.layout);
  const updateConfig = useConfigStore((state) => state.setConfig);
  const currencies = useDataStore((state) => state.currencies);
  const [isMobile, setIsMobile] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const symbols = useDataStore((state) => state.currencies);
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);
  const anchorEl = useRef();
  const setEditConfig = useConfigStore((state) => state.setEditConfig);
  const allConfigs = useConfigStore((state) => state.allConfigs);
  const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);
  const setConfig = useConfigStore((state) => state.setConfig);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  // Add state for the main filters panel
  const [mainFiltersOpen, setMainFiltersOpen] = useState(false);

  // State for time & metrics menu
  const [timeMenuAnchor, setTimeMenuAnchor] = useState(null);
  const [metricMenuAnchor, setMetricMenuAnchor] = useState(null);
  const timeMenuOpen = Boolean(timeMenuAnchor);
  const metricMenuOpen = Boolean(metricMenuAnchor);

  // State for industry menu
  const [industryMenuAnchor, setIndustryMenuAnchor] = useState(null);
  const industryMenuOpen = Boolean(industryMenuAnchor);

  // State for customer type menu
  const [customerTypeMenuAnchor, setCustomerTypeMenuAnchor] = useState(null);
  const customerTypeMenuOpen = Boolean(customerTypeMenuAnchor);

  // Get time & metric settings from store
  const filter = useDataStore((state) => state.filter);
  const setTimeFrame = useDataStore((state) => state.setTimeFrame);
  const setMetricType = useDataStore((state) => state.setMetricType);

  // Get available filter settings
  const setCustomerFilter = useDataStore((state) => state.setCustomerFilter);
  const setFinancialFilter = useDataStore((state) => state.setFinancialFilter);
  const setSalesFilter = useDataStore((state) => state.setSalesFilter);
  const setPriorityFilter = useDataStore((state) => state.setPriorityFilter);
  const setAiAdoptionFilter = useDataStore((state) => state.setAiAdoptionFilter);

  const calculateVarient = (item) => {
    const weight = Helper.calculateConfigurationWeight(item, currencies);
    if (weight > 0) {
      return 'buy';
    }
    if (weight < 0) {
      return 'sell';
    }
    return 'neutral';
  };

  useEffect(() => {
    const cleanup = Helper.handleResize(setIsMobile);
    return cleanup;
  }, []);

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      const filter = symbols.filter(
        (item) => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSymbols(filter);
    } else {
      setFilteredSymbols(symbols);
    }
  }, [searchTerm]);

  const handleClose = (currency) => {
    setSearchEnabled(false);
    setSearchTerm('');
    if (currency) {
      setSelectedCurrency(currency);
    }
  };

  const handleAddConfig = () => {
    const item = { ...Constant.DEFAULT_CONFIGS[0] };
    item.period = 'min15';
    item.id = Date.now();
    allConfigs.push(item);
    updateAllConfig(allConfigs);
    setConfig(item);
    setEditConfig(true);
  };

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded);
    // Close the other panel if it's open
    if (mainFiltersOpen) setMainFiltersOpen(false);
  };

  // Handle main filters toggle
  const toggleMainFilters = () => {
    setMainFiltersOpen(!mainFiltersOpen);
    // Close the other panel if it's open
    if (filtersExpanded) setFiltersExpanded(false);
  };

  // Handle time menu click
  const handleTimeMenuClick = (event) => {
    setTimeMenuAnchor(event.currentTarget);
  };

  // Handle time menu close
  const handleTimeMenuClose = () => {
    setTimeMenuAnchor(null);
  };

  // Handle time selection
  const handleTimeSelect = (timeFrame) => {
    setTimeFrame(timeFrame);
    handleTimeMenuClose();
  };

  // Handle metric menu click
  const handleMetricMenuClick = (event) => {
    setMetricMenuAnchor(event.currentTarget);
  };

  // Handle metric menu close
  const handleMetricMenuClose = () => {
    setMetricMenuAnchor(null);
  };

  // Handle metric selection
  const handleMetricSelect = (metricType) => {
    setMetricType(metricType);
    handleMetricMenuClose();
  };

  // Handle industry menu
  const handleIndustryMenuClick = (event) => {
    setIndustryMenuAnchor(event.currentTarget);
  };

  const handleIndustryMenuClose = () => {
    setIndustryMenuAnchor(null);
  };

  const handleIndustrySelect = (industry) => {
    setCustomerFilter({ industry });
    handleIndustryMenuClose();
  };

  // Handle customer type menu
  const handleCustomerTypeMenuClick = (event) => {
    setCustomerTypeMenuAnchor(event.currentTarget);
  };

  const handleCustomerTypeMenuClose = () => {
    setCustomerTypeMenuAnchor(null);
  };

  const handleCustomerTypeSelect = (type) => {
    setCustomerFilter({ type });
    handleCustomerTypeMenuClose();
  };

  // Format time frame for display
  const formatTimeFrame = (timeFrame) => {
    const mapping = {
      hour: 'Hour',
      day: 'Day',
      week: 'Week',
      month: 'Month',
      year: 'Year'
    };
    return mapping[timeFrame] || 'Month';
  };

  // Format metric type for display
  const formatMetricType = (metricType) => {
    const mapping = {
      revenue: 'Revenue',
      profit: 'Profit',
      growth: 'Growth'
    };
    return mapping[metricType] || 'Revenue';
  };

  // Helper functions for filter panel
  const handleCustomerFilter = (filterType, value) => {
    setCustomerFilter({ [filterType]: value });
  };

  const handleFinancialFilter = (filterType, value) => {
    setFinancialFilter({ [filterType]: value });
  };

  const handleSalesFilter = (filterType, value) => {
    setSalesFilter({ [filterType]: value });
  };

  return (
    <Stack>
      <Stack direction="row" height={isMobile ? '60px' : '70px'} gap={isMobile ? 1 : 2}>
        <HeaderProgress />
        {layout === 'bubble' && (
          <>
            <Box width={'150px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <img className="ml-2" src={isMobile ? icon : logo} alt="Brand Image" style={{ height: 40 }} />
            </Box>
            <Scrollbar
              style={{ height: '100%', display: 'flex', justifyContent: 'center' }}
              noScrollY
              thumbXProps={{
                renderer: (props) => {
                  const { elementRef, ...restProps } = props;
                  return (
                    <div
                      {...restProps}
                      ref={elementRef}
                      style={{
                        backgroundColor: '#CFA935',
                        borderRadius: '8px',
                        height: '5px',
                        cursor: 'grab'
                      }}
                    />
                  );
                }
              }}>
              <div style={{ display: 'flex', width: 'max-content', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <StyledTabs
                  variant="scrollable"
                  value={config.id}
                  onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
                  scrollButtons={false}
                  sx={{
                    visibility: searchEnabled && isMobile ? 'hidden' : 'visible',
                    width: searchEnabled && isMobile ? '0%' : 'auto'
                  }}>
                  {allConfigs.map((item) => {
                    return (
                      <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />
                    );
                  })}
                </StyledTabs>
              </div>
            </Scrollbar>
          </>
        )}
        <Box p={1}>
          <StyledIconButton onClick={() => setEditConfig(true)}>
            <Edit />
          </StyledIconButton>
        </Box>
        <Box p={1}>
          <StyledIconButton onClick={() => handleAddConfig()}>
            <Add />
          </StyledIconButton>
        </Box>
        <Box p={1}>
          <StyledButton onClick={toggleMainFilters} sx={{ background: mainFiltersOpen ? '#0676DB !important' : null }}>
            <Stack direction="row" gap={1} alignItems="center">
              <FilterList />
              <Typography color="white" fontWeight="bold" textTransform="none">
                Filters
              </Typography>
              <KeyboardArrowDown
                sx={{
                  transition: 'transform 0.4s',
                  transform: mainFiltersOpen ? 'rotateZ(180deg)' : ''
                }}
              />
            </Stack>
          </StyledButton>
        </Box>
        {/* Location Filter Button */}
        <Box p={1} position="relative">
          <StyledButton onClick={toggleFilters} sx={{ background: filtersExpanded ? '#0676DB !important' : null }}>
            <Stack direction="row" gap={1} alignItems="center">
              <FilterList />
              <Typography color="white" fontWeight="bold" textTransform="none">
                Location
              </Typography>
              <KeyboardArrowDown
                sx={{
                  transition: 'transform 0.4s',
                  transform: filtersExpanded ? 'rotateZ(180deg)' : ''
                }}
              />
            </Stack>
          </StyledButton>
        </Box>

        {/* Time Frame Button */}
        <Box p={1}>
          <StyledButton onClick={handleTimeMenuClick} sx={{ background: timeMenuOpen ? '#0676DB !important' : null }}>
            <Stack direction="row" gap={1} alignItems="center">
              <AccessTime />
              <Typography color="white" fontWeight="bold" textTransform="none">
                {formatTimeFrame(filter.timeFrame)}
              </Typography>
              <KeyboardArrowDown />
            </Stack>
          </StyledButton>

          {/* Time Frame Menu */}
          <Menu
            anchorEl={timeMenuAnchor}
            open={timeMenuOpen}
            onClose={handleTimeMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#333',
                color: 'white',
                minWidth: '120px'
              }
            }}>
            <MenuItem onClick={() => handleTimeSelect('hour')} selected={filter.timeFrame === 'hour'}>
              Hour
            </MenuItem>
            <MenuItem onClick={() => handleTimeSelect('day')} selected={filter.timeFrame === 'day'}>
              Day
            </MenuItem>
            <MenuItem onClick={() => handleTimeSelect('week')} selected={filter.timeFrame === 'week'}>
              Week
            </MenuItem>
            <MenuItem onClick={() => handleTimeSelect('month')} selected={filter.timeFrame === 'month'}>
              Month
            </MenuItem>
            <MenuItem onClick={() => handleTimeSelect('year')} selected={filter.timeFrame === 'year'}>
              Year
            </MenuItem>
          </Menu>
        </Box>

        {/* Metric Type Button */}
        <Box p={1}>
          <StyledButton onClick={handleMetricMenuClick} sx={{ background: metricMenuOpen ? '#0676DB !important' : null }}>
            <Stack direction="row" gap={1} alignItems="center">
              <Typography color="white" fontWeight="bold" textTransform="none">
                {formatMetricType(filter.metricType)}
              </Typography>
              <KeyboardArrowDown />
            </Stack>
          </StyledButton>

          {/* Metric Type Menu */}
          <Menu
            anchorEl={metricMenuAnchor}
            open={metricMenuOpen}
            onClose={handleMetricMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: '#333',
                color: 'white',
                minWidth: '120px'
              }
            }}>
            <MenuItem onClick={() => handleMetricSelect('revenue')} selected={filter.metricType === 'revenue'}>
              Revenue
            </MenuItem>
            <MenuItem onClick={() => handleMetricSelect('profit')} selected={filter.metricType === 'profit'}>
              Profit
            </MenuItem>
            <MenuItem onClick={() => handleMetricSelect('growth')} selected={filter.metricType === 'growth'}>
              Growth
            </MenuItem>
          </Menu>
        </Box>

        {/* Search Button */}
        <Box p={1}>
          {!searchEnabled && (
            <StyledIconButton onClick={() => setSearchEnabled(true)}>
              <Search />
            </StyledIconButton>
          )}
        </Box>

        {/* Search Dropdown */}
        {searchEnabled && (
          <ClickAwayListener onClickAway={() => handleClose()}>
            <Box width={isMobile ? '70%' : '30%'} position="relative">
              <StyledTextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                fullWidth
                ref={anchorEl}
                placeholder="Search symbol"
                InputProps={{ startAdornment: <Search /> }}
                sx={{
                  ...(isMobile &&
                    searchEnabled && {
                      left: '-16em',
                      width: '306px',
                      position: 'absolute',
                      background: '#2b2929'
                    })
                }}
              />

              <Grow in={isMobile ? searchEnabled : searchTerm !== ''}>
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 9999,
                    border: 0,
                    mt: 1 / 2,
                    mr: 1,
                    borderRadius: 1,
                    maxHeight: { xs: '400px', sm: 'auto' },
                    width: { xs: '330px', sm: 'auto' },
                    transform: { xs: 'translate(-17.5em, 3em) !important', sm: 'none' },
                    background: '#444444e6',
                    backdropFilter: 'blur(8px)',
                    overflow: 'scroll',
                    boxShadow: '0px 0px 7px 7px #00000027'
                  }}>
                  {filteredSymbols.map((symbol, index) => {
                    return (
                      <Box
                        display="flex"
                        key={symbol.symbol}
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleClose(symbol)}
                        sx={{
                          cursor: 'pointer',
                          px: 2,
                          transition: 'background .4s',
                          ':hover': { background: '#ffffff14' },
                          borderBottom: filteredSymbols.length - 1 !== index ? '1px solid #656565' : ''
                        }}>
                        <Box display="flex" alignItems="center">
                          <img width={20} height={20} src={symbol.image} alt={symbol.name} />
                          <Typography color="white" ml={1} px={1} py={1}>
                            {symbol.name}
                          </Typography>
                        </Box>
                        <Typography fontWeight="600" color="#CCC" mr={1} px={1} py={1}>
                          {symbol.symbol}
                        </Typography>
                      </Box>
                    );
                  })}
                  {filteredSymbols.length === 0 && (
                    <Typography variant="h6" color="#CCC" ml={1} px={1} py={1}>
                      No symbols found
                    </Typography>
                  )}
                </Box>
              </Grow>
            </Box>
          </ClickAwayListener>
        )}
        <ConfigurationDialog />
      </Stack>

      {/* Location filters dropdown */}
      {filtersExpanded && (
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? '60px' : '70px',
            left: 0,
            right: 0,
            background: '#444444e6',
            backdropFilter: 'blur(8px)',
            mx: 2,
            borderRadius: 1,
            boxShadow: '0px 0px 7px 7px #00000027',
            p: 2,
            zIndex: 100
          }}>
          <LocationFilters />
        </Box>
      )}

      {/* Main filters dropdown - with all advanced filters */}
      {mainFiltersOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: isMobile ? '60px' : '70px',
            left: 0,
            right: 0,
            background: '#444444e6',
            backdropFilter: 'blur(8px)',
            mx: 2,
            borderRadius: 1,
            boxShadow: '0px 0px 7px 7px #00000027',
            p: 2,
            zIndex: 100,
            maxHeight: 'calc(100vh - 100px)',
            overflow: 'auto'
          }}>
          <Typography variant="h6" color="#CFA935" mb={2}>
            Advanced Filters
          </Typography>

          {/* Customer Filters Section */}
          <Box mb={3}>
            <Typography fontWeight="bold" color="white" mb={1}>
              Customer Filters
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Industry
                </Typography>
                <StyledButton fullWidth size="small" onClick={handleIndustryMenuClick}>
                  {filter.customer?.industry || 'Select Industry'}
                </StyledButton>
                <Menu
                  anchorEl={industryMenuAnchor}
                  open={industryMenuOpen}
                  onClose={handleIndustryMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: '#333',
                      color: 'white',
                      minWidth: '150px'
                    }
                  }}>
                  <MenuItem onClick={() => handleIndustrySelect('Healthcare')} selected={filter.customer?.industry === 'Healthcare'}>
                    Healthcare
                  </MenuItem>
                  <MenuItem onClick={() => handleIndustrySelect('Finance')} selected={filter.customer?.industry === 'Finance'}>
                    Finance
                  </MenuItem>
                  <MenuItem onClick={() => handleIndustrySelect('Technology')} selected={filter.customer?.industry === 'Technology'}>
                    Technology
                  </MenuItem>
                  <MenuItem onClick={() => handleIndustrySelect('Education')} selected={filter.customer?.industry === 'Education'}>
                    Education
                  </MenuItem>
                  <MenuItem onClick={() => handleIndustrySelect('Manufacturing')} selected={filter.customer?.industry === 'Manufacturing'}>
                    Manufacturing
                  </MenuItem>
                  <MenuItem onClick={() => handleIndustrySelect('Retail')} selected={filter.customer?.industry === 'Retail'}>
                    Retail
                  </MenuItem>
                </Menu>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Customer Type
                </Typography>
                <StyledButton fullWidth size="small" onClick={handleCustomerTypeMenuClick}>
                  {filter.customer?.type || 'Select Type'}
                </StyledButton>
                <Menu
                  anchorEl={customerTypeMenuAnchor}
                  open={customerTypeMenuOpen}
                  onClose={handleCustomerTypeMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  PaperProps={{
                    sx: {
                      backgroundColor: '#333',
                      color: 'white',
                      minWidth: '150px'
                    }
                  }}>
                  <MenuItem onClick={() => handleCustomerTypeSelect('Corporate')} selected={filter.customer?.type === 'Corporate'}>
                    Corporate
                  </MenuItem>
                  <MenuItem onClick={() => handleCustomerTypeSelect('Government')} selected={filter.customer?.type === 'Government'}>
                    Government
                  </MenuItem>
                  <MenuItem onClick={() => handleCustomerTypeSelect('Non-Profit')} selected={filter.customer?.type === 'Non-Profit'}>
                    Non-Profit
                  </MenuItem>
                  <MenuItem onClick={() => handleCustomerTypeSelect('Academic')} selected={filter.customer?.type === 'Academic'}>
                    Academic
                  </MenuItem>
                </Menu>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Brand
                </Typography>
                <StyledButton
                  fullWidth
                  size="small"
                  onClick={() => {
                    // You can add state and menu handlers for this like the others
                    setCustomerFilter({ brand: 'NetCom Learning' });
                  }}>
                  {filter.customer?.brand || 'Select Brand'}
                </StyledButton>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Account Status
                </Typography>
                <StyledButton
                  fullWidth
                  size="small"
                  onClick={() => {
                    // You can add state and menu handlers for this like the others
                    setCustomerFilter({ status: 'Active' });
                  }}>
                  {filter.customer?.status || 'Select Status'}
                </StyledButton>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  AI Adoption Level
                </Typography>
                <StyledButton
                  fullWidth
                  size="small"
                  onClick={() => {
                    // You can add state and menu handlers for this like the others
                    setAiAdoptionFilter('Exploring');
                  }}>
                  {filter.aiAdoption || 'Select Level'}
                </StyledButton>
              </Box>
            </Stack>
          </Box>

          {/* Financial Filters Section */}
          <Box mb={3}>
            <Typography fontWeight="bold" color="white" mb={1}>
              Financial Filters
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Revenue Range
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => handleFinancialFilter('revenueRange', '100kTo1m')}>
                  {filter.financial?.revenueRange
                    ? filter.financial.revenueRange === 'under100k'
                      ? 'Under $100K'
                      : filter.financial.revenueRange === '100kTo1m'
                        ? '$100K - $1M'
                        : filter.financial.revenueRange === '1mTo10m'
                          ? '$1M - $10M'
                          : filter.financial.revenueRange === 'over10m'
                            ? 'Over $10M'
                            : 'Select Range'
                    : 'Select Range'}
                </StyledButton>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Deal Size
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => handleFinancialFilter('dealSize', 'medium')}>
                  {filter.financial?.dealSize
                    ? filter.financial.dealSize === 'small'
                      ? 'Small'
                      : filter.financial.dealSize === 'medium'
                        ? 'Medium'
                        : filter.financial.dealSize === 'large'
                          ? 'Large'
                          : filter.financial.dealSize === 'enterprise'
                            ? 'Enterprise'
                            : 'Select Size'
                    : 'Select Size'}
                </StyledButton>
              </Box>
            </Stack>
          </Box>

          {/* Sales Filters Section */}
          <Box mb={3}>
            <Typography fontWeight="bold" color="white" mb={1}>
              Sales Filters
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" mb={2}>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Sales Rep
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => setSalesFilter({ rep: 'John Smith' })}>
                  {filter.sales?.rep || 'Select Rep'}
                </StyledButton>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Territory
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => setSalesFilter({ territory: 'East Coast' })}>
                  {filter.sales?.territory || 'Select Territory'}
                </StyledButton>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Opportunity Stage
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => setSalesFilter({ opportunityStage: 'Proposal' })}>
                  {filter.sales?.opportunityStage || 'Select Stage'}
                </StyledButton>
              </Box>
              <Box flex={1} minWidth="200px">
                <Typography color="#ccc" fontSize="0.9rem" mb={0.5}>
                  Engagement Recency
                </Typography>
                <StyledButton fullWidth size="small" onClick={() => setSalesFilter({ engagementRecency: 'last30' })}>
                  {filter.sales?.engagementRecency
                    ? filter.sales.engagementRecency === 'last30'
                      ? 'Last 30 Days'
                      : filter.sales.engagementRecency === '30to90'
                        ? '30-90 Days'
                        : filter.sales.engagementRecency === 'over90'
                          ? 'Over 90 Days'
                          : 'Select Recency'
                    : 'Select Recency'}
                </StyledButton>
              </Box>
            </Stack>
          </Box>

          {/* Priority Filter Section */}
          <Box>
            <Typography fontWeight="bold" color="white" mb={1}>
              Other Filters
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box>
                <StyledButton
                  size="small"
                  sx={{
                    background: filter.priority?.isCeoPriority ? '#0676DB !important' : null
                  }}
                  onClick={() => setPriorityFilter(!filter.priority?.isCeoPriority)}>
                  <Typography color="white" fontWeight="bold" textTransform="none">
                    CEO Priority
                  </Typography>
                </StyledButton>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default HeaderTabs;
