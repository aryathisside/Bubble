// import useConfigStore from '../store/useConfigStore';
// import Canvas from './Canvas';
// import ImageManager from './ImageManager';
// import Tween from './Tween';

// const Constants = {
//   bubblePadding: 10,
//   bubbleBorder: 3,
//   bubbleHitbox: 10
// };

// class Bubble {
//   constructor(currency) {
//     this.lastFingerprint = '';
//     this.radiusTween = new Tween(0, 1000);
//     this.color = '';
//     this.transitionRadius = null;
//     this.posX = 0;
//     this.posY = 0;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.size = 0;
//     this.radius = 0;
//     this.content = '';
//     this.visible = false;
//     this.latestPush = 0;
//     this.renderFavoriteBorder = true;
//     this.currency = currency;
//     this.canvas = new Canvas(Constants.bubblePadding);
//     console.log(currency);

//     // Only define lazyImage once, as a function
//     this.lazyImage = () => {
//       try {
//         // Attempt to get the image from the manager
//         const img = ImageManager.get(currency.image);
//         // Return the image if it's valid
//         return img;
//       } catch (error) {
//         console.warn("Image loading failed, using fallback");
//         return null;
//       }
//     };
//   }

//   // Apply force to the bubble's speed
//   applyForce(forceX, forceY) {
//     this.speedX += forceX;
//     this.speedY += forceY;
//   }

//   // Set the bubble's radius with optional transition time
//   setRadius(radi, transitionTime) {
//     const radius = Number.isFinite(radi) ? radi : 0;
//     this.radiusTween.set(radius, transitionTime);
//     if (!transitionTime) {
//       this.transitionRadius = Math.max(radius, this.radius);
//     }
//   }

//   // Set the bubble's color based on RGB values
//   setColor(color) {
//     const { red, green, blue } = color;
//     this.color = `${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}`;
//   }

//   // Set the bubble's content
//   setContent(content) {
//     this.content = content;
//   }

//   // Update the bubble's state
//   update() {
//     this.radius = this.radiusTween.get();
//     this.visible = this.radius > 0;
//   }

//   // Rerender the bubble if its fingerprint has changed
//   rerender(radius) {
//     const image = this.lazyImage();
//     const roundedRadius = Math.round(radius);
//     const shouldRenderBorder = this.renderFavoriteBorder && useConfigStore.getState().favorites.includes(this.currency.id);
//     const fingerprint = `${this.color} ${roundedRadius} ${this.content} ${Boolean(image)} ${shouldRenderBorder}`;

//     if (fingerprint !== this.lastFingerprint) {
//       this.lastFingerprint = fingerprint;
//       const diameter = 2 * roundedRadius;
//       this.canvas.begin(diameter);

//       const gradient = this.canvas.createRadialGradient(roundedRadius, roundedRadius, 0, roundedRadius, roundedRadius, roundedRadius);
//       gradient.addColorStop(0, `rgba(${this.color}, 0.05)`);
//       gradient.addColorStop(0.8, `rgba(${this.color}, 0.1)`);
//       gradient.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
//       gradient.addColorStop(1, `rgb(${this.color})`);

//       this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
//       this.canvas.fill(gradient);

//       if (shouldRenderBorder) {
//         const borderColor = 'yellow';
//         this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
//         this.canvas.stroke(borderColor, Constants.bubbleBorder);
//       }

//       const isLarge = roundedRadius > 30;
//       const imageSize = roundedRadius * (isLarge ? 0.55 : 1.2);
//       const imageWidth = imageSize * (image ? image.width / image.height : 1);
//       const imageX = 0.5 * (diameter - imageWidth);
//       const imageY = (diameter - imageSize) * (isLarge ? 0.14 : 0.5);

//       if (image) {
//         this.canvas.drawImage(image, imageX, imageY, imageWidth, imageSize);
//       } else {
//         // Fallback when image is not available
//         const circleRadius = 0.5 * imageSize;
//         this.canvas.circle(imageX + circleRadius, imageY + circleRadius, circleRadius);
//         this.canvas.stroke('white', 1);
//       }


