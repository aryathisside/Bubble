// import { Box } from '@mui/material';
// import BubbleCanvas from './BubbleCanvas';
// import useDataStore from '../../store/useDataStore';
// import Logo from '../../assets/images/logo_black.png';
// import './style.css';

// const BubblePlot = ({ webviewLoading }) => {
//   const isLoading = useDataStore((state) => state.loading);

//   return (
//     <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       {isLoading ||
//         (webviewLoading && (
//           <Box>
//             <img className="scale-up-center" src={Logo} alt="AI + Bubble" width={200} />
//           </Box>
//         ))}
//       {!isLoading && !webviewLoading && <BubbleCanvas />}
//     </Box>
//   );
// };

// export default BubblePlot;

// import { Box, Typography } from '@mui/material';
// import BubbleCanvas from './BubbleCanvas';
// import useDataStore from '../../store/useDataStore';
// import Logo from '../../assets/images/logo_black.png';
// import { useState, useEffect } from 'react';
// import './style.css';

// const BubblePlot = ({ webviewLoading }) => {
//   const revenueData = useDataStore((state) => state.revenueData);
//   const isLoading = useDataStore((state) => state.loading);
//   const filter = useDataStore((state) => state.filter);
//   const [filteredRevenue, setFilteredRevenue] = useState([]);

//   useEffect(() => {
//     let filtered = [...revenueData];

//     // Apply location filters
//     if (filter.location.country) {
//       filtered = filtered.filter(item => item.country === filter.location.country);
//     }

//     if (filter.location.state) {
//       filtered = filtered.filter(item => item.state === filter.location.state);
//     }

//     if (filter.location.city) {
//       filtered = filtered.filter(item => item.name === filter.location.city);
//     }

//     setFilteredRevenue(filtered);
//   }, [revenueData, filter]);

//   return (
//     <Box sx={{
//       flexGrow: 1,
//       width: '100%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: { xs: '28px', sm: '0px' }
//     }}>
//       {(isLoading || webviewLoading) && (
//         <Box>
//           <img className="scale-up-center" src={Logo} alt="Revenue Visualization" width={200} />
//         </Box>
//       )}
//       {!isLoading && !webviewLoading && filteredRevenue.length > 0 && (
//         <BubbleCanvas stocksData={filteredRevenue} />
//       )}
//       {!isLoading && !webviewLoading && filteredRevenue.length === 0 && revenueData.length > 0 && (
//         <Typography variant="h6" color="white">
//           No revenue data found for the selected filters
//         </Typography>
//       )}
//       {!isLoading && !webviewLoading && revenueData.length === 0 && (
//         <Typography variant="h6" color="white">
//           Revenue data is not available
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default BubblePlot;

import { Box, Typography } from '@mui/material';
import BubbleCanvas from './BubbleCanvas';
import useDataStore from '../../store/useDataStore';
import Logo from '../../assets/images/logo.png';
import { useEffect } from 'react';
import './style.css';

const BubblePlot = ({ webviewLoading }) => {
  const revenueData = useDataStore((state) => state.revenueData);
  const isLoading = useDataStore((state) => state.loading);
  const filter = useDataStore((state) => state.filter);
  const fetchRevenueData = useDataStore((state) => state.fetchRevenueData);

  // Ensure data is loaded when component mounts
  useEffect(() => {
    if (revenueData.length === 0 && !isLoading) {
      fetchRevenueData();
    }
  }, [revenueData.length, isLoading, fetchRevenueData]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        marginBottom: { xs: '28px', sm: '0px' }
      }}>
      {(isLoading || webviewLoading) && (
        <Box>
          <img className="scale-up-center" src={Logo} alt="Revenue Visualization" width={200} />
        </Box>
      )}

      {!isLoading && !webviewLoading && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}>
          <BubbleCanvas />
        </Box>
      )}

      {!isLoading && !webviewLoading && revenueData.length === 0 && (
        <Typography variant="h6" color="white">
          Revenue data is not available. Please check your connection.
        </Typography>
      )}
    </Box>
  );
};

export default BubblePlot;
