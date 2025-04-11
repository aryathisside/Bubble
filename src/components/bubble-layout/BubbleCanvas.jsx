// import { useEffect, useRef, useState } from 'react';
// import { Stack, Typography } from '@mui/material';
// import { Block, RemoveRedEye, Star } from '@mui/icons-material';
// import BubbleManager from '../../utils/BubbleManager';
// import useDataStore from '../../store/useDataStore';
// import useConfigStore from '../../store/useConfigStore';

// const BubbleCanvas = () => {
//   const [canvasManager, setCanvasManager] = useState();
//   const currencies = useDataStore((state) => state.currencies);
//   const [filteredCurrencies, setFilteredCurrencies] = useState([]);
//   const filter = useDataStore((state) => state.filter);

//   const favorites = useConfigStore((state) => state.favorites);
//   const blocklist = useConfigStore((state) => state.blocklist);
//   const watchlists = useConfigStore((state) => state.watchlists);
//   const config = useConfigStore((state) => state.configuration);
//   const colorScheme = useConfigStore((state) => state.colorScheme);

//   const baseCurrency = useConfigStore((state) => state.currency);
//   const selectedCurrency = useDataStore((state) => state.selectedCurrency);
//   const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
//   const canvasContainerRef = useRef();
//   useEffect(() => {
//     if (canvasContainerRef.current) {
//       const cM = new BubbleManager(canvasContainerRef.current);
//       setCanvasManager(cM);

//       cM.setProperties({ ...config, colors: colorScheme, baseCurrency });

//       cM.eventSelect.register((currency) => setSelectedCurrency(currency));
//       cM.wakeUp();
//       cM.start();
//     }
//   }, [canvasContainerRef]);
//   useEffect(() => {
//     if (canvasManager) {
//       canvasManager.setProperties({ ...config, colors: colorScheme, baseCurrency });
//     }
//   }, [config, colorScheme]);

//   useEffect(() => {
//     if (canvasManager) {
//       canvasManager.selectedCurrencyId = selectedCurrency?.id;
//     }
//   }, [selectedCurrency]);

//   useEffect(() => {
//     let filtered = [];
//     if (filter.type === 'all') {
//       filtered = currencies.filter((item) => !blocklist.includes(item.id));
//     } else if (filter.type === 'favorite') {
//       filtered = currencies.filter((item) => favorites.includes(item.id));
//     } else if (filter.type === 'blocklist') {
//       filtered = currencies.filter((item) => blocklist.includes(item.id));
//     } else if (filter.type === 'watchlist' && filter.id) {
//       const wt = watchlists.find((item) => item.id === filter.id);
//       filtered = currencies.filter((item) => wt.symbols.includes(item.id));
//     }
//     setFilteredCurrencies(filtered);
//   }, [currencies, favorites, filter, blocklist, watchlists]);

//   useEffect(() => {
//     if (canvasManager) {
//       canvasManager.pushCurrencies(filteredCurrencies);
//     }
//   }, [filteredCurrencies]);

//   const renderIcon = () => {
//     if (filter.type === 'watchlist') {
//       return <RemoveRedEye fontSize="inherit" />;
//     }
//     if (filter.type === 'blocklist') {
//       return <Block fontSize="inherit" />;
//     }
//     if (filter.type === 'favorite') {
//       return <Star fontSize="inherit" />;
//     }
//     return '';
//   };

//   const renderName = () => {
//     if (filter.type === 'watchlist') {
//       return 'Watchlist';
//     }
//     if (filter.type === 'blocklist') {
//       return 'Blocklist';
//     }
//     if (filter.type === 'favorite') {
//       return 'Favorite';
//     }
//     return '';
//   };
//   return (
//     <>
//       <canvas id="canvas" ref={canvasContainerRef} />
//       {filteredCurrencies.length === 0 && (
//         <Stack position="fixed" bgcolor="transaprent" textAlign="center">
//           <Typography typography="h3" color="#ccc" lineHeight="0">
//             {renderIcon()}
//           </Typography>
//           <Typography typography="h6" color="#ccc">
//             {renderName()}
//           </Typography>
//           <Typography typography="h6" color="white">
//             List is empty
//           </Typography>
//         </Stack>
//       )}
//     </>
//   );
// };

// export default BubbleCanvas;

