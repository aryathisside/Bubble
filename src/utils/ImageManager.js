// // Define a utility class for handling image loading
// class ImageLoader {
//   // Static method to retrieve images
//   static get(url) {
//     console.log("url is", url)
//     // Check if the image is already cached
//     let cachedImage = this.cache[url];

//     // If the image is not cached, load it
//     if (!cachedImage) {
//       // Create a new image element
//       const imageElement = document.createElement('img');

//       // Flag to track whether the image has loaded
//       let isLoaded = false;

//       // Listen for the image load event
//       imageElement.addEventListener('load', () => {
//         // Set the flag to true when the image is loaded
//         isLoaded = true;
//       });

//       // Set the image source to the specified URL, triggering loading
//       imageElement.src = url;

//       // Define a function to check if the image is loaded and return it
//       cachedImage = () => (isLoaded ? imageElement : null);

//       // Cache the image retrieval function for future use
//       this.cache[url] = cachedImage;
//     }
//     // Return the cached image retrieval function
//     return cachedImage;
//   }
// }

// // Initialize an empty cache to store image retrieval functions
// ImageLoader.cache = {};

// // Alias the ImageLoader class as ImageManager
// const ImageManager = ImageLoader;

// export default ImageManager;

// class ImageManager {
//   static cache = {};
//   static defaultImage = null;

//   // Initialize the default image
//   static initDefaultImage() {
//     if (!this.defaultImage) {
//       // Create a 30x30 colored circle as default image
//       const canvas = document.createElement('canvas');
//       canvas.width = 30;
//       canvas.height = 30;
//       const ctx = canvas.getContext('2d');

//       // Draw a gradient circle
//       const gradient = ctx.createRadialGradient(15, 15, 0, 15, 15, 15);
//       gradient.addColorStop(0, '#4B0082');
//       gradient.addColorStop(0.8, '#6A5ACD');
//       gradient.addColorStop(1, '#9370DB');

//       ctx.fillStyle = gradient;
//       ctx.beginPath();
//       ctx.arc(15, 15, 15, 0, Math.PI * 2);
//       ctx.fill();

//       // Add text if needed
//       ctx.fillStyle = 'white';
//       ctx.font = '12px Arial';
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillText('•', 15, 15);

//       // Convert to image
//       const img = new Image();
//       img.src = canvas.toDataURL('image/png');
//       this.defaultImage = img;
//     }
//     return this.defaultImage;
//   }

//   static get(url) {
//     // Initialize default image
//     this.initDefaultImage();

//     // Empty or invalid URL check
//     if (!url || url.includes('via.placeholder.com')) {
//       return this.defaultImage;
//     }

//     // Data URI check - return directly if it's a data URI
//     if (url.startsWith('data:')) {
//       if (!this.cache[url]) {
//         const img = new Image();
//         img.src = url;
//         this.cache[url] = img;
//       }
//       return this.cache[url];
//     }

//     // Check if image is already cached and loaded
//     if (this.cache[url] && this.cache[url].complete && !this.cache[url].errorOccurred) {
//       return this.cache[url];
//     }

//     // Create new image if not cached
//     if (!this.cache[url]) {
//       const img = new Image();

//       // Mark as having an error
//       img.errorOccurred = false;

//       img.onerror = () => {
//         img.errorOccurred = true;
//         console.warn(`Failed to load image: ${url}`);
//         // Use our pre-rendered circle instead of a transparent pixel
//         img.src = this.defaultImage.src;
//       };

//       // Handle cross-origin issues
//       img.crossOrigin = 'anonymous';

//       // Start loading
//       img.src = url;
//       this.cache[url] = img;
//     }

//     // If the image has an error, return the default
//     if (this.cache[url].errorOccurred) {
//       return this.defaultImage;
//     }

//     // Return the cached image
//     return this.cache[url];
//   }
// }

// export default ImageManager;

// src/utils/ImageManager.js

class ImageManager {
  static cache = {};
  static defaultImage = null;
  static loadingPromises = {};

  // Initialize a default image that will always work
  static initDefaultImage() {
    if (!this.defaultImage) {
      // Create a colored square with text as failsafe default
      const canvas = document.createElement('canvas');
      canvas.width = 40;
      canvas.height = 40;
      const ctx = canvas.getContext('2d');

      // Fill with a gradient
      const gradient = ctx.createLinearGradient(0, 0, 40, 40);
      gradient.addColorStop(0, '#4169E1');  // Royal Blue
      gradient.addColorStop(1, '#1E90FF');  // Dodger Blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 40, 40);

      // Add a flag-like symbol
      ctx.fillStyle = 'white';
      ctx.fillRect(8, 8, 4, 24); // pole
      ctx.fillRect(12, 8, 20, 16); // flag

      // Convert to image
      const img = new Image();
      img.src = canvas.toDataURL('image/png');

      // Make sure it's loaded before assigning
      img.onload = () => {
        this.defaultImage = img;
      };

      // Set a temporary value
      this.defaultImage = img;
    }
    return this.defaultImage;
  }

