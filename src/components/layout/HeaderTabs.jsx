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

  // State for time & metrics menu
  const [timeMenuAnchor, setTimeMenuAnchor] = useState(null);
  const [metricMenuAnchor, setMetricMenuAnchor] = useState(null);
  const timeMenuOpen = Boolean(timeMenuAnchor);
  const metricMenuOpen = Boolean(metricMenuAnchor);

  // Get time & metric settings from store
  const filter = useDataStore((state) => state.filter);
  const setTimeFrame = useDataStore((state) => state.setTimeFrame);
  const setMetricType = useDataStore((state) => state.setMetricType);

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

      {/* Only show LocationFilters in the dropdown */}
      <Grow in={filtersExpanded}>
        <Box
          sx={{
            display: filtersExpanded ? 'block' : 'none',
            background: '#444444e6',
            backdropFilter: 'blur(8px)',
            mx: 2,
            mb: 2,
            borderRadius: 1,
            boxShadow: '0px 0px 7px 7px #00000027',
            p: 2
          }}>
          <LocationFilters />
        </Box>
      </Grow>
    </Stack>
  );
};

export default HeaderTabs;