// import { useEffect, useRef, useState } from 'react';
// import { Stack, Typography } from '@mui/material';
// import { LocationOn } from '@mui/icons-material';
// import BubbleManager from '../../utils/BubbleManager';
// import useDataStore from '../../store/useDataStore';
// import useConfigStore from '../../store/useConfigStore';

// const BubbleCanvas = () => {
//   const [canvasManager, setCanvasManager] = useState();
//   const revenueData = useDataStore((state) => state.revenueData);
//   const [filteredRevenueData, setFilteredRevenueData] = useState([]);
//   const filter = useDataStore((state) => state.filter);

//   const config = useConfigStore((state) => state.configuration);
//   const colorScheme = useConfigStore((state) => state.colorScheme);
//   const baseCurrency = useConfigStore((state) => state.currency) || { code: 'USD' };

//   const selectedRevenue = useDataStore((state) => state.selectedRevenue);
//   const setSelectedRevenue = useDataStore((state) => state.setSelectedRevenue);
//   const canvasContainerRef = useRef();

//   // Initialize the canvas manager
//   useEffect(() => {
//     if (canvasContainerRef.current) {
//       const cM = new BubbleManager(canvasContainerRef.current);
//       setCanvasManager(cM);

//       // Configure with timeFrame and metricType for revenue data
//       cM.setProperties({
//         ...config,
//         colors: colorScheme,
//         baseCurrency,
//         timeFrame: filter.timeFrame || 'month',
//         period: filter.timeFrame || 'month',
//         metricType: filter.metricType || 'revenue',
//         content: 'revenue'
//       });

//       // Update to use selectedRevenue for revenue data
//       cM.eventSelect.register((locationData) => setSelectedRevenue(locationData));
//       cM.wakeUp();
//       cM.start();
//     }
//   }, [canvasContainerRef]);

//   // Update manager when config changes
//   useEffect(() => {
//     if (canvasManager) {
//       canvasManager.setProperties({
//         ...config,
//         colors: colorScheme,
//         baseCurrency,
//         timeFrame: filter.timeFrame || 'month',
//         metricType: filter.metricType || 'revenue'
//       });
//     }
//   }, [config, colorScheme, filter.timeFrame, filter.metricType]);

//   // Update selected location
//   useEffect(() => {
//     if (canvasManager && selectedRevenue) {
//       canvasManager.selectedCurrencyId = selectedRevenue?.id;
//     }
//   }, [selectedRevenue]);

//   // Filter revenue data based on location filters
//   useEffect(() => {
//     let filtered = [...revenueData];

//     // Apply location filters
//     if (filter.location?.country) {
//       filtered = filtered.filter((item) => item.country === filter.location.country);
//     }

//     if (filter.location?.state) {
//       filtered = filtered.filter((item) => item.state === filter.location.state);
//     }

//     if (filter.location?.city) {
//       filtered = filtered.filter((item) => item.name === filter.location.city);
//     }

//     setFilteredRevenueData(filtered);

//     // Debug output
//     console.log('Revenue data:', revenueData.length);
//     console.log('Filtered revenue data:', filtered.length);
//   }, [revenueData, filter.location]);

//   // Push filtered data to canvas manager
//   useEffect(() => {
//     if (canvasManager && filteredRevenueData.length > 0) {
//       // Convert revenue data to format expected by BubbleManager
//       const formattedData = filteredRevenueData.map((location) => ({
//         id: location.id,
//         name: location.name,
//         state: location.state,
//         country: location.country,
//         // image: 'https://via.placeholder.com/30',
//         image:
//           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkEBDEVWe5tUAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJUlEQVRIx+3NMQEAAAjDMKYc6WhVBzxsYElTl0VFRUVFRUVF5c0D2JyjAZA/8w8AAAAASUVORK5CYII=',
//         symbol: location.name.substring(0, 2).toUpperCase(),
//         performance: {
//           hour: location.metrics.growth.hour,
//           day: location.metrics.growth.day,
//           week: location.metrics.growth.week,
//           month: location.metrics.growth.month,
//           year: location.metrics.growth.year
//         },
//         // Add other properties needed by the bubble visualization
//         volume: location.metrics.revenue.month,
//         volumeWeekly: location.metrics.revenue.week,
//         price: location.metrics.revenue.day,
//         marketcap: location.metrics.revenue.year,
//         // Add metrics property for new helper methods
//         metrics: location.metrics,
//         // Add currency code instead of object
//         currency: { code: 'USD' } // This is what's causing the error - ensure it has a code property
//       }));

