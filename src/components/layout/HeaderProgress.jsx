// import { LinearProgress } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';
// import Helper from '../../utils/Helper';
// import useConfigStore from '../../store/useConfigStore';
// import useDataStore from '../../store/useDataStore';

// const HeaderProgress = () => {
//   const config = useConfigStore((state) => state.configuration);
//   const colorScheme = useConfigStore((state) => state.colorScheme);
//   const currencies = useDataStore((state) => state.currencies);
//   const setCurrencies = useDataStore((state) => state.setCurrencies);
//   const setLoading = useDataStore((state) => state.setLoading);

//   const [progress, setProgress] = useState(0);
//   const startTimeRef = useRef(Date.now());
//   const requestRef = useRef();

//   const apiCall = async () => {
//     const req = await fetch(`${process.env.REACT_APP_API_URL}/api/stocks/data`); // https://bubble.appdevelop.in/api/stocks/data
//     const data = await req.json();
//     console.log(data)
//     setCurrencies(data);
//   };

//   const updateProgress = () => {
//     const elapsedTime = Date.now() - startTimeRef.current;
//     const newProgress = Math.min((elapsedTime / 60000) * 100, 100); // Calculate progress based on elapsed time

//     setProgress(newProgress);

//     if (newProgress < 100) {
//       requestRef.current = requestAnimationFrame(updateProgress);
//     } else {
//       // eslint-disable-next-line no-use-before-define
//       refetch();
//     }
//   };
//   const refetch = async () => {
//     setProgress(-10);
//     startTimeRef.current = Date.now();
//     setProgress(0);
//     requestRef.current = requestAnimationFrame(updateProgress);
//     await apiCall();
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(updateProgress);
//     const initFetch = async () => {
//       await apiCall();
//       setLoading(false);
//     };
//     setTimeout(initFetch, 1500);

//     return () => cancelAnimationFrame(requestRef.current);
//   }, []);

//   const calculateVarient = () => {
//     const weight = Helper.calculateConfigurationWeight(config, currencies);
//     if (weight === 0) return '#07d';
//     return Helper.getPrimaryColor(weight, colorScheme);
//   };
//   return (
//     <LinearProgress
//       variant="determinate"
//       value={progress}
//       sx={{
//         height: '3px',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 2,
//         backgroundColor: 'transparent',
//         '& .MuiLinearProgress-bar': {
//           backgroundColor: calculateVarient()
//         }
//       }}
//     />
//   );
// };

// export default HeaderProgress;

// import { LinearProgress } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';
// import Helper from '../../utils/Helper';
// import useConfigStore from '../../store/useConfigStore';
// import useDataStore from '../../store/useDataStore';
// import { generateRevenueData } from '../../data/revenueData'; // Import your static data generator

// const HeaderProgress = () => {
//   const config = useConfigStore((state) => state.configuration);
//   const colorScheme = useConfigStore((state) => state.colorScheme);
//   const currencies = useDataStore((state) => state.currencies);
//   const setCurrencies = useDataStore((state) => state.setCurrencies);
//   const setLoading = useDataStore((state) => state.setLoading);
//   const setRevenueData = useDataStore((state) => state.setRevenueData);

//   const [progress, setProgress] = useState(0);
//   const startTimeRef = useRef(Date.now());
//   const requestRef = useRef();

//   // Replace API call with static data
//   const loadStaticData = () => {
//     // For currencies (if you still need this data)
//     const staticCurrencyData = []; // Add your static currency data here if needed
//     setCurrencies(staticCurrencyData);

//     // For revenue data
//     const revenueData = generateRevenueData();
//     setRevenueData(revenueData);
//   };

//   const updateProgress = () => {
//     const elapsedTime = Date.now() - startTimeRef.current;
//     const newProgress = Math.min((elapsedTime / 3000) * 100, 100); // Faster progress for static data

//     setProgress(newProgress);

//     if (newProgress < 100) {
//       requestRef.current = requestAnimationFrame(updateProgress);
//     } else {
//       // eslint-disable-next-line no-use-before-define
//       refetch();
//     }
//   };

//   const refetch = async () => {
//     setProgress(-10);
//     startTimeRef.current = Date.now();
//     setProgress(0);
//     requestRef.current = requestAnimationFrame(updateProgress);
//     loadStaticData(); // Use static data instead of API call
//   };