//       if (isLarge) {
//         this.canvas.context.textAlign = 'center';
//         this.canvas.context.fillStyle = 'white';

//         const symbol = this.currency.symbol || this.currency.name?.substring(0, 2) || '';
//         const symbolSize = roundedRadius * (symbol.length < 5 ? 0.55 : 0.35);
//         this.canvas.fillText(symbol, roundedRadius, 1.25 * roundedRadius, symbolSize);

//         const contentSize = roundedRadius * ((this.content || '').length > 8 ? 0.24 : 0.3);
//         this.canvas.fillText(this.content || '', roundedRadius, 1.65 * roundedRadius, contentSize);
//       }

//       this.canvas.end();
//     }
//   }

//   // Render the bubble on the provided context
//   render(context) {
//     const padding = this.radius + Constants.bubblePadding;
//     const x = this.posX - padding;
//     const y = this.posY - padding;

//     if (this.transitionRadius !== null) {
//       this.rerender(this.transitionRadius);
//       const diameter = 2 * padding;
//       context.drawImage(this.canvas.getImage(), x, y, diameter, diameter);
//       if (this.radiusTween.isDone()) {
//         this.transitionRadius = null;
//       }
//     } else {
//       this.rerender(this.radius);
//       context.drawImage(this.canvas.getImage(), x, y);
//     }
//   }
// }

// export default Bubble;


// import useConfigStore from '../store/useConfigStore';
// import Canvas from './Canvas';
// import ImageManager from './ImageManager';
// import Tween from './Tween';

// const Constants = {
//   bubblePadding: 10,
//   bubbleBorder: 3,
//   bubbleHitbox: 10,
//   minRadius: 20 // Define a minimum radius to prevent disappearance
// };

// class Bubble {
//   constructor(currency) {
//     this.lastFingerprint = '';
//     this.radiusTween = new Tween(30, 1000); // Start with size 30 and 1000ms duration
//     this.color = '';
//     this.transitionRadius = null;
//     this.posX = 0;
//     this.posY = 0;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.size = 30; // Start with a reasonable default size
//     this.radius = 30; // Start with a reasonable default radius
//     this.content = '';
//     this.visible = true; // Default to visible
//     this.latestPush = 0;
//     this.renderFavoriteBorder = true;
//     this.currency = currency;
//     this.canvas = new Canvas(Constants.bubblePadding);

//     // Only define lazyImage once, as a function
//     this.lazyImage = () => {
//       try {
//         // Attempt to get the image from the manager
//         const img = ImageManager.get(currency.image);
//         // Return the image if it's valid
//         return img;
//       } catch (error) {
//         console.warn("Image loading failed, using fallback");
//         return null;
//       }
//     };
//   }

//   // Apply force to the bubble's speed
//   applyForce(forceX, forceY) {
//     this.speedX += forceX;
//     this.speedY += forceY;
//   }

//   // Set the bubble's radius with optional transition time
//   setRadius(radi, transitionTime) {
//     // Never allow radius to go below minimum
//     const radius = Math.max(Constants.minRadius, Number.isFinite(radi) ? radi : Constants.minRadius);

//     // Adapt to your existing Tween implementation
//     if (transitionTime > 0) {
//       // Start a new transition with the current value as starting point
//       this.radiusTween = new Tween(radius, transitionTime);
//       this.radiusTween.set(radius, false); // Use false to not reset (keep current as start)
//       this.transitionRadius = Math.max(radius, this.radius);
//     } else {
//       // Immediate change - set with no transition
//       this.radiusTween = new Tween(radius, 0);
//       this.transitionRadius = null;
//     }
//   }

//   // Set the bubble's color based on RGB values
//   setColor(color) {
//     const { red, green, blue } = color;
//     this.color = `${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}`;
//   }