//       console.log('Pushing data to canvas:', formattedData.length);
//       canvasManager.pushCurrencies(formattedData);
//     }
//   }, [filteredRevenueData, canvasManager]);

//   return (
//     <>
//       <canvas id="canvas" ref={canvasContainerRef} />
//       {filteredRevenueData.length === 0 && (
//         <Stack position="fixed" bgcolor="transparent" textAlign="center">
//           <Typography typography="h3" color="#ccc" lineHeight="0">
//             <LocationOn fontSize="inherit" />
//           </Typography>
//           <Typography typography="h6" color="#ccc">
//             Revenue Data
//           </Typography>
//           <Typography typography="h6" color="white">
//             No locations found
//           </Typography>
//         </Stack>
//       )}
//     </>
//   );
// };

// export default BubbleCanvas;

// import { useEffect, useRef, useState } from 'react';
// import { Stack, Typography } from '@mui/material';
// import { LocationOn } from '@mui/icons-material';
// import BubbleManager from '../../utils/BubbleManager';
// import useDataStore from '../../store/useDataStore';
// import useConfigStore from '../../store/useConfigStore';

// const BubbleCanvas = () => {
//   const [canvasManager, setCanvasManager] = useState();
//   const revenueData = useDataStore((state) => state.revenueData);
//   const [filteredRevenueData, setFilteredRevenueData] = useState([]);
//   const filter = useDataStore((state) => state.filter);

//   const config = useConfigStore((state) => state.configuration);
//   const colorScheme = useConfigStore((state) => state.colorScheme);
//   const baseCurrency = useConfigStore((state) => state.currency) || { code: 'USD' };

//   const selectedRevenue = useDataStore((state) => state.selectedRevenue);
//   const setSelectedRevenue = useDataStore((state) => state.setSelectedRevenue);
//   const canvasContainerRef = useRef();

//   // Initialize the canvas manager
//   useEffect(() => {
//     if (canvasContainerRef.current) {
//       const cM = new BubbleManager(canvasContainerRef.current);
//       setCanvasManager(cM);

//       // Configure with timeFrame and metricType for revenue data
//       cM.setProperties({
//         ...config,
//         colors: colorScheme,
//         baseCurrency,
//         timeFrame: filter.timeFrame || 'month',
//         period: filter.timeFrame || 'month',
//         metricType: filter.metricType || 'revenue',
//         content: 'revenue'
//       });

//       // Update to use selectedRevenue for revenue data
//       cM.eventSelect.register((locationData) => setSelectedRevenue(locationData));
//       cM.wakeUp();
//       cM.start();

//       // Clean up on unmount
//       return () => {
//         if (cM) {
//           cM.destroy();
//         }
//       };
//     }
//   }, [canvasContainerRef]);

//   // Update manager when config changes
//   useEffect(() => {
//     if (canvasManager) {
//       canvasManager.setProperties({
//         ...config,
//         colors: colorScheme,
//         baseCurrency,
//         timeFrame: filter.timeFrame || 'month',
//         metricType: filter.metricType || 'revenue'
//       });
//     }
//   }, [config, colorScheme, filter.timeFrame, filter.metricType]);

//   // Update selected location
//   useEffect(() => {
//     if (canvasManager && selectedRevenue) {
//       canvasManager.selectedCurrencyId = selectedRevenue?.id;
//     }
//   }, [selectedRevenue]);

//   // Filter revenue data based on location filters
//   useEffect(() => {
//     let filtered = [...revenueData];

//     // Apply location filters
//     if (filter.location?.country) {
//       filtered = filtered.filter((item) => item.country === filter.location.country);
//     }

//     if (filter.location?.state) {
//       filtered = filtered.filter((item) => item.state === filter.location.state);
//     }

//     if (filter.location?.city) {
//       filtered = filtered.filter((item) => item.name === filter.location.city);
//     }

//     setFilteredRevenueData(filtered);
//   }, [revenueData, filter.location]);

