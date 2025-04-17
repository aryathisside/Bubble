// import { create } from 'zustand';

// const useDataStore = create((set) => ({
//   currencies: [],
//   selectedCurrency: null,
//   setCurrencies: (currencies) => set({ currencies }),
//   setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
//   loading: true,
//   setLoading: (value) => set({ loading: value }),
//   filter: { type: 'all', id: null },
//   updateFilter: (filter) => set({ filter }),
//    // Add isMobile state
//    isMobile: false,
//    setIsMobile: (isMobile) => set({ isMobile }),
// }));

// export default useDataStore;

// import { create } from 'zustand';
// import { generateRevenueData } from '../data/revenueData';

// const useDataStore = create((set, get) => ({
//   // Keep your existing state
//   currencies: [],
//   selectedCurrency: null,
//   setCurrencies: (currencies) => set({ currencies }),
//   setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
//   loading: true,
//   setLoading: (value) => set({ loading: value }),

//   // Revenue data
//   revenueData: [],
//   selectedRevenue: null,

//   /* ------------------------------ For More Filters ------------------------------ */
//   filter: {
//     type: 'all',
//     id: null,
//     location: {
//       country: null,
//       state: null,
//       city: null,
//       region: null // For region tags like "East Coast" or "EMEA"
//     },
//     timeFrame: 'month',
//     metricType: 'revenue',
//     customer: {
//       type: null, // Corporate, Government, etc.
//       industry: null, // Healthcare, Finance, Technology, etc.
//       status: null, // Active, Inactive, Prospect, etc.
//       brand: null // NetCom Learning, AI CERT
//     },
//     financial: {
//       revenueRange: null, // Ranges like "<$100K", "$100K-$1M", etc.
//       dealSize: null // Small, Medium, Large, etc.
//     },
//     sales: {
//       rep: null, // Sales rep name/ID
//       territory: null, // Sales territory
//       opportunityStage: null, // Discovery, Proposal, etc.
//       engagementRecency: null // Last 30 days, 30-90 days, etc.
//     },
//     priority: {
//       isCeoPriority: null // true/false
//     },
//     aiAdoption: null // None, Exploring, Scaling (for AI CERT)
//   },

//   // Keep existing filter update function
//   updateFilter: (filter) => set({ filter }),

//   // Location filter function with logging
//   setLocationFilter: (locationFilter) => {
//     console.log('Setting location filter:', locationFilter);