//   // Set the bubble's content
//   setContent(content) {
//     this.content = content || (this.currency?.symbol || '');
//   }

//   // Update the bubble's state
//   update() {
//     const prevRadius = this.radius;
//     this.radius = this.radiusTween.get();

//     // Ensure radius never falls below minimum
//     if (this.radius < Constants.minRadius) {
//       this.radius = Constants.minRadius;
//       this.radiusTween = new Tween(Constants.minRadius, 0);
//     }

//     // Set visibility based on whether radius is above zero
//     this.visible = this.radius > 0;
//   }
//   rerender(radius) {
//     const image = this.lazyImage();
//     const roundedRadius = Math.round(radius);
//     const shouldRenderBorder = this.renderFavoriteBorder && useConfigStore.getState().favorites.includes(this.currency.id);
//     const fingerprint = `${this.color} ${roundedRadius} ${this.content} ${Boolean(image)} ${shouldRenderBorder}`;

//     if (fingerprint !== this.lastFingerprint) {
//       this.lastFingerprint = fingerprint;
//       const diameter = 2 * roundedRadius;
//       this.canvas.begin(diameter);

//       const gradient = this.canvas.createRadialGradient(roundedRadius, roundedRadius, 0, roundedRadius, roundedRadius, roundedRadius);
//       gradient.addColorStop(0, `rgba(${this.color}, 0.05)`);
//       gradient.addColorStop(0.8, `rgba(${this.color}, 0.1)`);
//       gradient.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
//       gradient.addColorStop(1, `rgb(${this.color})`);

//       this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
//       this.canvas.fill(gradient);

//       if (shouldRenderBorder) {
//         const borderColor = 'yellow';
//         this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
//         this.canvas.stroke(borderColor, Constants.bubbleBorder);
//       }

//       // Only render text for larger bubbles
//       const isLarge = roundedRadius > 30;

//       // Adjust image size and position based on bubble size
//       let imageSize;
//       let imageY;

//       if (isLarge) {
//         // Smaller image for large bubbles to make room for text
//         imageSize = roundedRadius * 0.45;
//         imageY = roundedRadius * 0.4; // Position image in the upper half
//       } else {
//         // For small bubbles, fill most of the space with the image
//         imageSize = roundedRadius * 1.2;
//         imageY = (diameter - imageSize) * 0.5;
//       }

//       const imageWidth = imageSize * (image ? image.width / image.height : 1);
//       const imageX = 0.5 * (diameter - imageWidth);

//       if (image) {
//         this.canvas.drawImage(image, imageX, imageY, imageWidth, imageSize);
//       } else {
//         // Fallback when image is not available
//         const circleRadius = 0.5 * imageSize;
//         this.canvas.circle(imageX + circleRadius, imageY + circleRadius, circleRadius);
//         this.canvas.stroke('white', 1);
//       }

//       // Only render text for larger bubbles
//       if (isLarge) {
//         // Configure text rendering
//         this.canvas.context.textAlign = 'center';
//         this.canvas.context.fillStyle = 'white';

//         // Get location name (no longer using symbol to avoid duplication)
//         const name = this.currency.name || '';

//         // Determine max width for text to fit in bubble
//         const maxTextWidth = roundedRadius * 1.8;

//         // Function to measure and truncate text if needed
//         const fitText = (text, maxWidth, fontSize) => {
//           this.canvas.context.font = `${Math.ceil(fontSize)}px Arial`;
//           let measuredWidth = this.canvas.context.measureText(text).width;

//           // If text is too wide, truncate with ellipsis
//           if (measuredWidth > maxWidth) {
//             let truncated = text;
//             while (measuredWidth > maxWidth && truncated.length > 3) {
//               truncated = truncated.slice(0, -1);
//               measuredWidth = this.canvas.context.measureText(truncated + '...').width;
//             }
//             return truncated + '...';
//           }
//           return text;
//         };

