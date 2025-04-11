// import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Slide, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Add, Close, KeyboardArrowDown } from '@mui/icons-material';
// import StyledIconButton from '../../ui/overrides/IconButton';
// import useDataStore from '../../store/useDataStore';
// import ChartCanvas from './ChartCanvas';
// import PriceCalculator from '../common/PriceCalulator';
// import CurrencyPerformanceGrid from './CurrencyPerformanceGrid';
// import TradeLinks from './TradeLinks';
// import SymbolInfo from './SymbolInfo';
// import WishlistAdd from './WishlistAdd';
// import Scrollbar from 'react-scrollbars-custom';
// import NewsSection from '../NewsSection';
// import Helper from '../../utils/Helper';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

// const ChartView = () => {
//   const selectedCurrency = useDataStore((state) => state.selectedCurrency);
//   const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
//   const isCurrencySelected = !!selectedCurrency;
//   const [quotes, setQuotes] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [period, setPeriod] = useState('year');
//   const [expanded, setExpanded] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [newsData, setNewsData] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);

//   console.log('news', newsData?.stories);

//   useEffect(() => {
//     const cleanup = Helper.handleResize(setIsMobile);

//     return cleanup;
//   }, []);

//   const fetchData = async () => {
//     setQuotes(null);
//     setIsLoading(true);
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/stocks/chart/${selectedCurrency.symbol}/${period}`); // await fetch(`https://api.npoint.io/898c9b0216b7ba2385b1`);
//     const json = await response.json();
//     setQuotes(json);
//     setIsLoading(false);
//   };
//   // useEffect(() => {
//   //   if (isCurrencySelected) fetchData();
//   // }, [isCurrencySelected, period]);

//   const handleNewsSection = async (symbol) => {
//     try {
//       setLoading(true);
//       // const response = await fetch(`${process.env.CRYPTO_NEWS_URL}/${symbol}`);
//       const url = `${process.env.REACT_APP_CRYPTO_NEWS}/news/get-news?ticker=${symbol}`;
//       console.log('url', url);
//       // console.log('env url', process.env.REACT_APP_LOCAL_CRYPTO_NEWS);
//       const response = await fetch(url);
//       const result = await response.json();
//       setNewsData(result?.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isCurrencySelected) {
//       fetchData(); // Fetch chart data
//       handleNewsSection(selectedCurrency.symbol); // Fetch news data
//     }
//   }, [isCurrencySelected, period]);

