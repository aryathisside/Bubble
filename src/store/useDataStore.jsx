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


import { create } from 'zustand';
import { generateRevenueData } from '../data/revenueData';

const useDataStore = create((set) => ({
  // Keep your existing state
  currencies: [],
  selectedCurrency: null,
  setCurrencies: (currencies) => set({ currencies }),
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
  loading: true,
  setLoading: (value) => set({ loading: value }),
  
  // Add new revenue-related state
  revenueData: [],
  selectedRevenue: null,
  
  // Update filter to include location and metric information
  filter: { 
    type: 'all',
    id: null,
    location: {
      country: null,
      state: null,
      city: null
    },
    timeFrame: 'month',
    metricType: 'revenue'
  },
  
  // Keep existing filter update function
  updateFilter: (filter) => set({ filter }),
  
  // Add new filter functions
  setLocationFilter: (locationFilter) => set(state => ({
    filter: {
      ...state.filter,
      location: {
        ...state.filter.location,
        ...locationFilter
      }
    }
  })),
  setTimeFrame: (timeFrame) => set(state => ({
    filter: {
      ...state.filter,
      timeFrame
    }
  })),
  setMetricType: (metricType) => set(state => ({
    filter: {
      ...state.filter,
      metricType
    }
  })),
  
  // Add revenue data functions
  setRevenueData: (revenueData) => set({ revenueData }),
  setSelectedRevenue: (selectedRevenue) => set({ selectedRevenue }),
  fetchRevenueData: async () => {
    set({ loading: true });
    try {
      const data = generateRevenueData();
      set({ revenueData: data, loading: false });
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      set({ loading: false });
    }
  },
  
  // Mobile state (already exists in your current code)
  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));

export default useDataStore;