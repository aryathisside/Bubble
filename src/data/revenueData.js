export const generateRevenueData = () => {
    const locations = {
        countries: ['USA', 'Canada', 'UK', 'Germany', 'Australia', 'Japan', 'India', 'Brazil'],
        states: {
            'Canada': ['Ontario', 'Quebec'],
            'UK': ['England', 'Scotland'],
            'Germany': ['Bavaria', 'Berlin'],
            'Australia': ['New South Wales'],
            'Japan': ['Tokyo', 'Osaka'],
            'India': ['Maharashtra', 'Delhi'],
        },
        cities: {
            'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'Mississauga', 'London'],
            'England': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'],
            'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau', 'Sherbrooke'],
            'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee', 'Inverness'],
            'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Parramatta', 'Coffs Harbour'],
            'Tokyo': ['Shinjuku', 'Shibuya', 'Minato', 'Taito', 'Setagaya'],
            'Osaka': ['Osaka City', 'Sakai', 'Hirakata', 'Toyonaka', 'Takatsuki'],
            'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
            'Delhi': ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh'],

        }
    };

    const timeFrames = ['hour', 'day', 'week', 'month', 'year'];
    const metrics = ['revenue', 'profit', 'growth'];

    let revenueData = [];
    let id = 1;

    locations.countries.forEach(country => {
        const states = locations.states[country] || [];

        states.forEach(state => {
            const cities = locations.cities[state] || [];

            cities.forEach(city => {
                // Create an entry for this location
                const baseRevenue = Math.random() * 1000000 + 100000;
                const baseProfit = baseRevenue * (Math.random() * 0.3 + 0.1);

                const entry = {
                    id: id.toString(),
                    name: city,
                    state,
                    country,
                    rank: id,
                    image: `https://via.placeholder.com/150/4B0082/FFFFFF?text=${city.substring(0, 1)}`,
                    performance: {
                        hour: (Math.random() * 20 - 10).toFixed(2),
                        day: (Math.random() * 20 - 10).toFixed(2),
                        week: (Math.random() * 30 - 10).toFixed(2),
                        month: (Math.random() * 40 - 15).toFixed(2),
                        year: (Math.random() * 80 - 20).toFixed(2)
                    },
                    metrics: {
                        revenue: {
                            hour: baseRevenue * 0.01,
                            day: baseRevenue * 0.1,
                            week: baseRevenue * 0.5,
                            month: baseRevenue,
                            year: baseRevenue * 12
                        },
                        profit: {
                            hour: baseProfit * 0.01,
                            day: baseProfit * 0.1,
                            week: baseProfit * 0.5,
                            month: baseProfit,
                            year: baseProfit * 12
                        },
                        growth: {
                            hour: (Math.random() * 10 - 2).toFixed(2),
                            day: (Math.random() * 15 - 3).toFixed(2),
                            week: (Math.random() * 20 - 5).toFixed(2),
                            month: (Math.random() * 30 - 10).toFixed(2),
                            year: (Math.random() * 50 - 15).toFixed(2)
                        }
                    },
                    volume: baseRevenue * 0.8, // For compatibility with existing code
                    price: baseProfit, // For compatibility with existing code
                    marketcap: baseRevenue * 10 // For compatibility with existing code
                };

                revenueData.push(entry);
                id++;
            });
        });
    });

    return revenueData;
};

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
        filteredData = filteredData.filter(item => item.city === city);
    }

    return filteredData;
};

export const getAvailableFilters = (data) => {
    const countries = [...new Set(data.map(item => item.country))];
    const states = [...new Set(data.map(item => item.state))];
    const cities = [...new Set(data.map(item => item.name))];

    return { countries, states, cities };
};