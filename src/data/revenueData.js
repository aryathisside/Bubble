import { getLocationImage } from './locationImages';

// Add the missing createMetricsObject function
export const createMetricsObject = (baseRevenue, baseProfit) => {
    // Calculate growth rates - random values with some consistency
    const yearGrowth = (Math.random() * 30) - 10; // -10% to +20% annual growth
    const monthGrowth = yearGrowth / 12 + (Math.random() * 6) - 3; // Monthly growth with some variability
    const weekGrowth = monthGrowth / 4 + (Math.random() * 3) - 1.5; // Weekly growth with some variability
    const dayGrowth = weekGrowth / 7 + (Math.random() * 2) - 1; // Daily growth with some variability
    const hourGrowth = dayGrowth / 24 + (Math.random() * 1) - 0.5; // Hourly growth with some variability

    // Create revenue values for different time periods
    // Start with annual revenue and work down, adding some randomness
    const yearRevenue = baseRevenue * 12;
    const monthRevenue = baseRevenue;
    const weekRevenue = monthRevenue / 4 * (1 + (Math.random() * 0.2) - 0.1);
    const dayRevenue = weekRevenue / 7 * (1 + (Math.random() * 0.2) - 0.1);
    const hourRevenue = dayRevenue / 24 * (1 + (Math.random() * 0.2) - 0.1);

    // Create profit values for different time periods
    const yearProfit = baseProfit * 12;
    const monthProfit = baseProfit;
    const weekProfit = monthProfit / 4 * (1 + (Math.random() * 0.2) - 0.1);
    const dayProfit = weekProfit / 7 * (1 + (Math.random() * 0.2) - 0.1);
    const hourProfit = dayProfit / 24 * (1 + (Math.random() * 0.2) - 0.1);

    return {
        revenue: {
            hour: parseFloat(hourRevenue.toFixed(2)),
            day: parseFloat(dayRevenue.toFixed(2)),
            week: parseFloat(weekRevenue.toFixed(2)),
            month: parseFloat(monthRevenue.toFixed(2)),
            year: parseFloat(yearRevenue.toFixed(2))
        },
        profit: {
            hour: parseFloat(hourProfit.toFixed(2)),
            day: parseFloat(dayProfit.toFixed(2)),
            week: parseFloat(weekProfit.toFixed(2)),
            month: parseFloat(monthProfit.toFixed(2)),
            year: parseFloat(yearProfit.toFixed(2))
        },
        growth: {
            hour: parseFloat(hourGrowth.toFixed(2)),
            day: parseFloat(dayGrowth.toFixed(2)),
            week: parseFloat(weekGrowth.toFixed(2)),
            month: parseFloat(monthGrowth.toFixed(2)),
            year: parseFloat(yearGrowth.toFixed(2))
        }
    };
};

// Add the missing createPerformanceObject function
export const createPerformanceObject = (growthObj) => {
    return {
        hour: growthObj.hour,
        day: growthObj.day,
        week: growthObj.week,
        month: growthObj.month,
        year: growthObj.year
    };
};

// export const generateRevenueData = () => {
//     // Updated location structure for India to avoid confusion with Delhi


//     const locations = {
//         countries: ['USA', 'Canada', 'UK', 'Germany', 'Australia', 'Japan', 'India', 'Brazil'],
//         states: {
//             'USA': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
//             'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Nova Scotia'],
//             'UK': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
//             'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'Hesse', 'Saxony'],
//             'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
//             'Japan': ['Tokyo Prefecture', 'Osaka Prefecture', 'Hokkaido', 'Kyoto Prefecture', 'Okinawa'],
//             'India': ['Maharashtra', 'Delhi NCR', 'Tamil Nadu', 'Karnataka', 'Gujarat'], // Changed from 'Delhi' to 'Delhi NCR'
//             'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Amazonas']
//         },
//         cities: {
//             // USA
//             'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento'],
//             'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse', 'Albany'], // Changed 'New York' to 'New York City'
//             'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio', 'Fort Worth'],

//             // Canada
//             'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'Mississauga', 'London'],
//             'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke'],

//             // UK
//             'England': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
//             'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],

//             // Germany
//             'Bavaria': ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Würzburg'],

//             // Australia
//             'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Parramatta', 'Coffs Harbour'],

//             // Japan
//             'Tokyo Prefecture': ['Shinjuku', 'Shibuya', 'Minato', 'Taito', 'Setagaya'],

//             // India 
//             'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
//             'Delhi NCR': ['New Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'], // Changed 'Delhi' city to 'New Delhi'
//             'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],

//             // Brazil
//             'São Paulo': ['São Paulo City', 'Campinas', 'Guarulhos', 'Santo André', 'Osasco']
//         }
//     };

