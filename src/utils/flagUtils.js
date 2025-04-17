// src/utils/flagUtils.js

// Import the enhanced ImageManager
import ImageManager from './ImageManager';

// Map of country names to their 2-letter codes
const countryCodeMap = {
    'france': 'fr',
    'mexico': 'mx',
    'south korea': 'kr',
    'italy': 'it',
    'south africa': 'za',
    'sweden': 'se',
    'argentina': 'ar',
    'uae': 'ae',
    'united arab emirates': 'ae',
    'united states': 'us',
    'united kingdom': 'gb',
    'spain': 'es',
    'germany': 'de',
    'japan': 'jp',
    'china': 'cn',
    'canada': 'ca',
    'australia': 'au',
    'brazil': 'br',
    'india': 'in'
};

// Function to get the 2-letter country code
const getCountryCode = (country) => {
    if (!country) return 'xx';

    // If already a 2-letter code
    if (country.length === 2) {
        return country.toLowerCase();
    }

    // Try to lookup in our map
    const normalized = country.toLowerCase().trim();
    return countryCodeMap[normalized] || normalized.substring(0, 2);
};

// Main function to get flag image path
export const getFlagImage = (countryName) => {
    if (!countryName) return null;

    try {
        // Get the country code
        const countryCode = getCountryCode(countryName);

        // Try to load from local files first
        try {
            // This approach works for both Webpack and Vite
            const flagPath = `../flags/${countryCode}.png`;

            // For debugging
            console.log(`Attempting to load flag: ${flagPath} for ${countryName}`);

            try {
                // For webpack
                return require(`../flags/${countryCode}.png`);
            } catch (e) {
                console.log(`Webpack import failed for ${countryCode}, trying direct path`);
                // For direct path or Vite
                return `/src/flags/${countryCode}.png`;
            }
        } catch (error) {
            console.warn(`Could not load flag for ${countryName} (${countryCode})`, error);

            // Create a canvas-based flag as fallback
            return ImageManager.createFlagEmoji(countryCode);
        }
    } catch (error) {
        console.warn(`Error in getFlagImage for ${countryName}:`, error);
        return ImageManager.defaultImage;
    }
};

// Synchronous version that works better with certain imports
export const getFlagImageSync = (countryName) => {
    return getFlagImage(countryName);
};