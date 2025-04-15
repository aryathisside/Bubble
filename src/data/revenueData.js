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
//     const locations = {
//         countries: ['France', 'Mexico', 'South Korea', 'Italy', 'South Africa', 'Sweden', 'Argentina', 'UAE'],
//         states: {
//             'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine'],
//             'Mexico': ['Jalisco', 'Nuevo León', 'Mexico City'],
//             'South Korea': ['Seoul', 'Busan', 'Incheon'],
//             'Italy': ['Lombardy', 'Lazio', 'Sicily'],
//             'South Africa': ['Gauteng', 'Western Cape', 'KwaZulu-Natal'],
//             'Sweden': ['Stockholm County', 'Västra Götaland', 'Skåne'],
//             'Argentina': ['Buenos Aires', 'Córdoba', 'Santa Fe'],
//             'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah']
//         },
//         cities: {
//             'Île-de-France': ['Paris', 'Boulogne-Billancourt', 'Versailles'],
//             'Provence-Alpes-Côte d\'Azur': ['Nice', 'Marseille', 'Cannes'],
//             'Nouvelle-Aquitaine': ['Bordeaux', 'Limoges', 'Pau'],

//             'Jalisco': ['Guadalajara', 'Zapopan', 'Tlaquepaque'],
//             'Nuevo León': ['Monterrey', 'San Nicolás', 'Guadalupe'],
//             'Mexico City': ['Mexico City'],

//             'Seoul': ['Gangnam', 'Jongno', 'Mapo'],
//             'Busan': ['Haeundae', 'Seomyeon', 'Gwangalli'],
//             'Incheon': ['Songdo', 'Bupyeong', 'Namdong'],

//             'Lombardy': ['Milan', 'Bergamo', 'Brescia'],
//             'Lazio': ['Rome', 'Latina', 'Viterbo'],
//             'Sicily': ['Palermo', 'Catania', 'Messina'],

//             'Gauteng': ['Johannesburg', 'Pretoria', 'Soweto'],
//             'Western Cape': ['Cape Town', 'Stellenbosch', 'George'],
//             'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Richards Bay'],

//             'Stockholm County': ['Stockholm', 'Solna', 'Sundbyberg'],
//             'Västra Götaland': ['Gothenburg', 'Borås', 'Trollhättan'],
//             'Skåne': ['Malmö', 'Lund', 'Helsingborg'],

//             'Buenos Aires': ['Buenos Aires City', 'La Plata', 'Mar del Plata'],
//             'Córdoba': ['Córdoba City', 'Villa María', 'Río Cuarto'],
//             'Santa Fe': ['Rosario', 'Santa Fe City', 'Rafaela'],

//             'Dubai': ['Deira', 'Bur Dubai', 'Jumeirah'],
//             'Abu Dhabi': ['Abu Dhabi City', 'Al Ain', 'Madinat Zayed'],
//             'Sharjah': ['Sharjah City', 'Khor Fakkan', 'Kalba']
//         }
//     };

//     const industries = ['Energy', 'Transport', 'Finance', 'Media', 'Tourism', 'Construction'];
//     const customerTypes = ['Enterprise', 'Startup', 'Public Sector', 'Freelancer'];
//     const brands = ['DataFlow Inc.', 'NextAI', 'Quantix', 'NeoEdge'];
//     const accountStatuses = ['Engaged', 'Pending', 'Dormant', 'Churned', 'Escalated'];
//     const salesReps = ['Emma Green', 'Liam Carter', 'Noah Kim', 'Olivia Rossi', 'Lucas Müller'];
//     const territories = ['Central Europe', 'Latin America', 'Southeast Asia', 'MENA', 'Nordics'];
//     const opportunityStages = ['Initial Contact', 'In Discussion', 'Sent Proposal', 'Under Review', 'Finalized', 'Rejected'];
//     const regionTags = ['EU', 'LATAM', 'APAC', 'MEA', 'Scandinavia'];
//     const aiAdoptionLevels = ['Not Interested', 'Considering', 'Implemented'];

//     const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
//     const getRandomDate = (start, end) => {
//         const now = new Date();
//         const offset = Math.floor(Math.random() * (end - start) + start);
//         const date = new Date(now);
//         date.setDate(now.getDate() - offset);
//         return date.toISOString().split('T')[0];
//     };

//     let revenueData = [];
//     let id = 1;

//     locations.countries.forEach(country => {
//         const states = locations.states[country] || [];
//         states.forEach(state => {
//             const cities = locations.cities[state] || [];
//             cities.forEach(city => {
//                 const imageUrl = `https://source.unsplash.com/random/400x300?${city}`;
//                 const baseRevenue = Math.random() * 500000 + 50000;
//                 const baseProfit = baseRevenue * (Math.random() * 0.25 + 0.05);

//                 const metricsObj = createMetricsObject(baseRevenue, baseProfit);

//                 revenueData.push({
//                     id: id.toString(),
//                     name: city,
//                     state,
//                     country,
//                     rank: id,
//                     image: imageUrl,

//                     performance: createPerformanceObject(metricsObj.growth),
//                     metrics: metricsObj,
//                     volume: metricsObj.revenue.month * 0.75,
//                     price: metricsObj.profit.month,
//                     marketcap: metricsObj.revenue.year * 0.85,

//                     customer_id: `CUST-${id}`,
//                     customer_name: `${city} Solutions`,
//                     brand: getRandomElement(brands),
//                     customer_type: getRandomElement(customerTypes),
//                     industry: getRandomElement(industries),

//                     latitude: 48 + (Math.random() - 0.5) * 10,
//                     longitude: 2 + (Math.random() - 0.5) * 10,
//                     region_tag: getRandomElement(regionTags),

//                     annual_revenue: baseRevenue * 12,
//                     deal_size: baseRevenue * (Math.random() * 0.3 + 0.05),
//                     lifetime_value: baseRevenue * 12 * (Math.random() * 2.5 + 1),
//                     engagement_score: Math.floor(Math.random() * 100),

//                     assigned_sales_rep: getRandomElement(salesReps),
//                     account_owner_id: `REP-${Math.floor(Math.random() * 1000)}`,
//                     opportunity_stage: getRandomElement(opportunityStages),
//                     last_engaged_date: getRandomDate(0, 180),
//                     account_status: getRandomElement(accountStatuses),

//                     is_priority_for_ceo: Math.random() > 0.85,
//                     sales_director_region: getRandomElement(regionTags),
//                     rep_territory: getRandomElement(territories),

//                     ai_adoption_level: getRandomElement(aiAdoptionLevels),
//                     training_products_used: Array(Math.floor(Math.random() * 5))
//                         .fill(0)
//                         .map(() => `Product-${Math.floor(Math.random() * 25)}`),
//                     customer_logo_url: `https://logo.clearbit.com/${city.toLowerCase().replace(/\s/g, '')}.com`,
//                     notes_url: `https://crm.example.com/customers/${id}`
//                 });

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