//   // Push filtered data to canvas manager
//   useEffect(() => {
//     if (canvasManager && filteredRevenueData.length > 0) {
//       // Convert revenue data to format expected by BubbleManager
//       const formattedData = filteredRevenueData.map((location) => ({
//         id: location.id || `loc-${location.name}-${location.state}-${location.country}`,
//         name: location.name || 'Unknown Location',
//         state: location.state,
//         country: location.country,
//         image:
//           location.image ||
//           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkEBDEVWe5tUAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJUlEQVRIx+3NMQEAAAjDMKYc6WhVBzxsYElTl0VFRUVFRUVF5c0D2JyjAZA/8w8AAAAASUVORK5CYII=',
//         symbol: location.name ? location.name.substring(0, 2).toUpperCase() : 'LO',

//         // Ensure all necessary metrics exist with fallback values
//         performance: {
//           hour: location.metrics?.growth?.hour || 0,
//           day: location.metrics?.growth?.day || 0,
//           week: location.metrics?.growth?.week || 0,
//           month: location.metrics?.growth?.month || 0,
//           year: location.metrics?.growth?.year || 0
//         },
//         volume: location.metrics?.revenue?.month || 1000,
//         volumeWeekly: location.metrics?.revenue?.week || 250,
//         price: location.metrics?.revenue?.day || 10,
//         marketcap: location.metrics?.revenue?.year || 12000,

//         // Make sure metrics object is complete
//         metrics: {
//           revenue: {
//             hour: location.metrics?.revenue?.hour || 5,
//             day: location.metrics?.revenue?.day || 120,
//             week: location.metrics?.revenue?.week || 840,
//             month: location.metrics?.revenue?.month || 3600,
//             year: location.metrics?.revenue?.year || 43800
//           },
//           growth: {
//             hour: location.metrics?.growth?.hour || 0,
//             day: location.metrics?.growth?.day || 0,
//             week: location.metrics?.growth?.week || 0,
//             month: location.metrics?.growth?.month || 0,
//             year: location.metrics?.growth?.year || 0
//           }
//         },

//         // Add currency code
//         currency: { code: 'USD' }
//       }));

//       // Push data to canvas manager
//       canvasManager.pushCurrencies(formattedData);
//     }
//   }, [filteredRevenueData, canvasManager]);

//   return (
//     <>
//       <canvas id="canvas" ref={canvasContainerRef} />
//       {filteredRevenueData.length === 0 && (
//         <Stack position="fixed" bgcolor="transparent" textAlign="center">
//           <Typography typography="h3" color="#ccc" lineHeight="0">
//             <LocationOn fontSize="inherit" />
//           </Typography>
//           <Typography typography="h6" color="#ccc">
//             Revenue Data
//           </Typography>
//           <Typography typography="h6" color="white">
//             No locations found
//           </Typography>
//         </Stack>
//       )}
//     </>
//   );
// };