//   return (
//     <Dialog
//       fullWidth
//       open={isCurrencySelected}
//       hideBackdrop
//       maxWidth="md"
//       scroll="paper"
//       TransitionComponent={Transition}
//       sx={{ '& .MuiDialog-container': { alignItems: 'start' } }}
//       PaperProps={{
//         sx: { background: '#444444e6', backdropFilter: 'blur(8px)', marginTop: 'min(10%, 100px)', marginX: 2, width: 'calc(100% - 32px)' }
//       }}>
//       {isCurrencySelected && (
//         <>
//           <DialogTitle typography="body1" display="flex" justifyContent="space-between" color="white" sx={{ padding: 1 }}>
//             <Box display="flex" alignItems="center">
//               <StyledIconButton onClick={() => setExpanded(!expanded)} sx={{ mr: 1 }}>
//                 <KeyboardArrowDown sx={{ transition: 'all 0.2s', transform: expanded ? '' : 'rotateZ(-90deg)' }} />
//               </StyledIconButton>
//               <WishlistAdd symbol={selectedCurrency} />
//               <img src={selectedCurrency.image} height={20} width={20} alt={selectedCurrency.symbol} style={{ marginRight: '10px' }} />
//               {selectedCurrency.name}
//             </Box>
//             <StyledIconButton onClick={() => setSelectedCurrency(null)}>
//               <Close />
//             </StyledIconButton>
//           </DialogTitle>
//           {expanded && (
//             <DialogContent sx={{ padding: 0 }}>
//               <Grid container overflow={'hidden'}>
//                 <Grid item xs={12} md={8.5}>
//                   <Box display={'flex'} alignItems={'center'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'space-between'}>
//                     <TradeLinks symbol={selectedCurrency} />
//                     <PriceCalculator selectedCurrency={selectedCurrency} />
//                     <SymbolInfo symbol={selectedCurrency} />
//                   </Box>
//                   {isLoading && (
//                     <Box display="flex" justifyContent="center" p={5} height={240} alignItems="center">
//                       <img className="rotate-center" src={selectedCurrency.image} height={70} width={70} alt={selectedCurrency.symbol} />
//                     </Box>
//                   )}
//                   {!isLoading && quotes && <ChartCanvas quotes={quotes} period={period} />}
//                   {selectedCurrency && <CurrencyPerformanceGrid symbol={selectedCurrency} period={period} setPeriod={setPeriod} />}
//                 </Grid>
//                 <Grid item xs={12} md={3.5} display={'flex'} flexDirection={'column'} paddingX={1} paddingBottom={2}>
//                   <Typography variant="h7" color="white" borderBottom={'2px solid #2A2E36'} width={'100%'} paddingY={1}>
//                     Latest News
//                   </Typography>
//                   <Box
//                     marginTop={2}
//                     height={isMobile ? 420 : '100%'}
//                     sx={{
//                       overflowY: 'scroll', // Enable vertical scrolling
//                       scrollbarWidth: 'none', // Hide scrollbar for Firefox
//                       '&::-webkit-scrollbar': { display: 'none' } // Hide scrollbar for Chrome, Safari, and Edge
//                     }}>
//                     {loading ? (
//                       <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                         <CircularProgress sx={{ color: '#CFA935' }} />
//                       </Box>
//                     ) : (
//                       <Scrollbar
//                         style={{ height: '100%' }}
//                         noScrollX
//                         thumbYProps={{
//                           renderer: (props) => {
//                             const { elementRef, ...restProps } = props;
//                             return (
//                               <div
//                                 {...restProps}
//                                 ref={elementRef}
//                                 style={{
//                                   backgroundColor: '#CFA935', // Thumb color
//                                   borderRadius: '8px' // Optional: rounded corners for the scrollbar thumb
//                                 }}
//                               />
//                             );
//                           }
//                         }}>
//                         {newsData?.stories?.map((newsItem, index) => (
//                           <NewsSection key={index} newsItem={newsItem} />
//                         ))}
//                       </Scrollbar>
//                     )}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//           )}
//         </>
//       )}
//     </Dialog>
//   );
// };

// export default ChartView;

// import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Slide, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { Close, KeyboardArrowDown } from '@mui/icons-material';
// import StyledIconButton from '../../ui/overrides/IconButton';
// import useDataStore from '../../store/useDataStore';
// import ChartCanvas from './ChartCanvas';
// import Helper from '../../utils/Helper';
// import useConfigStore from '../../store/useConfigStore';
// import { Scrollbar } from 'react-scrollbars-custom';
// import NewsSection from '../NewsSection';

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });

// const ChartView = () => {
//   const selectedRevenue = useDataStore((state) => state.selectedRevenue);
//   const setSelectedRevenue = useDataStore((state) => state.setSelectedRevenue);
//   const isRevenueSelected = !!selectedRevenue;
//   const [quotes, setQuotes] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [period, setPeriod] = useState('month');
//   const [expanded, setExpanded] = useState(true);
//   const [fetchError, setFetchError] = useState(false);
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const config = useConfigStore((state) => state.configuration);

//   useEffect(() => {
//     const p = config?.period;

//     // Check the value of `p` and set the period accordingly
//     if (['hour', 'day', 'week', 'month', 'year'].includes(p)) {
//       setPeriod(p);  // Set the period as p if it matches one of the allowed values
//     } else {
//       setPeriod('month');  // Default to 'month' for revenue data
//     }
//   }, [config]);

//   useEffect(() => {
//     const cleanup = Helper.handleResize(setIsMobile);
//     return cleanup;
//   }, []);

//   const fetchData = async () => {
//     setQuotes(null);
//     setIsLoading(true);
//     setFetchError(false);

//     try {
//       // This would be replaced with your actual revenue data fetch
//       // For now we'll simulate it with a timeout
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Create sample chart data based on revenue metrics
//       const revenueHistory = [];
//       const startDate = new Date();

//       // Number of data points based on period
//       let dataPoints = 12;
//       let dateIncrement = (date) => date.setMonth(date.getMonth() - 1);