//   useEffect(() => {
//     requestRef.current = requestAnimationFrame(updateProgress);
//     const initFetch = () => {
//       loadStaticData(); // Use static data instead of API call
//       setLoading(false);
//     };
//     setTimeout(initFetch, 1500);

//     return () => cancelAnimationFrame(requestRef.current);
//   }, []);

//   const calculateVarient = () => {
//     // If you're only using revenue data, you may need to adjust this
//     const weight = Helper.calculateConfigurationWeight(config, currencies);
//     if (weight === 0) return '#07d';
//     return Helper.getPrimaryColor(weight, colorScheme);
//   };

//   return (
//     <LinearProgress
//       variant="determinate"
//       value={progress}
//       sx={{
//         height: '3px',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 2,
//         backgroundColor: 'transparent',
//         '& .MuiLinearProgress-bar': {
//           backgroundColor: calculateVarient()
//         }
//       }}
//     />
//   );
// };

// export default HeaderProgress;

import { LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Helper from '../../utils/Helper';
import useConfigStore from '../../store/useConfigStore';
import useDataStore from '../../store/useDataStore';
// import { generateRevenueData } from '../../data/revenueData'; // Import your static data generator

const HeaderProgress = () => {
  const config = useConfigStore((state) => state.configuration);
  const colorScheme = useConfigStore((state) => state.colorScheme);
  const currencies = useDataStore((state) => state.currencies);
  const setCurrencies = useDataStore((state) => state.setCurrencies);
  const setLoading = useDataStore((state) => state.setLoading);
  const setRevenueData = useDataStore((state) => state.setRevenueData);

  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const requestRef = useRef();
  const dataTimerRef = useRef(null);

  // CHANGED: Increased refresh interval to 30 seconds
  const REFRESH_INTERVAL = 30000; // 30 seconds in milliseconds

  // Load data in the background without blocking UI
  const loadDataInBackground = async () => {
    // Show loading initially, but don't block UI
    setLoading(true);

    const staticCurrencyData = []; // Add your static currency data here if needed
    setCurrencies(staticCurrencyData);

    // For revenue data

    // const revenueData = generateRevenueData();
    // const response = await fetch(`http://localhost:3004/api/company/data`);
    const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3004';
    console.log('Using API URL:', apiUrl);

    const response = await fetch(`${apiUrl}/api/company/data`);

    const text = await response.text();
    console.log('Raw response:', text.substring(0, 100)); // Log first 100 chars of response

    // Check if it looks like HTML
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
      console.error('Received HTML instead of JSON. API endpoint may not exist or returned an error page.');
      set({ loading: false });
      return [];
    }

    const revenueData = JSON.parse(text);

    setRevenueData(revenueData);

    // Set loading to false to signal completion
    setLoading(false);
  };

  const updateProgress = () => {
    const elapsedTime = Date.now() - startTimeRef.current;
    // CHANGED: Scale progress over 30 seconds instead of 3 seconds
    const newProgress = Math.min((elapsedTime / REFRESH_INTERVAL) * 100, 100);

    setProgress(newProgress);

    if (newProgress < 100) {
      requestRef.current = requestAnimationFrame(updateProgress);
    } else {
      // CHANGED: Only refetch after 30 seconds
      refetch();
    }
  };

  const refetch = async () => {
    setProgress(0);
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(updateProgress);

    // CHANGED: Only load new data after full interval completion
    console.log('Refreshing data after 30 seconds');
    loadDataInBackground();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateProgress);

    // Initial data load
    const initFetch = () => {
      loadDataInBackground();
    };

    // Start the loading process after a short initial delay
    setTimeout(initFetch, 1500);

    // Clean up timers on unmount
    return () => {
      cancelAnimationFrame(requestRef.current);
      if (dataTimerRef.current) clearTimeout(dataTimerRef.current);
    };
  }, []);

  const calculateVarient = () => {
    // If you're only using revenue data, you may need to adjust this
    const weight = Helper.calculateConfigurationWeight(config, currencies);
    if (weight === 0) return '#07d';
    return Helper.getPrimaryColor(weight, colorScheme);
  };

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        height: '3px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: 'transparent',
        '& .MuiLinearProgress-bar': {
          backgroundColor: calculateVarient()
        }
      }}
    />
  );
};

export default HeaderProgress;