  // New method to handle SVG data URLs properly
  static createSvgImage(svgData) {
    // If we already have this SVG cached, return it
    if (this.cache[svgData] && this.cache[svgData].complete) {
      return this.cache[svgData];
    }

    const img = new Image();
    img.src = svgData;

    // Make sure SVG is properly encoded for use in image src
    if (svgData.startsWith('data:image/svg+xml,')) {
      // If it's not using base64 encoding, ensure special chars are escaped
      const fixedSvg = svgData.replace(/<(\/?[^>]+)>/g,
        (match) => encodeURIComponent(match));
      img.src = fixedSvg;
    } else if (svgData.startsWith('data:image/svg+xml;utf8,')) {
      // Convert utf8 encoding to properly encoded URI
      const svgContent = svgData.substring('data:image/svg+xml;utf8,'.length);
      img.src = 'data:image/svg+xml,' + encodeURIComponent(svgContent);
    }

    this.cache[svgData] = img;
    return img;
  }

  // Create a flag emoji image
  static createFlagEmoji(countryCode) {
    // Create a data URL with the flag emoji (fallback to a colored rectangle)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 60;
    canvas.height = 40;

    // Fill background with light gray
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw border
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

    // Add country code text
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(countryCode.toUpperCase(), canvas.width / 2, canvas.height / 2);

    // Convert to image
    const img = new Image();
    img.src = canvas.toDataURL('image/png');

    return img;
  }

  // Main method to get or load an image
  static get(url) {
    // Initialize default image first
    this.initDefaultImage();

    // Special case: null or empty URL
    if (!url) {
      console.warn('No image URL provided, using default image');
      return this.defaultImage;
    }

    // Special case: SVG data URLs
    if (url.startsWith('data:image/svg+xml')) {
      return this.createSvgImage(url);
    }

    // Special case: Flag emoji format
    if (url.includes('🏳️') || url.includes('flag')) {
      // Extract country code if available
      const codeMatch = url.match(/\/([a-z]{2})\.png$/i);
      const countryCode = codeMatch ? codeMatch[1] : 'UN';
      return this.createFlagEmoji(countryCode);
    }

    // Check if the image is already cached and loaded
    if (this.cache[url] && this.cache[url].complete && !this.cache[url].errorOccurred) {
      return this.cache[url];
    }

    // If we're already loading this image, don't start again
    if (this.loadingPromises[url]) {
      return this.defaultImage; // Return default while loading
    }

    // Handle local file paths (assuming they start with ./ or /)
    if (url.startsWith('./') || url.startsWith('/') || url.startsWith('..')) {
      try {
        // For local imports, we need to use require (for webpack) or import.meta (for vite)
        // We'll create an image from the imported resource
        const img = new Image();

        // For debugging
        console.log(`Loading local image: ${url}`);

        // Try to use require for webpack environments
        try {
          const imgSrc = require(url);
          img.src = typeof imgSrc === 'string' ? imgSrc : imgSrc.default;
        } catch (e) {
          console.warn(`Failed to load local image with require: ${url}`, e);
          // Fallback to direct path (might work in some bundlers)
          img.src = url;
        }

        this.cache[url] = img;

        // Set up error handling
        img.onerror = () => {
          console.warn(`Failed to load local image: ${url}`);
          img.errorOccurred = true;
        };

        return img;
      } catch (error) {
        console.warn(`Error loading local image ${url}:`, error);
        return this.defaultImage;
      }
    }

    // Handle remote URLs
    if (!this.cache[url]) {
      const img = new Image();
      img.crossOrigin = 'anonymous'; // Enable CORS for external images
      img.onerror = () => {
        console.warn(`Failed to load image: ${url}`);
        img.errorOccurred = true;
        delete this.loadingPromises[url];

        // Replace with default image if loading fails
        img.src = this.defaultImage.src;
      };

      img.onload = () => {
        delete this.loadingPromises[url];
      };

      // Track that we're loading this image
      this.loadingPromises[url] = true;

      // Start loading
      img.src = url;
      this.cache[url] = img;
    }

    // Return default while loading or the cached image
    return this.cache[url].complete && !this.cache[url].errorOccurred
      ? this.cache[url]
      : this.defaultImage;
  }

  // Clear the cache (useful for memory management)
  static clearCache() {
    this.cache = {};
    this.loadingPromises = {};
  }
}

export default ImageManager;