//         // Calculate font sizes based on bubble radius
//         let nameFontSize;
//         let contentFontSize;

//         if (roundedRadius < 50) {
//           // For medium bubbles, just show name
//           nameFontSize = roundedRadius * 0.25;
//           const fittedName = fitText(name, maxTextWidth, nameFontSize);
//           this.canvas.fillText(fittedName, roundedRadius, roundedRadius * 1.35, nameFontSize);
//         } else {
//           // For large bubbles, show name and numeric value
//           nameFontSize = roundedRadius * 0.22;
//           contentFontSize = roundedRadius * 0.18;

//           // Fit and draw the name
//           const fittedName = fitText(name, maxTextWidth, nameFontSize);
//           this.canvas.fillText(fittedName, roundedRadius, roundedRadius * 1.2, nameFontSize);

//           // Draw the numeric value (e.g., revenue amount) if provided
//           if (this.content) {
//             const fittedContent = fitText(this.content, maxTextWidth, contentFontSize);
//             this.canvas.fillText(fittedContent, roundedRadius, roundedRadius * 1.5, contentFontSize);
//           }
//         }
//       }

//       this.canvas.end();
//     }
//   }

//   // Render the bubble on the provided context
//   render(context) {
//     // Ensure we render at a reasonable size
//     const effectiveRadius = Math.max(Constants.minRadius, this.radius);
//     const padding = effectiveRadius + Constants.bubblePadding;
//     const x = this.posX - padding;
//     const y = this.posY - padding;

//     if (this.transitionRadius !== null) {
//       // Use the transition radius for rendering during transitions
//       const transitionEffectiveRadius = Math.max(Constants.minRadius, this.transitionRadius);
//       this.rerender(transitionEffectiveRadius);
//       const diameter = 2 * padding;
//       context.drawImage(this.canvas.getImage(), x, y, diameter, diameter);

//       // Only remove transition when tween is complete
//       if (this.radiusTween.isDone()) {
//         this.transitionRadius = null;
//       }
//     } else {
//       // Normal rendering
//       this.rerender(effectiveRadius);
//       context.drawImage(this.canvas.getImage(), x, y);
//     }
//   }
// }

// export default Bubble;



/* eslint-disable prefer-destructuring */
/* eslint-disable prettier/prettier */
import Canvas from './Canvas';
import ImageManager from './ImageManager';
import Tween from './Tween';
import useConfigStore from '../store/useConfigStore';

const Constants = {
  bubblePadding: 10,
  bubbleBorder: 2,
  bubbleHitbox: 10
};

class Bubble {
  constructor(currency, properties = {}) {
    this.lastFingerprint = ''; // Unique identifier for rendering changes
    this.radiusTween = new Tween(0, 1000); // Tween for smooth radius changes
    this.color = ''; // Bubble color
    this.transitionRadius = null; // Radius during transition
    this.posX = 0; // X position
    this.posY = 0; // Y position
    this.speedX = 0; // X speed
    this.speedY = 0; // Y speed
    this.size = 0; // Bubble size
    this.radius = 0; // Bubble radius
    this.content = ''; // Bubble content
    this.visible = false; // Visibility flag
    this.latestPush = 0; // Timestamp of the latest data push
    this.renderFavoriteBorder = true; // Flag to render favorite border
    this.currency = currency; // Currency data associated with the bubble
    this.properties = properties; // Store properties for calculations
    this.canvas = new Canvas(Constants.bubblePadding); // Canvas for rendering

    // Load the image asynchronously
    try {
      ImageManager.get(`${process.env.BUBBLE_IMAGE_PATH}/${currency.image}`)
        .then(image => {
          this.lazyImage = image; // Store the loaded image
          this.rerender(this.radius); // Rerender once the image is loaded
        })
        .catch(() => {
          console.error("Failed to load image");
          this.lazyImage = null; // Handle loading failure
        });
    } catch (error) {
      console.error("Error loading image:", error);
      this.lazyImage = null;
    }
  }

