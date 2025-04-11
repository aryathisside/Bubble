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


import useConfigStore from '../store/useConfigStore';
import Canvas from './Canvas';
import ImageManager from './ImageManager';
import Tween from './Tween';

const Constants = {
  bubblePadding: 10,
  bubbleBorder: 3,
  bubbleHitbox: 10,
  minRadius: 20 // Define a minimum radius to prevent disappearance
};

class Bubble {
  constructor(currency) {
    this.lastFingerprint = '';
    this.radiusTween = new Tween(30, 1000); // Start with size 30 and 1000ms duration
    this.color = '';
    this.transitionRadius = null;
    this.posX = 0;
    this.posY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.size = 30; // Start with a reasonable default size
    this.radius = 30; // Start with a reasonable default radius
    this.content = '';
    this.visible = true; // Default to visible
    this.latestPush = 0;
    this.renderFavoriteBorder = true;
    this.currency = currency;
    this.canvas = new Canvas(Constants.bubblePadding);

    // Only define lazyImage once, as a function
    this.lazyImage = () => {
      try {
        // Attempt to get the image from the manager
        const img = ImageManager.get(currency.image);
        // Return the image if it's valid
        return img;
      } catch (error) {
        console.warn("Image loading failed, using fallback");
        return null;
      }
    };
  }

  // Apply force to the bubble's speed
  applyForce(forceX, forceY) {
    this.speedX += forceX;
    this.speedY += forceY;
  }

  // Set the bubble's radius with optional transition time
  setRadius(radi, transitionTime) {
    // Never allow radius to go below minimum
    const radius = Math.max(Constants.minRadius, Number.isFinite(radi) ? radi : Constants.minRadius);

    // Adapt to your existing Tween implementation
    if (transitionTime > 0) {
      // Start a new transition with the current value as starting point
      this.radiusTween = new Tween(radius, transitionTime);
      this.radiusTween.set(radius, false); // Use false to not reset (keep current as start)
      this.transitionRadius = Math.max(radius, this.radius);
    } else {
      // Immediate change - set with no transition
      this.radiusTween = new Tween(radius, 0);
      this.transitionRadius = null;
    }
  }

  // Set the bubble's color based on RGB values
  setColor(color) {
    const { red, green, blue } = color;
    this.color = `${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)}`;
  }

  // Set the bubble's content
  setContent(content) {
    this.content = content || (this.currency?.symbol || '');
  }

  // Update the bubble's state
  update() {
    const prevRadius = this.radius;
    this.radius = this.radiusTween.get();

    // Ensure radius never falls below minimum
    if (this.radius < Constants.minRadius) {
      this.radius = Constants.minRadius;
      this.radiusTween = new Tween(Constants.minRadius, 0);
    }

    // Set visibility based on whether radius is above zero
    this.visible = this.radius > 0;
  }

  // Rerender the bubble if its fingerprint has changed
  rerender(radius) {
    const image = this.lazyImage();
    // Ensure we never render with a radius below minimum
    const roundedRadius = Math.max(Constants.minRadius, Math.round(radius));
    const shouldRenderBorder = this.renderFavoriteBorder && useConfigStore.getState().favorites.includes(this.currency.id);
    const fingerprint = `${this.color} ${roundedRadius} ${this.content} ${Boolean(image)} ${shouldRenderBorder}`;

    if (fingerprint !== this.lastFingerprint) {
      this.lastFingerprint = fingerprint;
      const diameter = 2 * roundedRadius;
      this.canvas.begin(diameter);

      const gradient = this.canvas.createRadialGradient(roundedRadius, roundedRadius, 0, roundedRadius, roundedRadius, roundedRadius);
      gradient.addColorStop(0, `rgba(${this.color}, 0.05)`);
      gradient.addColorStop(0.8, `rgba(${this.color}, 0.1)`);
      gradient.addColorStop(0.9, `rgba(${this.color}, 0.4)`);
      gradient.addColorStop(1, `rgb(${this.color})`);

      this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
      this.canvas.fill(gradient);

      if (shouldRenderBorder) {
        const borderColor = 'yellow';
        this.canvas.circle(roundedRadius, roundedRadius, roundedRadius);
        this.canvas.stroke(borderColor, Constants.bubbleBorder);
      }

      const isLarge = roundedRadius > 30;
      const imageSize = roundedRadius * (isLarge ? 0.55 : 1.2);
      const imageWidth = imageSize * (image ? image.width / image.height : 1);
      const imageX = 0.5 * (diameter - imageWidth);
      const imageY = (diameter - imageSize) * (isLarge ? 0.14 : 0.5);

      if (image) {
        this.canvas.drawImage(image, imageX, imageY, imageWidth, imageSize);
      } else {
        // Fallback when image is not available
        const circleRadius = 0.5 * imageSize;
        this.canvas.circle(imageX + circleRadius, imageY + circleRadius, circleRadius);
        this.canvas.stroke('white', 1);
      }

      if (isLarge) {
        this.canvas.context.textAlign = 'center';
        this.canvas.context.fillStyle = 'white';

        const symbol = this.currency.symbol || this.currency.name?.substring(0, 2) || '';
        const symbolSize = roundedRadius * (symbol.length < 5 ? 0.55 : 0.35);
        this.canvas.fillText(symbol, roundedRadius, 1.25 * roundedRadius, symbolSize);

        const contentSize = roundedRadius * ((this.content || '').length > 8 ? 0.24 : 0.3);
        this.canvas.fillText(this.content || '', roundedRadius, 1.65 * roundedRadius, contentSize);
      }

      this.canvas.end();
    }
  }

  // Render the bubble on the provided context
  render(context) {
    // Ensure we render at a reasonable size
    const effectiveRadius = Math.max(Constants.minRadius, this.radius);
    const padding = effectiveRadius + Constants.bubblePadding;
    const x = this.posX - padding;
    const y = this.posY - padding;

    if (this.transitionRadius !== null) {
      // Use the transition radius for rendering during transitions
      const transitionEffectiveRadius = Math.max(Constants.minRadius, this.transitionRadius);
      this.rerender(transitionEffectiveRadius);
      const diameter = 2 * padding;
      context.drawImage(this.canvas.getImage(), x, y, diameter, diameter);

      // Only remove transition when tween is complete
      if (this.radiusTween.isDone()) {
        this.transitionRadius = null;
      }
    } else {
      // Normal rendering
      this.rerender(effectiveRadius);
      context.drawImage(this.canvas.getImage(), x, y);
    }
  }
}

export default Bubble;