//     // Ensure we're not losing any existing filter settings
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         location: {
//           ...state.filter.location,
//           ...locationFilter
//         }
//       }
//     }));

//     // Log the updated state after setting
//     setTimeout(() => {
//       const currentFilter = get().filter;
//       console.log('Updated filter state:', currentFilter);
//     }, 10);
//   },

//   // Time frame and metric functions
//   setTimeFrame: (timeFrame) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         timeFrame
//       }
//     })),

//   setMetricType: (metricType) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         metricType
//       }
//     })),

//   // Enhanced data fetching with logging
//   setRevenueData: (revenueData) => {
//     console.log(`Setting revenue data: ${revenueData.length} items`);
//     set({ revenueData });
//   },

//   setSelectedRevenue: (selectedRevenue) => set({ selectedRevenue }),

//   fetchRevenueData: async () => {
//     set({ loading: true });
//     try {
//       console.log('Fetching revenue data...');
//       const data = generateRevenueData();
//       console.log('this is the data', data);
//       console.log(`Fetched ${data.length} revenue data items`);
//       set({ revenueData: data, loading: false });
//       return data;
//     } catch (error) {
//       console.error('Error fetching revenue data:', error);
//       set({ loading: false });
//       return [];
//     }
//   },

//   // Add these to useDataStore.jsx
//   setCustomerFilter: (customerFilter) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         customer: {
//           ...state.filter.customer,
//           ...customerFilter
//         }
//       }
//     })),

//   setFinancialFilter: (financialFilter) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         financial: {
//           ...state.filter.financial,
//           ...financialFilter
//         }
//       }
//     })),

//   setSalesFilter: (salesFilter) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         sales: {
//           ...state.filter.sales,
//           ...salesFilter
//         }
//       }
//     })),

//   setPriorityFilter: (isPriority) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         priority: {
//           isCeoPriority: isPriority
//         }
//       }
//     })),

//   setAiAdoptionFilter: (aiAdoption) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         aiAdoption
//       }
//     })),

//   setRegionFilter: (region) =>
//     set((state) => ({
//       filter: {
//         ...state.filter,
//         location: {
//           ...state.filter.location,
//           region
//         }
//       }
//     })),

//   // Mobile state
//   isMobile: false,
//   setIsMobile: (isMobile) => set({ isMobile })
// }));

// export default useDataStore;

import { create } from 'zustand';
const useDataStore = create((set, get) => ({
  // Keep your existing state
  currencies: [],
  selectedCurrency: null,
  setCurrencies: (currencies) => set({ currencies }),
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
  loading: true,
  setLoading: (value) => set({ loading: value }),

  // Revenue data
  revenueData: [],
  selectedRevenue: null,

  /* ------------------------------ For More Filters ------------------------------ */
  filter: {
    type: 'all',
    id: null,
    location: {
      country: null,
      state: null,
      city: null,
      region: null // For region tags like "East Coast" or "EMEA"
    },
    timeFrame: 'month',
    metricType: 'revenue',
    customer: {
      type: null, // Corporate, Government, etc.
      industry: null, // Healthcare, Finance, Technology, etc.
      status: null, // Active, Inactive, Prospect, etc.
      brand: null // NetCom Learning, AI CERT
    },
    financial: {
      revenueRange: null, // Ranges like "<$100K", "$100K-$1M", etc.
      dealSize: null // Small, Medium, Large, etc.
    },
    sales: {
      rep: null, // Sales rep name/ID
      territory: null, // Sales territory
      opportunityStage: null, // Discovery, Proposal, etc.
      engagementRecency: null // Last 30 days, 30-90 days, etc.
    },
    priority: {
      isCeoPriority: null // true/false
    },
    aiAdoption: null // None, Exploring, Scaling (for AI CERT)
  },

  // Keep existing filter update function
  updateFilter: (filter) => set({ filter }),

  // Location filter function with logging
  setLocationFilter: (locationFilter) => {
    console.log('Setting location filter:', locationFilter);

    // Ensure we're not losing any existing filter settings
    set((state) => ({
      filter: {
        ...state.filter,
        location: {
          ...state.filter.location,
          ...locationFilter
        }
      }
    }));

    // Log the updated state after setting
    setTimeout(() => {
      const currentFilter = get().filter;
      console.log('Updated filter state:', currentFilter);
    }, 10);
  },

  // Time frame and metric functions
  setTimeFrame: (timeFrame) =>
    set((state) => ({
      filter: {
        ...state.filter,
        timeFrame
      }
    })),

  setMetricType: (metricType) =>
    set((state) => ({
      filter: {
        ...state.filter,
        metricType
      }
    })),

  // Enhanced data fetching with logging
  setRevenueData: (revenueData) => {
    console.log(`Setting revenue data: ${revenueData.length} items`);
    set({ revenueData });
  },

  setSelectedRevenue: (selectedRevenue) => set({ selectedRevenue }),

  // Updated to fetch from API instead of generating data locally
  fetchRevenueData: async () => {
    set({ loading: true });
    try {
      console.log('Fetching revenue data from API...');

      // Replace with your actual API endpoint
      // const response = await fetch('https://testverify.certs365.io/crypto/api/company/data');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/data`);

      // Add this to check the response content
      const text = await response.text();
      console.log('Raw response:', text.substring(0, 100)); // Log first 100 chars of response

      // Check if it looks like HTML
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        console.error('Received HTML instead of JSON. API endpoint may not exist or returned an error page.');
        set({ loading: false });
        return [];
      }

      // If we got here, try parsing it as JSON
      const data = JSON.parse(text);

      console.log('Data', data);

      console.log(`Fetched ${data.length} revenue data items from API`);
      set({ revenueData: data, loading: false });
      return data;
    } catch (error) {
      console.error('Error fetching revenue data from API:', error);
      set({ loading: false });
      return [];
    }
  },
  // Add these to useDataStore.jsx
  setCustomerFilter: (customerFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        customer: {
          ...state.filter.customer,
          ...customerFilter
        }
      }
    })),

  setFinancialFilter: (financialFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        financial: {
          ...state.filter.financial,
          ...financialFilter
        }
      }
    })),

  setSalesFilter: (salesFilter) =>
    set((state) => ({
      filter: {
        ...state.filter,
        sales: {
          ...state.filter.sales,
          ...salesFilter
        }
      }
    })),

  setPriorityFilter: (isPriority) =>
    set((state) => ({
      filter: {
        ...state.filter,
        priority: {
          isCeoPriority: isPriority
        }
      }
    })),

  setAiAdoptionFilter: (aiAdoption) =>
    set((state) => ({
      filter: {
        ...state.filter,
        aiAdoption
      }
    })),

  setRegionFilter: (region) =>
    set((state) => ({
      filter: {
        ...state.filter,
        location: {
          ...state.filter.location,
          region
        }
      }
    })),

  // Mobile state
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile })
}));

export default useDataStore;