//       if (period === 'week') {
//         dataPoints = 52;
//         dateIncrement = (date) => date.setDate(date.getDate() - 7);
//       } else if (period === 'day') {
//         dataPoints = 30;
//         dateIncrement = (date) => date.setDate(date.getDate() - 1);
//       } else if (period === 'year') {
//         dataPoints = 5;
//         dateIncrement = (date) => date.setFullYear(date.getFullYear() - 1);
//       }

//       // Start from the current date and work backward
//       const currentDate = new Date();

//       for (let i = 0; i < dataPoints; i++) {
//         const date = new Date(currentDate);
//         dateIncrement(date);

//         // Get base value from the metrics, defaulting to 'month' if the period isn't available
//         const baseValue = selectedRevenue.metrics.revenue[period] || selectedRevenue.metrics.revenue.month;

//         // Add some variation (more for longer periods, less for shorter ones)
//         const variationFactor = period === 'year' ? 0.15 : period === 'month' ? 0.05 : 0.02;
//         const value = baseValue * (1 + (Math.random() * variationFactor - variationFactor/2));

//         revenueHistory.unshift({
//           date: date.toISOString(),
//           value
//         });

//         currentDate.setTime(date.getTime());
//       }

//       setQuotes(revenueHistory);
//       setFetchError(false);
//     } catch (error) {
//       setFetchError(true);
//       console.error('Failed to fetch revenue data:', error);
//     }

//     setIsLoading(false);
//   };