//     const industries = ['Healthcare', 'Finance', 'Technology', 'Education', 'Manufacturing', 'Retail'];
//     const customerTypes = ['Corporate', 'Government', 'Non-Profit', 'Academic'];
//     const brands = ['NetCom Learning', 'AI CERT'];
//     const accountStatuses = ['Active', 'Inactive', 'Prospect', 'Churned', 'On Hold'];
//     const salesReps = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'David Lee', 'Lisa Chen'];
//     const territories = ['East Coast', 'West Coast', 'Midwest', 'South', 'International'];
//     const opportunityStages = ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
//     const regionTags = ['East Coast', 'West Coast', 'EMEA', 'APAC', 'LATAM'];
//     const aiAdoptionLevels = ['None', 'Exploring', 'Scaling'];

//     const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
//     const getRandomDate = (startDays, endDays) => {
//         const today = new Date();
//         const daysAgo = Math.floor(Math.random() * (endDays - startDays) + startDays);
//         const date = new Date(today);
//         date.setDate(date.getDate() - daysAgo);
//         return date.toISOString().split('T')[0];
//     };

//     let revenueData = [];
//     let id = 1;

//     locations.countries.forEach(country => {
//         const states = locations.states[country] || [];

//         states.forEach(state => {
//             const cities = locations.cities[state] || [];

//             cities.forEach(city => {
//                 // Create location object for image lookup
//                 const locationObj = {
//                     name: city,
//                     state: state,
//                     country: country
//                 };

//                 // Get the appropriate image based on location
//                 const imageUrl = getLocationImage(locationObj);

//                 // Generate base financial values
//                 const baseRevenue = Math.random() * 1000000 + 100000;
//                 const baseProfit = baseRevenue * (Math.random() * 0.3 + 0.1);

//                 // Create metrics using our dynamic function
//                 const metricsObj = createMetricsObject(baseRevenue, baseProfit);

//                 // Create the entry with all new CRM fields
//                 const entry = {
//                     id: id.toString(),
//                     name: city,
//                     state,
//                     country,
//                     rank: id,
//                     image: imageUrl,

//                     // Add base metrics data
//                     performance: createPerformanceObject(metricsObj.growth),
//                     metrics: metricsObj,
//                     volume: metricsObj.revenue.month * 0.8,
//                     price: metricsObj.profit.month,
//                     marketcap: metricsObj.revenue.year * 0.8,

//                     // Add customer identification info
//                     customer_id: `CUST-${id}`,
//                     customer_name: `${city} Corporation`,
//                     brand: getRandomElement(brands),
//                     customer_type: getRandomElement(customerTypes),
//                     industry: getRandomElement(industries),

//                     // Add location data
//                     latitude: 40.7128 + (Math.random() - 0.5) * 10,
//                     longitude: -74.0060 + (Math.random() - 0.5) * 10,
//                     region_tag: getRandomElement(regionTags),

//                     // Add revenue & deal data
//                     annual_revenue: baseRevenue * 12,
//                     deal_size: baseRevenue * (Math.random() * 0.2 + 0.05),
//                     lifetime_value: baseRevenue * 12 * (Math.random() * 3 + 1),
//                     engagement_score: Math.floor(Math.random() * 100),

//                     // Add sales & CRM details
//                     assigned_sales_rep: getRandomElement(salesReps),
//                     account_owner_id: `REP-${Math.floor(Math.random() * 1000)}`,
//                     opportunity_stage: getRandomElement(opportunityStages),
//                     last_engaged_date: getRandomDate(0, 180),
//                     account_status: getRandomElement(accountStatuses),

//                     // Add user-role based tags
//                     is_priority_for_ceo: Math.random() > 0.8, // 20% chance of being a priority
//                     sales_director_region: getRandomElement(regionTags),
//                     rep_territory: getRandomElement(territories),

//                     // Add optional metadata
//                     ai_adoption_level: getRandomElement(aiAdoptionLevels),
//                     training_products_used: Array(Math.floor(Math.random() * 5))
//                         .fill(0)
//                         .map(() => `Product-${Math.floor(Math.random() * 20)}`),
//                     customer_logo_url: `https://logo.clearbit.com/${city.toLowerCase().replace(/\s/g, '')}.com`,
//                     notes_url: `https://crm.example.com/customers/${id}`
//                 };

//                 revenueData.push(entry);
//                 id++;
//             });
//         });
//     });

//     return revenueData;
// };

/**
 * 
 * 
 * frontend => api => (backend)  
 *                 <= json
 * 
 */

export const getFilteredRevenueData = (data, filters) => {
    const { country, state, city, timeFrame, metricType } = filters;

    let filteredData = [...data];

    if (country) {
        filteredData = filteredData.filter(item => item.country === country);
    }

    if (state) {
        filteredData = filteredData.filter(item => item.state === state);
    }

    if (city) {
        filteredData = filteredData.filter(item => item.name === city);
    }

    return filteredData;
};

export const getAvailableFilters = (data) => {
    const countries = [...new Set(data.map(item => item.country))];
    const states = [...new Set(data.map(item => item.state))];
    const cities = [...new Set(data.map(item => item.name))];

    return { countries, states, cities };
};