// export default BubbleCanvas;
import { useEffect, useRef, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import BubbleManager from '../../utils/BubbleManager';
import useDataStore from '../../store/useDataStore';
import useConfigStore from '../../store/useConfigStore';
import { getLocationImage } from '../../data/locationImages';

const BubbleCanvas = () => {
  const [canvasManager, setCanvasManager] = useState();
  const revenueData = useDataStore((state) => state.revenueData);
  const [filteredRevenueData, setFilteredRevenueData] = useState([]);
  const filter = useDataStore((state) => state.filter);

  const config = useConfigStore((state) => state.configuration);
  const colorScheme = useConfigStore((state) => state.colorScheme);
  const baseCurrency = useConfigStore((state) => state.currency) || { code: 'USD' };

  const selectedRevenue = useDataStore((state) => state.selectedRevenue);
  const setSelectedRevenue = useDataStore((state) => state.setSelectedRevenue);
  const canvasContainerRef = useRef();

  // Initialize the canvas manager
  useEffect(() => {
    let cM = null;

    if (canvasContainerRef.current) {
      cM = new BubbleManager(canvasContainerRef.current);
      setCanvasManager(cM);

      // Configure with timeFrame and metricType for revenue data
      cM.setProperties({
        ...config,
        colors: colorScheme,
        baseCurrency,
        timeFrame: filter.timeFrame || 'month',
        period: filter.timeFrame || 'month',
        metricType: filter.metricType || 'revenue',
        // Use the metric type to determine what to show as content
        content: filter.metricType || 'revenue'
      });

      // Update to use selectedRevenue for revenue data
      cM.eventSelect.register((locationData) => setSelectedRevenue(locationData));
      cM.wakeUp();
      cM.start();
    }

    // Clean up on unmount - fixed to avoid the error
    return () => {
      try {
        if (cM && typeof cM.destroy === 'function') {
          cM.destroy();
        }
      } catch (err) {
        console.warn('Error during cleanup:', err);
      }
    };
  }, [canvasContainerRef]);

  // Update manager when config changes
  useEffect(() => {
    if (canvasManager) {
      canvasManager.setProperties({
        ...config,
        colors: colorScheme,
        baseCurrency,
        timeFrame: filter.timeFrame || 'month',
        metricType: filter.metricType || 'revenue',
        // Use the metric type to determine what to show as content
        content: filter.metricType || 'revenue'
      });
    }
  }, [config, colorScheme, filter.timeFrame, filter.metricType]);

  // Update selected location
  useEffect(() => {
    if (canvasManager && selectedRevenue) {
      canvasManager.selectedCurrencyId = selectedRevenue?.id;
    }
  }, [selectedRevenue]);

  // Filter revenue data based on location filters
  useEffect(() => {
    let filtered = [...revenueData];
    console.log('Applying filters:', filter);

    // Location Filters
    if (filter.location?.country) {
      filtered = filtered.filter((item) => item.country === filter.location.country);
    }
    if (filter.location?.state) {
      filtered = filtered.filter((item) => item.state === filter.location.state);
    }
    if (filter.location?.city) {
      filtered = filtered.filter((item) => item.name === filter.location.city);
    }
    if (filter.location?.region) {
      filtered = filtered.filter((item) => item.region_tag === filter.location.region);
    }

    // Customer Filters
    if (filter.customer?.industry) {
      filtered = filtered.filter((item) => item.industry === filter.customer.industry);
    }
    if (filter.customer?.type) {
      filtered = filtered.filter((item) => item.customer_type === filter.customer.type);
    }
    if (filter.customer?.brand) {
      filtered = filtered.filter((item) => item.brand === filter.customer.brand);
    }

    // Inside the useEffect for filtering (continued from previous code)
    if (filter.customer?.status) {
      filtered = filtered.filter((item) => item.account_status === filter.customer.status);
    }

    // Financial Filters
    if (filter.financial?.revenueRange) {
      filtered = filtered.filter((item) => {
        const revenue = item.annual_revenue || 0;
        switch (filter.financial.revenueRange) {
          case 'under100k':
            return revenue < 100000;
          case '100kTo1m':
            return revenue >= 100000 && revenue < 1000000;
          case '1mTo10m':
            return revenue >= 1000000 && revenue < 10000000;
          case 'over10m':
            return revenue >= 10000000;
          default:
            return true;
        }
      });
    }

    if (filter.financial?.dealSize) {
      filtered = filtered.filter((item) => {
        const dealSize = item.deal_size || 0;
        switch (filter.financial.dealSize) {
          case 'small':
            return dealSize < 10000;
          case 'medium':
            return dealSize >= 10000 && dealSize < 50000;
          case 'large':
            return dealSize >= 50000 && dealSize < 250000;
          case 'enterprise':
            return dealSize >= 250000;
          default:
            return true;
        }
      });
    }

    // Sales Filters
    if (filter.sales?.rep) {
      filtered = filtered.filter((item) => item.assigned_sales_rep === filter.sales.rep);
    }

    if (filter.sales?.territory) {
      filtered = filtered.filter((item) => item.rep_territory === filter.sales.territory);
    }

    if (filter.sales?.opportunityStage) {
      filtered = filtered.filter((item) => item.opportunity_stage === filter.sales.opportunityStage);
    }

    if (filter.sales?.engagementRecency) {
      filtered = filtered.filter((item) => {
        if (!item.last_engaged_date) return false;

        const engagementDate = new Date(item.last_engaged_date);
        const today = new Date();
        const daysDifference = Math.floor((today - engagementDate) / (1000 * 60 * 60 * 24));

        switch (filter.sales.engagementRecency) {
          case 'last30':
            return daysDifference <= 30;
          case '30to90':
            return daysDifference > 30 && daysDifference <= 90;
          case 'over90':
            return daysDifference > 90;
          default:
            return true;
        }
      });
    }

    // Priority Filters
    if (filter.priority?.isCeoPriority === true) {
      filtered = filtered.filter((item) => item.is_priority_for_ceo === true);
    }

    // AI Adoption Filter
    if (filter.aiAdoption) {
      filtered = filtered.filter((item) => item.ai_adoption_level === filter.aiAdoption);
    }

    console.log('Total data after all filters:', filtered.length);
    setFilteredRevenueData(filtered);
  }, [revenueData, filter]);

  // Push filtered data to canvas manager
  useEffect(() => {
    if (canvasManager && filteredRevenueData.length > 0) {
      console.log(`Pushing ${filteredRevenueData.length} items to canvas`);

      // Convert revenue data to format expected by BubbleManager
      const formattedData = filteredRevenueData.map((location) => {
        // Create a unique ID if none exists
        const id = location.id || `loc-${location.name}-${location.state}-${location.country}`;

        // Get the appropriate image URL based on the location
        const imageUrl = location.image || getLocationImage(location);

        // Get the timeframe and metric type from filters
        const timeFrame = filter.timeFrame || 'month';
        const metricType = filter.metricType || 'revenue';

        // Calculate revenue/profit/growth value for the current timeframe to use for visualization
        const metricValue = location.metrics?.[metricType]?.[timeFrame] || 0;

        // Format the display value based on metric type
        let formattedValue;
        if (metricType === 'growth') {
          formattedValue = `${parseFloat(location.metrics?.growth?.[timeFrame]).toFixed(1)}%`;
        } else if (metricType === 'revenue' || metricType === 'profit') {
          // Format as currency
          const value = location.metrics?.[metricType]?.[timeFrame] || 0;
          formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
          }).format(value);
        } else {
          formattedValue = '';
        }

        return {
          id: id,
          name: location.name || 'Unknown Location',
          state: location.state,
          country: location.country,
          image: imageUrl,

          // Don't use symbol property for text as it's redundant with the name
          symbol: '', // Leave this empty to avoid duplicate text

          // Use formattedValue as the content to display
          displayValue: formattedValue,

          // Make sure to include the metrics for proper sizing - these are crucial!
          metrics: {
            revenue: { ...location.metrics.revenue },
            profit: { ...location.metrics.profit },
            growth: { ...location.metrics.growth }
          },

          // Performance data for colors (use growth as performance)
          performance: {
            hour: parseFloat(location.metrics?.growth?.hour || 0),
            day: parseFloat(location.metrics?.growth?.day || 0),
            week: parseFloat(location.metrics?.growth?.week || 0),
            month: parseFloat(location.metrics?.growth?.month || 0),
            year: parseFloat(location.metrics?.growth?.year || 0)
          },

          // Set values needed for BubbleManager's sizing algorithms
          volume: metricType === 'revenue' ? metricValue : location.metrics?.revenue?.[timeFrame] || 0,
          volumeWeekly: location.metrics?.revenue?.week || 0,
          price: metricType === 'profit' ? metricValue : location.metrics?.profit?.[timeFrame] || 0,
          marketcap: location.metrics?.revenue?.year || 0,

          // Add currency code
          currency: { code: 'USD' }
        };
      });

      // Clear previous data and push new data
      canvasManager.bubbles = [];
      canvasManager.bubblesDict = {};
      canvasManager.pushCurrencies(formattedData);
      canvasManager.needsRecalculation = true;
      canvasManager.wakeUp();
    } else if (canvasManager && filteredRevenueData.length === 0) {
      console.log('No data to display after filtering');
      // Clear the canvas when no data is available
      canvasManager.bubbles = [];
      canvasManager.bubblesDict = {};
      canvasManager.pushCurrencies([]);
      canvasManager.needsRecalculation = true;
      canvasManager.wakeUp();
    }
  }, [filteredRevenueData, canvasManager, filter.timeFrame, filter.metricType, filter.location]);

  return (
    <>
      <canvas id="canvas" ref={canvasContainerRef} />
      {filteredRevenueData.length === 0 && (
        <Stack position="fixed" bgcolor="transparent" textAlign="center">
          <Typography typography="h3" color="#ccc" lineHeight="0">
            <LocationOn fontSize="inherit" />
          </Typography>
          <Typography typography="h6" color="#ccc">
            Revenue Data
          </Typography>
          <Typography typography="h6" color="white">
            No locations found
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default BubbleCanvas;
