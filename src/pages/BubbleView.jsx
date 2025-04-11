// import { Stack } from '@mui/material';
// import { useEffect, useState } from 'react';
// import HeaderTabs from '../components/layout/HeaderTabs';
// import BubblePlot from '../components/bubble-layout/BubblePlot';
// import FooterTabs from '../components/layout/FooterTabs';
// import ChartView from '../components/symbol-detail/ChartView';
// import useConfigStore from '../store/useConfigStore';
// import ListView from '../components/list-layout/ListView';
// import Header from '../components/layout/Header';
// import SettingsView from '../components/settings/SettingsView';

// const BubbleView = () => {
//   const isWebView = window.isEmbbed || false;
//   const [webviewLoading, isWebviewLoading] = useState(isWebView);
//   const layout = useConfigStore((state) => state.layout);
//   const config = useConfigStore((state) => state);
//   const setInitConfig = useConfigStore((state) => state.setInitConfig);
//   useEffect(() => {
//     if (isWebView) {
//       window.fromFlutter = (c) => {
//         const parsed = JSON.parse(c);
//         if (parsed) {
//           setInitConfig(parsed);
//           isWebviewLoading(false);
//         }
//       };
//     }
//   }, []);
//   useEffect(() => {
//     if (window.getConfig && isWebView) {
//       window.getConfig.postMessage(JSON.stringify(config));
//     }
//   }, [config]);
//   return (
//     <Stack sx={{ p: 0, bgcolor: '#222222', height: '100vh' }}>
//       {/* <Header /> */}
//       <HeaderTabs />
//       {layout === 'bubble' && <BubblePlot webviewLoading={webviewLoading} />}
//       {layout === 'list' && <ListView />}
//       {layout === 'settings' && <SettingsView />}
//       <ChartView />
//       <FooterTabs />
//     </Stack>
//   );
// };

// export default BubbleView;

// import { Box, Stack } from '@mui/material';
// import { useEffect, useState } from 'react';
// import HeaderTabs from '../components/layout/HeaderTabs';
// import BubblePlot from '../components/bubble-layout/BubblePlot';
// import ChartView from '../components/symbol-detail/ChartView';
// import useConfigStore from '../store/useConfigStore';
// import useDataStore from '../store/useDataStore';
// import LocationFilters from '../components/filters/LocationFilters';
// import TimeAndMetricFilters from '../components/filters/TimeAndMetricFilters';
// import FooterTabs from '../components/layout/FooterTabs';

// const BubbleView = () => {
//   const isWebView = window.isEmbbed || false;
//   const [webviewLoading, isWebviewLoading] = useState(isWebView);
//   const layout = useConfigStore((state) => state.layout);
//   const config = useConfigStore((state) => state);
//   const setInitConfig = useConfigStore((state) => state.setInitConfig);
//   const isMobile = useDataStore((state) => state.isMobile);
//   const fetchRevenueData = useDataStore((state) => state.fetchRevenueData);

//   useEffect(() => {
//     // Fetch revenue data when component mounts
//     fetchRevenueData();
//   }, [fetchRevenueData]);

