// src/data/locationImages.js

import { getFlagImage } from '../utils/flagUtils';

// Updated country flags with local images
export const countryFlags = {
    'France': '/src/flags/fr.png',
    'Mexico': '/src/flags/mx.png',
    'South Korea': '/src/flags/kr.png',
    'Italy': '/src/flags/it.png',
    'South Africa': '/src/flags/za.png',
    'Sweden': '/src/flags/se.png',
    'Argentina': '/src/flags/ar.png',
    'UAE': '/src/flags/ae.png'
};

// Create a simple colored placeholder with the location name
const createPlaceholderImage = (name) => {
    // Extract the first letter of each word for the placeholder
    const initials = name
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);

    // Create a hash code from the name for consistent colors
    const hashCode = name.split('').reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0);
    }, 0);

    // Generate HSL color with good contrast for text
    const hue = Math.abs(hashCode % 360);
    const saturation = 60 + Math.abs((hashCode >> 8) % 30);
    const lightness = 40 + Math.abs((hashCode >> 16) % 20);

    // Create inline SVG data URL
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="hsl(${hue}, ${saturation}%, ${lightness}%)"/><text x="150" y="100" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
};

// Define state and city attractions using local placeholders
export const stateAttractions = {};
export const cityAttractions = {};

// List of locations from your error log
const locations = [
    // France
    'Paris', 'Boulogne-Billancourt', 'Versailles', 'Nice', 'Marseille', 'Cannes', 'Bordeaux', 'Limoges', 'Pau',
    // Mexico & others
    'Guadalajara', 'Zapopan', 'Tlaquepaque', 'Monterrey', 'San Nicolás', 'Guadalupe', 'Mexico City',
    // South Korea
    'Gangnam', 'Jongno', 'Mapo', 'Haeundae', 'Seomyeon', 'Gwangalli', 'Songdo', 'Bupyeong', 'Namdong',
    // Italy
    'Milan', 'Bergamo', 'Brescia', 'Rome', 'Latina', 'Viterbo', 'Palermo', 'Catania', 'Messina',
    // South Africa
    'Johannesburg', 'Pretoria', 'Soweto', 'Cape Town', 'Stellenbosch', 'George', 'Durban', 'Pietermaritzburg', 'Richards Bay',
    // Sweden
    'Stockholm', 'Solna', 'Sundbyberg', 'Gothenburg', 'Borås', 'Trollhättan', 'Malmö', 'Lund', 'Helsingborg',
    // Argentina
    'Buenos Aires City', 'La Plata', 'Mar del Plata', 'Córdoba City', 'Villa María', 'Río Cuarto', 'Rosario', 'Santa Fe City', 'Rafaela',
    // UAE
    'Dubai', 'Deira', 'Bur Dubai', 'Jumeirah', 'Abu Dhabi City', 'Al Ain', 'Madinat Zayed', 'Sharjah City', 'Khor Fakkan', 'Kalba'
];

// States list
const states = [
    'Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Nouvelle-Aquitaine',
    'Jalisco', 'Nuevo León', 'Mexico City',
    'Seoul', 'Busan', 'Incheon',
    'Lombardy', 'Lazio', 'Sicily',
    'Gauteng', 'Western Cape', 'KwaZulu-Natal',
    'Stockholm County', 'Västra Götaland', 'Skåne',
    'Buenos Aires', 'Córdoba', 'Santa Fe',
    'Dubai', 'Abu Dhabi', 'Sharjah'
];

// Generate placeholder images for all locations
locations.forEach(city => {
    cityAttractions[city] = createPlaceholderImage(city);
});

states.forEach(state => {
    stateAttractions[state] = createPlaceholderImage(state);
});

// Default image as flag emoji (using inline SVG which is more reliable)
export const defaultLocationImage = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="40" viewBox="0 0 60 40"><rect width="60" height="40" fill="%23f0f0f0"/><rect x="10" y="8" width="4" height="24" fill="%23555"/><rect x="14" y="8" width="20" height="16" fill="%23fff" stroke="%23555" stroke-width="1"/></svg>`;

// Updated getLocationImage function
export function getLocationImage(location) {
    if (!location) return defaultLocationImage;

    try {
        // Check if it's a city
        if (location.name && cityAttractions[location.name]) {
            return cityAttractions[location.name];
        }

        // Check if it's a state
        if (location.state && stateAttractions[location.state]) {
            return stateAttractions[location.state];
        }

        // Check if it's a country
        if (location.country && countryFlags[location.country]) {
            return countryFlags[location.country];
        }

        // If we have a name but no match, create a placeholder
        if (location.name) {
            return createPlaceholderImage(location.name);
        }

        // Last resort fallback
        return defaultLocationImage;
    } catch (error) {
        console.warn("Error in getLocationImage:", error);
        return defaultLocationImage;
    }
}