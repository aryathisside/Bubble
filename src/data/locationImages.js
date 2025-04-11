export const countryFlags = {
    'USA': 'https://flagcdn.com/w320/us.png',
    'Canada': 'https://flagcdn.com/w320/ca.png',
    'UK': 'https://flagcdn.com/w320/gb.png',
    'Germany': 'https://flagcdn.com/w320/de.png',
    'Australia': 'https://flagcdn.com/w320/au.png',
    'Japan': 'https://flagcdn.com/w320/jp.png',
    'India': 'https://flagcdn.com/w320/in.png',
    'Brazil': 'https://flagcdn.com/w320/br.png'
};

// State attractions
export const stateAttractions = {
    // Canada
    'Ontario': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toronto_-_ON_-_Toronto_Harbour.jpg/320px-Toronto_-_ON_-_Toronto_Harbour.jpg',
    'Quebec': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Montreal_-_QC_-_Skyline.jpg/320px-Montreal_-_QC_-_Skyline.jpg',

    // UK
    'England': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/London_Thames_Sunset_panorama_-_Feb_2008.jpg/320px-London_Thames_Sunset_panorama_-_Feb_2008.jpg',
    'Scotland': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Edinburgh_Castle_from_the_North.JPG/320px-Edinburgh_Castle_from_the_North.JPG',

    // US
    'California': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/320px-Hollywood_Sign_%28Zuschnitt%29.jpg',
    'New York': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/213px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
    'Texas': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Austin_Texas_Sunset_Skyline_2011.jpg/320px-Austin_Texas_Sunset_Skyline_2011.jpg'
};

// City tourist attractions
export const cityAttractions = {
    // Canadian cities
    'Toronto': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/CN_Tower_Toronto_view_from_Harbourfront.jpg/213px-CN_Tower_Toronto_view_from_Harbourfront.jpg',
    'Ottawa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Parliament_of_Canada%2C_Ottawa.jpg/320px-Parliament_of_Canada%2C_Ottawa.jpg',
    'Montreal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Montreal_-_QC_-_Altstadt.jpg/320px-Montreal_-_QC_-_Altstadt.jpg',

    // UK cities
    'London': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Big_Ben_Phone_box.jpg/213px-London_Big_Ben_Phone_box.jpg',
    'Manchester': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Manchester_Piccadilly_Gardens.jpg/320px-Manchester_Piccadilly_Gardens.jpg',
    'Edinburgh': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Edinburgh_from_Calton_Hill.jpg/320px-Edinburgh_from_Calton_Hill.jpg',

    // US cities
    'New York': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lower_Manhattan_skyline_-_June_2017.jpg/220px-Lower_Manhattan_skyline_-_June_2017.jpg',
    'Los Angeles': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/LA_Skyline_Mountains2.jpg/320px-LA_Skyline_Mountains2.jpg',
    'Chicago': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/CHI_Skyline.jpg/320px-CHI_Skyline.jpg'
};

// Default image as a fallback
export const defaultLocationImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkEBDEVWe5tUAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAJUlEQVRIx+3NMQEAAAjDMKYc6WhVBzxsYElTl0VFRUVFRUVF5c0D2JyjAZA/8w8AAAAASUVORK5CYII=';

// Function to get the appropriate image URL based on location type and name
export function getLocationImage(location) {
    if (location) {
        // Check if it's a city first (most specific)
        if (location.name && cityAttractions[location.name]) {
            return cityAttractions[location.name];
        }

        // Check if it's a state
        if (location.state && stateAttractions[location.state]) {
            return stateAttractions[location.state];
        }

        // Finally, check if it's a country
        if (location.country && countryFlags[location.country]) {
            return countryFlags[location.country];
        }
    }

    // Return default image if no match is found
    return defaultLocationImage;
}