//   const handleNewsSection = async (location) => {
//     try {
//       setLoading(true);
//       // Replace with actual news API for location or industry news
//       // This is a placeholder
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       setNewsData({
//         data: {
//           results: [
//             {
//               title: `${location.name} reports strong Q2 revenue growth`,
//               description: "The company exceeded market expectations with a significant increase in quarterly revenue.",
//               url: "#",
//               image_url: "https://via.placeholder.com/150",
//               source: "Business News"
//             },
//             {
//               title: `Economic trends in ${location.state}`,
//               description: "A look at how regional economic trends are affecting businesses in the area.",
//               url: "#",
//               image_url: "https://via.placeholder.com/150",
//               source: "Regional Report"
//             }
//           ]
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isRevenueSelected) {
//       fetchData(); // Fetch chart data
//       handleNewsSection(selectedRevenue); // Fetch news data
//     }
//   }, [isRevenueSelected, period]);

//   return (
//     <Dialog
//       fullWidth
//       open={isRevenueSelected}
//       hideBackdrop
//       maxWidth="md"
//       scroll="paper"
//       TransitionComponent={Transition}
//       sx={{ '& .MuiDialog-container': { alignItems: 'start' } }}
//       PaperProps={{
//         sx: {
//           background: '#171A24',
//           backdropFilter: 'blur(8px)',
//           marginTop: 'min(10%, 100px)',
//           marginX: 2,
//           width: 'calc(100% - 32px)'
//         }
//       }}>
//       {isRevenueSelected && (
//         <>
//           <DialogTitle typography="body1" display="flex" justifyContent="space-between" color="white" sx={{ padding: 1 }}>
//             <Box display="flex" alignItems="center">
//               <StyledIconButton onClick={() => setExpanded(!expanded)} sx={{ mr: 2 }}>
//                 <KeyboardArrowDown sx={{ transition: 'all 0.2s', transform: expanded ? '' : 'rotateZ(-90deg)' }} />
//               </StyledIconButton>
//               <img
//                 src={selectedRevenue?.image || "https://via.placeholder.com/20"}
//                 height={20}
//                 width={20}
//                 alt={selectedRevenue?.name}
//                 style={{ marginRight: '10px' }}
//               />
//               {selectedRevenue?.name}, {selectedRevenue?.state}, {selectedRevenue?.country}
//             </Box>
//             <StyledIconButton onClick={() => setSelectedRevenue(null)}>
//               <Close />
//             </StyledIconButton>
//           </DialogTitle>

//           {expanded && (
//             <DialogContent sx={{ padding: 0 }}>
//               <Grid container>
//                 <Grid item xs={12} md={8.5}>
//                   <Box display={"flex"} alignItems={"center"} flexDirection={isMobile ? "column" : "row"} justifyContent={"space-between"} p={2}>
//                     <Box>
//                       <Typography variant="h6" color="white">
//                         Revenue: ${selectedRevenue.metrics.revenue[period].toLocaleString()}
//                       </Typography>
//                       <Typography variant="h6" color="white">
//                         Profit: ${selectedRevenue.metrics.profit[period].toLocaleString()}
//                       </Typography>
//                       <Typography
//                         variant="h6"
//                         color={selectedRevenue.metrics.growth[period] >= 0 ? "#4CAF50" : "#F44336"}
//                       >
//                         Growth: {Helper.formatPercentage(selectedRevenue.metrics.growth[period])}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   {isLoading && (
//                     <Box display="flex" justifyContent="center" p={5} height={240} alignItems="center">
//                       <CircularProgress sx={{ color: '#CFA935' }} />
//                     </Box>
//                   )}
//                   {fetchError && (
//                     <Box display="flex" justifyContent="center" p={5} height={240} alignItems="center">
//                       <Typography color="error" variant="h6" textAlign="center">
//                         Unable to load revenue data. <br />
//                         Please try again later.
//                       </Typography>
//                     </Box>
//                   )}
//                   {!isLoading && quotes && <ChartCanvas quotes={quotes} period={period} />}

//                   {/* Revenue Period Selection */}
//                   <Box p={2}>
//                     <Typography variant="subtitle1" color="white" mb={1}>Time Period</Typography>
//                     <Box display="flex" gap={1}>
//                       {['day', 'week', 'month', 'year'].map((p) => (
//                         <Box
//                           key={p}
//                           sx={{
//                             padding: '6px 16px',
//                             borderRadius: '4px',
//                             backgroundColor: period === p ? '#3a3f50' : '#1E2130',
//                             cursor: 'pointer',
//                             '&:hover': { backgroundColor: period === p ? '#3a3f50' : '#2A2E36' }
//                           }}
//                           onClick={() => setPeriod(p)}
//                         >
//                           <Typography variant="body2" color="white">
//                             {p.charAt(0).toUpperCase() + p.slice(1)}
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 </Grid>
//                 <Grid item xs={12} md={3.5} display={'flex'} flexDirection={'column'} paddingX={1} paddingBottom={2}>
//                   <Typography variant="subtitle1" color="white" borderBottom={'2px solid #2A2E36'} width={'100%'} paddingY={1}>
//                     Location Insights
//                   </Typography>
//                   <Box
//                     marginTop={2}
//                     height={isMobile ? 420 : "100%"}
//                     sx={{
//                       overflowY: 'scroll',
//                       scrollbarWidth: 'none',
//                       '&::-webkit-scrollbar': { display: 'none' }
//                     }}>
//                     {loading ? (
//                       <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                         <CircularProgress sx={{ color: '#CFA935' }} />
//                       </Box>
//                     ) : (
//                       <Scrollbar
//                         style={{ height: '100%' }}
//                         noScrollX
//                         thumbYProps={{
//                           renderer: (props) => {
//                             const { elementRef, ...restProps } = props;
//                             return (
//                               <div
//                                 {...restProps}
//                                 ref={elementRef}
//                                 style={{
//                                   backgroundColor: '#CFA935',
//                                   borderRadius: '8px'
//                                 }}
//                               />
//                             );
//                           }
//                         }}>
//                         {/* Location Details Section */}
//                         <Box p={2} mb={2} bgcolor="#1E2130" borderRadius="4px">
//                           <Typography variant="subtitle2" color="#CFA935" mb={1}>
//                             Location Details
//                           </Typography>
//                           <Typography variant="body2" color="white">
//                             <strong>City:</strong> {selectedRevenue.name}
//                           </Typography>
//                           <Typography variant="body2" color="white">
//                             <strong>State:</strong> {selectedRevenue.state}
//                           </Typography>
//                           <Typography variant="body2" color="white">
//                             <strong>Country:</strong> {selectedRevenue.country}
//                           </Typography>
//                         </Box>

//                         {/* News Section */}
//                         <Typography variant="subtitle2" color="#CFA935" px={2} mb={1}>
//                           Related News
//                         </Typography>
//                         {newsData?.data?.results?.map((newsItem, index) => (
//                           <NewsSection key={index} newsItem={newsItem} />
//                         ))}
//                       </Scrollbar>
//                     )}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </DialogContent>
//           )}
//         </>
//       )}
//     </Dialog>
//   );
// };

// export default ChartView;
import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, Grid, Slide, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Close, KeyboardArrowDown } from '@mui/icons-material';
import StyledIconButton from '../../ui/overrides/IconButton';
import useDataStore from '../../store/useDataStore';
import ChartCanvas from './ChartCanvas';
import Helper from '../../utils/Helper';
import useConfigStore from '../../store/useConfigStore';
import { Scrollbar } from 'react-scrollbars-custom';
import NewsSection from '../NewsSection';
import { getLocationImage } from '../../data/locationImages';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ChartView = () => {
  const selectedRevenue = useDataStore((state) => state.selectedRevenue);
  const setSelectedRevenue = useDataStore((state) => state.setSelectedRevenue);
  const isRevenueSelected = !!selectedRevenue;
  const [quotes, setQuotes] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [expanded, setExpanded] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const config = useConfigStore((state) => state.configuration);

  // Add safe getters to avoid "Cannot read properties of undefined" errors
  const getRevenueValue = (metric, timeframe) => {
    if (!selectedRevenue?.metrics?.[metric]?.[timeframe]) {
      return 0; // Default value if data is missing
    }
    return selectedRevenue.metrics[metric][timeframe];
  };

  const getGrowthValue = (timeframe) => {
    if (!selectedRevenue?.metrics?.growth?.[timeframe]) {
      return 0; // Default value if data is missing
    }
    return selectedRevenue.metrics.growth[timeframe];
  };

  useEffect(() => {
    const p = config?.period;

    // Check the value of `p` and set the period accordingly
    if (['hour', 'day', 'week', 'month', 'year'].includes(p)) {
      setPeriod(p); // Set the period as p if it matches one of the allowed values
    } else {
      setPeriod('month'); // Default to 'month' for revenue data
    }
  }, [config]);

  useEffect(() => {
    const cleanup = Helper.handleResize(setIsMobile);
    return cleanup;
  }, []);

  const fetchData = async () => {
    setQuotes(null);
    setIsLoading(true);
    setFetchError(false);

    try {
      // This would be replaced with your actual revenue data fetch
      // For now we'll simulate it with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create sample chart data based on revenue metrics
      const revenueHistory = [];
      const startDate = new Date();

      // Number of data points based on period
      let dataPoints = 12;
      let dateIncrement = (date) => date.setMonth(date.getMonth() - 1);

      if (period === 'week') {
        dataPoints = 52;
        dateIncrement = (date) => date.setDate(date.getDate() - 7);
      } else if (period === 'day') {
        dataPoints = 30;
        dateIncrement = (date) => date.setDate(date.getDate() - 1);
      } else if (period === 'year') {
        dataPoints = 5;
        dateIncrement = (date) => date.setFullYear(date.getFullYear() - 1);
      }

      // Start from the current date and work backward
      const currentDate = new Date();

      for (let i = 0; i < dataPoints; i++) {
        const date = new Date(currentDate);
        dateIncrement(date);

        // Get base value from the metrics, defaulting to 'month' if the period isn't available
        const baseValue = getRevenueValue('revenue', period) || getRevenueValue('revenue', 'month');

        // Add some variation (more for longer periods, less for shorter ones)
        const variationFactor = period === 'year' ? 0.15 : period === 'month' ? 0.05 : 0.02;
        const value = baseValue * (1 + (Math.random() * variationFactor - variationFactor / 2));

        revenueHistory.unshift({
          date: date.toISOString(),
          value
        });

        currentDate.setTime(date.getTime());
      }

      setQuotes(revenueHistory);
      setFetchError(false);
    } catch (error) {
      setFetchError(true);
      console.error('Failed to fetch revenue data:', error);
    }

    setIsLoading(false);
  };

  const handleNewsSection = async (location) => {
    try {
      setLoading(true);
      // Replace with actual news API for location or industry news
      // This is a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setNewsData({
        data: {
          results: [
            {
              title: `${location.name} reports strong Q2 revenue growth`,
              description: 'The company exceeded market expectations with a significant increase in quarterly revenue.',
              url: '#',
              image_url: 'https://via.placeholder.com/150',
              source: 'Business News'
            },
            {
              title: `Economic trends in ${location.state}`,
              description: 'A look at how regional economic trends are affecting businesses in the area.',
              url: '#',
              image_url: 'https://via.placeholder.com/150',
              source: 'Regional Report'
            }
          ]
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isRevenueSelected && selectedRevenue?.metrics) {
      fetchData(); // Fetch chart data
      handleNewsSection(selectedRevenue); // Fetch news data
    }
  }, [isRevenueSelected, period, selectedRevenue]);

  // Get the appropriate image for the selected location
  const getSelectedLocationImage = () => {
    if (selectedRevenue) {
      // First try to use the image from the data
      if (selectedRevenue.image) {
        return selectedRevenue.image;
      }

      // Otherwise generate an image based on the location
      return getLocationImage(selectedRevenue);
    }
    return 'https://via.placeholder.com/20';
  };

  // Check if we have valid metrics data before rendering
  const hasValidMetrics = selectedRevenue?.metrics?.revenue && selectedRevenue?.metrics?.profit && selectedRevenue?.metrics?.growth;

  return (
    <Dialog
      fullWidth
      open={isRevenueSelected}
      hideBackdrop
      maxWidth="md"
      scroll="paper"
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-container': { alignItems: 'start' } }}
      PaperProps={{
        sx: {
          background: '#171A24',
          backdropFilter: 'blur(8px)',
          marginTop: 'min(10%, 100px)',
          marginX: 2,
          width: 'calc(100% - 32px)'
        }
      }}>
      {isRevenueSelected && (
        <>
          <DialogTitle typography="body1" display="flex" justifyContent="space-between" color="white" sx={{ padding: 1 }}>
            <Box display="flex" alignItems="center">
              <StyledIconButton onClick={() => setExpanded(!expanded)} sx={{ mr: 2 }}>
                <KeyboardArrowDown sx={{ transition: 'all 0.2s', transform: expanded ? '' : 'rotateZ(-90deg)' }} />
              </StyledIconButton>
              <img
                src={getSelectedLocationImage()}
                height={30}
                width={30}
                alt={selectedRevenue?.name}
                style={{ marginRight: '10px', borderRadius: '50%', objectFit: 'cover' }}
              />
              {selectedRevenue?.name}, {selectedRevenue?.state}, {selectedRevenue?.country}
            </Box>
            <StyledIconButton onClick={() => setSelectedRevenue(null)}>
              <Close />
            </StyledIconButton>
          </DialogTitle>

          {expanded && (
            <DialogContent sx={{ padding: 0 }}>
              <Grid container>
                <Grid item xs={12} md={8.5}>
                  <Box display={'flex'} alignItems={'center'} flexDirection={isMobile ? 'column' : 'row'} justifyContent={'space-between'} p={2}>
                    <Box>
                      {hasValidMetrics ? (
                        <>
                          <Typography variant="h6" color="white">
                            Revenue: ${getRevenueValue('revenue', period).toLocaleString()}
                          </Typography>
                          <Typography variant="h6" color="white">
                            Profit: ${getRevenueValue('profit', period).toLocaleString()}
                          </Typography>
                          <Typography variant="h6" color={getGrowthValue(period) >= 0 ? '#4CAF50' : '#F44336'}>
                            Growth: {Helper.formatPercentage(getGrowthValue(period))}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h6" color="#CCC">
                          Loading metrics data...
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {isLoading && (
                    <Box display="flex" justifyContent="center" p={5} height={240} alignItems="center">
                      <CircularProgress sx={{ color: '#CFA935' }} />
                    </Box>
                  )}
                  {fetchError && (
                    <Box display="flex" justifyContent="center" p={5} height={240} alignItems="center">
                      <Typography color="error" variant="h6" textAlign="center">
                        Unable to load revenue data. <br />
                        Please try again later.
                      </Typography>
                    </Box>
                  )}
                  {!isLoading && quotes && <ChartCanvas quotes={quotes} period={period} />}

                  {/* Revenue Period Selection */}
                  <Box p={2}>
                    <Typography variant="subtitle1" color="white" mb={1}>
                      Time Period
                    </Typography>
                    <Box display="flex" gap={1}>
                      {['day', 'week', 'month', 'year'].map((p) => (
                        <Box
                          key={p}
                          sx={{
                            padding: '6px 16px',
                            borderRadius: '4px',
                            backgroundColor: period === p ? '#3a3f50' : '#1E2130',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: period === p ? '#3a3f50' : '#2A2E36' }
                          }}
                          onClick={() => setPeriod(p)}>
                          <Typography variant="body2" color="white">
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={3.5} display={'flex'} flexDirection={'column'} paddingX={1} paddingBottom={2}>
                  <Typography variant="subtitle1" color="white" borderBottom={'2px solid #2A2E36'} width={'100%'} paddingY={1}>
                    Location Insights
                  </Typography>
                  <Box
                    marginTop={2}
                    height={isMobile ? 420 : '100%'}
                    sx={{
                      overflowY: 'scroll',
                      scrollbarWidth: 'none',
                      '&::-webkit-scrollbar': { display: 'none' }
                    }}>
                    {loading ? (
                      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <CircularProgress sx={{ color: '#CFA935' }} />
                      </Box>
                    ) : (
                      <Scrollbar
                        style={{ height: '100%' }}
                        noScrollX
                        thumbYProps={{
                          renderer: (props) => {
                            const { elementRef, ...restProps } = props;
                            return (
                              <div
                                {...restProps}
                                ref={elementRef}
                                style={{
                                  backgroundColor: '#CFA935',
                                  borderRadius: '8px'
                                }}
                              />
                            );
                          }
                        }}>
                        {/* Location Details Section */}
                        <Box p={2} mb={2} bgcolor="#1E2130" borderRadius="4px">
                          <Typography variant="subtitle2" color="#CFA935" mb={1}>
                            Location Details
                          </Typography>
                          {/* Display the location image in larger size */}
                          <Box mb={2} display="flex" justifyContent="center">
                            <img
                              src={getSelectedLocationImage()}
                              alt={selectedRevenue?.name}
                              style={{
                                width: '100%',
                                height: '120px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginBottom: '8px'
                              }}
                            />
                          </Box>
                          <Typography variant="body2" color="white">
                            <strong>City:</strong> {selectedRevenue.name}
                          </Typography>
                          <Typography variant="body2" color="white">
                            <strong>State:</strong> {selectedRevenue.state}
                          </Typography>
                          <Typography variant="body2" color="white">
                            <strong>Country:</strong> {selectedRevenue.country}
                          </Typography>
                        </Box>

                        {/* News Section */}
                        {/* <Typography variant="subtitle2" color="#CFA935" px={2} mb={1}>
                          Related News
                        </Typography>
                        {newsData?.data?.results?.map((newsItem, index) => (
                          <NewsSection key={index} newsItem={newsItem} />
                        ))} */}
                      </Scrollbar>
                    )}
                  </Box>
                  <Box p={2} mb={2} bgcolor="#1E2130" borderRadius="4px">
                    <Typography variant="subtitle2" color="#CFA935" mb={1}>
                      Customer Details
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Customer Name:</strong> {selectedRevenue.customer_name}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Brand:</strong> {selectedRevenue.brand}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Type:</strong> {selectedRevenue.customer_type}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Industry:</strong> {selectedRevenue.industry}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Account Status:</strong> {selectedRevenue.account_status}
                    </Typography>
                  </Box>
                  <Box p={2} mb={2} bgcolor="#1E2130" borderRadius="4px">
                    <Typography variant="subtitle2" color="#CFA935" mb={1}>
                      Sales Information
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Sales Rep:</strong> {selectedRevenue.assigned_sales_rep}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Territory:</strong> {selectedRevenue.rep_territory}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Stage:</strong> {selectedRevenue.opportunity_stage}
                    </Typography>
                    <Typography variant="body2" color="white">
                      <strong>Last Engaged:</strong> {selectedRevenue.last_engaged_date}
                    </Typography>
                    {selectedRevenue.is_priority_for_ceo && (
                      <Typography variant="body2" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                        CEO Priority Account
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          )}
        </>
      )}
    </Dialog>
  );
};

export default ChartView;
