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

class ImageManager {
  static cache = {};
  static defaultImage = null;

  // Initialize the default image
  static initDefaultImage() {
    if (!this.defaultImage) {
      // Create a 30x30 colored circle as default image
      const canvas = document.createElement('canvas');
      canvas.width = 30;
      canvas.height = 30;
      const ctx = canvas.getContext('2d');

      // Draw a gradient circle
      const gradient = ctx.createRadialGradient(15, 15, 0, 15, 15, 15);
      gradient.addColorStop(0, '#4B0082');
      gradient.addColorStop(0.8, '#6A5ACD');
      gradient.addColorStop(1, '#9370DB');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(15, 15, 15, 0, Math.PI * 2);
      ctx.fill();

      // Add text if needed
      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('•', 15, 15);

      // Convert to image
      const img = new Image();
      img.src = canvas.toDataURL('image/png');
      this.defaultImage = img;
    }
    return this.defaultImage;
  }

  static get(url) {
    // Initialize default image
    this.initDefaultImage();

    // Empty or invalid URL check
    if (!url || url.includes('via.placeholder.com')) {
      return this.defaultImage;
    }

    // Data URI check - return directly if it's a data URI
    if (url.startsWith('data:')) {
      if (!this.cache[url]) {
        const img = new Image();
        img.src = url;
        this.cache[url] = img;
      }
      return this.cache[url];
    }

    // Check if image is already cached and loaded
    if (this.cache[url] && this.cache[url].complete && !this.cache[url].errorOccurred) {
      return this.cache[url];
    }

    // Create new image if not cached
    if (!this.cache[url]) {
      const img = new Image();

      // Mark as having an error
      img.errorOccurred = false;

      img.onerror = () => {
        img.errorOccurred = true;
        console.warn(`Failed to load image: ${url}`);
        // Use our pre-rendered circle instead of a transparent pixel
        img.src = this.defaultImage.src;
      };

      // Handle cross-origin issues
      img.crossOrigin = 'anonymous';

      // Start loading
      img.src = url;
      this.cache[url] = img;
    }

    // If the image has an error, return the default
    if (this.cache[url].errorOccurred) {
      return this.defaultImage;
    }

    // Return the cached image
    return this.cache[url];
  }
}

export default ImageManager;