  // Apply force to the bubble's speed
  applyForce(forceX, forceY) {
    this.speedX += forceX;
    this.speedY += forceY;
  }

  // Set the bubble's radius with optional transition time
  setRadius(radi, transitionTime) {
    const radius = Number.isFinite(radi) ? radi : 0;
    this.radiusTween.set(radius, transitionTime);
    if (!transitionTime) {
      this.transitionRadius = Math.max(radius, this.radius);
    }
  }

  // Set the bubble's color based on RGB values
  setColor(color) {
    const { red, green, blue } = color;
    this.color = `${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}`;
  }

  // Set the bubble's content
  setContent(content) {
    this.content = content;
  }

  // Update the bubble's state
  update() {
    this.radius = this.radiusTween.get();
    this.visible = this.radius > 0;
  }

  // Get revenue value for coloring
  getRevenueValue() {
    // For crypto data using your structure, we'll use the price as revenue
    // You can adjust this for your actual revenue metric
    if (this.currency && this.currency.price) {
      return this.currency.price;
    }
    return 0;
  }

  // Determine border color based on revenue
  getBorderColorFromRevenue(revenueValue, minRevenue, maxRevenue) {
    // If we have no valid range, use a default color
    if (maxRevenue <= minRevenue) {
      return 'rgb(128, 128, 128)'; // Gray for undefined range
    }

    // Special case for zero or negative revenue
    if (revenueValue <= 0) {
      return 'rgb(255, 0, 0)'; // Red for zero/negative revenue
    }

    // Use logarithmic scale for better visualization of large variations
    const logValue = Math.log(Math.max(1, revenueValue));
    const logMin = Math.log(Math.max(1, minRevenue));
    const logMax = Math.log(Math.max(logMin + 1, maxRevenue)); // Avoid division by zero

    // Calculate normalized value (0-1)
    const normalizedValue = (logValue - logMin) / (logMax - logMin);

    // Color gradient: red -> yellow -> green
    if (normalizedValue < 0.5) {
      // Red (255,0,0) to Yellow (255,255,0)
      const green = Math.round(255 * (normalizedValue * 2));
      return `rgb(255, ${green}, 0)`;
    } else {
      // Yellow (255,255,0) to Green (0,255,0)
      const red = Math.round(255 * (1 - (normalizedValue - 0.5) * 2));
      return `rgb(${red}, 255, 0)`;
    }
  }