//   useEffect(() => {
//     if (isWebView) {
//       window.fromFlutter = (c) => {
//         const parsed = JSON.parse(c);
//         if (parsed) {
//           setInitConfig(parsed);
//           isWebviewLoading(false);
//         }
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (window.getConfig && isWebView) {
//       window.getConfig.postMessage(JSON.stringify(config));
//     }
//   }, [config]);

//   return (
//     <Stack sx={{ p: 0, bgcolor: '#222222', height: '100vh' }}>
//       <HeaderTabs />
//       {layout === 'bubble' && (
//         <Box display="flex" flexDirection={isMobile ? 'column' : 'row'}>
//           <Box width={isMobile ? '100%' : '300px'} bgcolor="#171A24" p={2} m={2} borderRadius="10px">
//             <LocationFilters />
//             <TimeAndMetricFilters />
//           </Box>
//           <Box flexGrow={1}>
//             <BubblePlot webviewLoading={webviewLoading} />
//           </Box>
//         </Box>
//       )}
//       {/* {layout === 'list' && <ListView />} */}
//       {/* {layout === 'settings' && <SettingsView />} */}
//       <ChartView />
//       {isMobile ? <MobileFooter /> : <FooterTabs />}
//     </Stack>
//   );
// };

// export default BubbleView;
// import { Box, Stack } from '@mui/material';
// import { useEffect, useState } from 'react';
// import HeaderTabs from '../components/layout/HeaderTabs';
// import BubblePlot from '../components/bubble-layout/BubblePlot';
// import ChartView from '../components/symbol-detail/ChartView';
// import useConfigStore from '../store/useConfigStore';
// import useDataStore from '../store/useDataStore';
// import FooterTabs from '../components/layout/FooterTabs';
// // import MobileFooter from '../components/mobile/MobileFooter';

// const BubbleView = () => {
//   const isWebView = window.isEmbbed || false;
//   const [webviewLoading, isWebviewLoading] = useState(isWebView);
//   const layout = useConfigStore((state) => state.layout);
//   const config = useConfigStore((state) => state);
//   const setInitConfig = useConfigStore((state) => state.setInitConfig);
//   const isMobile = useDataStore((state) => state.isMobile);
//   const fetchRevenueData = useDataStore((state) => state.fetchRevenueData);

//   useEffect(() => {
//     // Fetch revenue data when component mounts
//     fetchRevenueData();
//   }, [fetchRevenueData]);

//   useEffect(() => {
//     if (isWebView) {
//       window.fromFlutter = (c) => {
//         const parsed = JSON.parse(c);
//         if (parsed) {
//           setInitConfig(parsed);
//           isWebviewLoading(false);
//         }
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (window.getConfig && isWebView) {
//       window.getConfig.postMessage(JSON.stringify(config));
//     }
//   }, [config]);

//   return (
//     <Stack sx={{ p: 0, bgcolor: '#222222', height: '100vh' }}>
//       <HeaderTabs />
//       {layout === 'bubble' && (
//         <Box flexGrow={1}>
//           <BubblePlot webviewLoading={webviewLoading} />
//         </Box>
//       )}
//       {/* {layout === 'list' && <ListView />} */}
//       {/* {layout === 'settings' && <SettingsView />} */}
//       <ChartView />
//       {/* {isMobile ? <MobileFooter /> : <FooterTabs />} */}
//     </Stack>
//   );
// };

// export default BubbleView;

// src/pages/BubbleView.jsx (modified)
import { Box, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import HeaderTabs from '../components/layout/HeaderTabs';
import BubblePlot from '../components/bubble-layout/BubblePlot';
import ChartView from '../components/symbol-detail/ChartView';
import useConfigStore from '../store/useConfigStore';
import useDataStore from '../store/useDataStore';
import FilterPanel from '../components/filters/FilterPanel';
import AppliedFilters from '../components/filters/AppliedFilters';

const BubbleView = () => {
  const isWebView = window.isEmbbed || false;
  const [webviewLoading, isWebviewLoading] = useState(isWebView);
  const layout = useConfigStore((state) => state.layout);
  const config = useConfigStore((state) => state);
  const setInitConfig = useConfigStore((state) => state.setInitConfig);
  const isMobile = useDataStore((state) => state.isMobile);
  const fetchRevenueData = useDataStore((state) => state.fetchRevenueData);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Fetch revenue data when component mounts
    fetchRevenueData();
  }, [fetchRevenueData]);

  useEffect(() => {
    if (isWebView) {
      window.fromFlutter = (c) => {
        const parsed = JSON.parse(c);
        if (parsed) {
          setInitConfig(parsed);
          isWebviewLoading(false);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (window.getConfig && isWebView) {
      window.getConfig.postMessage(JSON.stringify(config));
    }
  }, [config]);

  return (
    <Stack sx={{ p: 0, bgcolor: '#222222', height: '100vh' }}>
      <HeaderTabs onFilterToggle={() => setShowFilters(!showFilters)} />

      {showFilters && (
        <Box
          sx={{
            px: 2,
            pt: 1,
            pb: 2,
            maxHeight: isMobile ? '70vh' : '50vh',
            overflowY: 'auto'
          }}>
          <FilterPanel />
        </Box>
      )}

      <AppliedFilters />

      {layout === 'bubble' && (
        <Box flexGrow={1}>
          <BubblePlot webviewLoading={webviewLoading} />
        </Box>
      )}

      <ChartView />
    </Stack>
  );
};

export default BubbleView;