  // Rerender the bubble if its fingerprint has changed
  rerender(radius) {
    const image = this.lazyImage;
    const roundedRadius = Math.round(radius);

    // Check if this currency is in favorites
    const shouldRenderFavoriteBorder = this.renderFavoriteBorder &&
      useConfigStore.getState().favorites.includes(this.currency.id);

    // Get revenue value for border color
    const revenueValue = this.getRevenueValue();

    // Try to get revenue ranges from global manager if available
    let minRevenue = 0;
    let maxRevenue = 1000000;

    if (window.activeBubbleManager && window.activeBubbleManager.revenueRanges) {
      minRevenue = window.activeBubbleManager.revenueRanges.min || 0;
      maxRevenue = window.activeBubbleManager.revenueRanges.max || 1000000;
    } else if (window.minMaxRevenue) {
      // Fallback to window object if available
      minRevenue = window.minMaxRevenue.min || 0;
      maxRevenue = window.minMaxRevenue.max || 1000000;
    }

    // Create a unique fingerprint that includes revenue
    const fingerprint = `${this.color} ${roundedRadius} ${this.content} ${Boolean(image)} ${shouldRenderFavoriteBorder} ${revenueValue}`;

    if (fingerprint !== this.lastFingerprint) {
      this.lastFingerprint = fingerprint;
      const diameter = 2 * roundedRadius;
      this.canvas.begin(diameter);

      // Draw bubble background with gradient
      const gradient = this.canvas.createRadialGradient(roundedRadius, roundedRadius, 0, roundedRadius, roundedRadius, roundedRadius);
      gradient.addColorStop(0, `rgba(${this.color}, 0.05)`);
      gradient.addColorStop(0.8, `rgba(${this.color}, 0.1)`);
      gradient.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
      gradient.addColorStop(1, `rgb(${this.color})`);

      this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
      this.canvas.fill(gradient);

      // Calculate border color based on revenue
      const borderColor = this.getBorderColorFromRevenue(revenueValue, minRevenue, maxRevenue);

      // Calculate border width - slightly thicker for higher revenue
      const baseBorderWidth = Math.max(2, roundedRadius * 0.025); // Base width
      let borderWidth = baseBorderWidth;

      // Add revenue-based border
      this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
      this.canvas.stroke(borderColor, borderWidth);

      // If also a favorite, add a second inner yellow border
      if (shouldRenderFavoriteBorder) {
        const innerBorderWidth = borderWidth * 0.7;
        const innerRadius = roundedRadius - borderWidth;
        this.canvas.circle(roundedRadius, roundedRadius, innerRadius);
        this.canvas.stroke('yellow', innerBorderWidth);
      }

      // Draw image and text as in the original code
      const isLarge = roundedRadius > 30;
      const imageSize = roundedRadius * (isLarge ? 0.55 : 1.2);
      const imageWidth = imageSize * (image ? image.width / image.height : 1);
      const imageX = 0.5 * (diameter - imageWidth);
      const imageY = (diameter - imageSize) * (isLarge ? 0.14 : 0.5);

      if (image) {
        this.canvas.drawImage(image, imageX, imageY, imageWidth, imageSize);
      } else {
        const circleRadius = 0.5 * imageSize;
        this.canvas.circle(imageX + circleRadius, imageY + circleRadius, circleRadius);
        this.canvas.stroke('white', 1);
      }

      if (isLarge) {
        this.canvas.context.textAlign = 'center';
        this.canvas.context.fillStyle = 'white';

        // eslint-disable-next-line no-nested-ternary
        const symbolFull = this.currency.symbols.binance !== "" ? this.currency.symbols.binance :
          this.currency.symbols.kucoin !== "" ? this.currency.symbols.kucoin :
            this.currency.symbols.bybit !== "" ? this.currency.symbols.bybit :
              this.currency.symbols.gateio !== "" ? this.currency.symbols.gateio :
                this.currency.symbols.coinbase !== "" ? this.currency.symbols.coinbase :
                  this.currency.symbols.mexc !== "" ? this.currency.symbols.mexc :
                    this.currency.symbols.okx;

        let symbol = "";
        if (symbolFull.includes('_')) {
          symbol = symbolFull.split('_')[0];
        } else if (symbolFull.includes('-')) {
          symbol = symbolFull.split('-')[0];
        } else {
          symbol = symbolFull.split('/')[0];
        }

        const symbolSize = roundedRadius * (symbol.length < 5 ? 0.55 : 0.35);
        this.canvas.fillText(symbol, roundedRadius, 1.25 * roundedRadius, symbolSize);

        const contentSize = roundedRadius * (this.content.length > 8 ? 0.24 : 0.3);
        this.canvas.fillText(this.content, roundedRadius, 1.65 * roundedRadius, contentSize);
      }

      this.canvas.end();
    }
  }

  // Render the bubble on the provided context
  render(context) {
    const padding = this.radius + Constants.bubblePadding;
    const x = this.posX - padding;
    const y = this.posY - padding;

    if (this.transitionRadius !== null) {
      this.rerender(this.transitionRadius);
      const diameter = 2 * padding;
      context.drawImage(this.canvas.getImage(), x, y, diameter, diameter);
      if (this.radiusTween.isDone()) {
        this.transitionRadius = null;
      }
    } else {
      this.rerender(this.radius);
      context.drawImage(this.canvas.getImage(), x, y);
    }
  }
}

export default Bubble;