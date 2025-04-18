// /* eslint-disable no-cond-assign */
// /* eslint-disable no-continue */
// /* eslint-disable no-restricted-syntax */
// import BubbleNew from './Bubble';
// import CanvasManager from './CanvasManager';
// import EventEmitter from './EventEmitter';
// import Helper from './Helper';

// // Constants
// const Constants = {
//   bubblePadding: 10,
//   bubbleBorder: 2,
//   bubbleHitbox: 10
// };

// // Check if the application is embedded
// const isEmbedded = false;

// class BubbleManager extends CanvasManager {
//   constructor(canvasElement, properties) {
//     super(canvasElement);
//     this.needsRecalculation = false; // Flag to indicate if bubble properties need recalculation
//     this.recalculationCount = 0; // Count of recalculations
//     this.latestPush = 0; // Timestamp of the latest data push
//     this.bubbles = []; // Array of bubbles
//     this.bubblesDict = {}; // Dictionary of bubbles by currency ID
//     this.pointerX = -1; // X position of the pointer
//     this.pointerY = -1; // Y position of the pointer
//     this.hoveredBubble = null; // Currently hovered bubble
//     this.draggedBubble = null; // Currently dragged bubble
//     this.possibleSelectedBubble = null; // Possible selected bubble
//     this.timePointerDown = 0; // Timestamp of the pointer down event
//     this.timeLastWakeUp = Date.now(); // Timestamp of the last wake-up
//     this.selectedCurrencyId = null; // ID of the selected currency
//     this.renderFavoriteBorder = true; // Flag to render favorite border
//     this.eventSelect = new EventEmitter(); // Event emitter for selection events

//     this.eventResize.register(() => {
//       this.needsRecalculation = true;
//       this.requestFrame();
//     });

//     this.eventFrame.register((deltaTime) => {
//       if (this.needsRecalculation) {
//         this.recalculate();
//       }
//       this.update(deltaTime);
//       this.render();

//       const timeSinceLastWakeUp = Date.now() - this.timeLastWakeUp;
//       const delay = Math.round(timeSinceLastWakeUp / 150 - 20);
//       const adjustedDelay = Math.max(0, Math.min(delay, 80));

//       if (adjustedDelay > 0 && !isEmbedded) {
//         window.setTimeout(() => this.requestFrame(), adjustedDelay);
//       } else {
//         this.requestFrame();
//       }
//     });

//     this.properties = properties;

//     canvasElement.addEventListener('pointerdown', (event) => this.handlePointerDown(event), { passive: false });
//     canvasElement.addEventListener('pointermove', (event) => this.handlePointerMove(event));
//     canvasElement.addEventListener('touchmove', (event) => this.handleTouchMove(event), { passive: false });
//     canvasElement.addEventListener('pointerup', (event) => this.handlePointerUp(event));
//     canvasElement.addEventListener('pointercancel', () => this.handlePointerCancel());
//   }

//   // Update the pointer's position
//   updatePointerPosition(event) {
//     this.pointerX = event.offsetX * window.devicePixelRatio;
//     this.pointerY = event.offsetY * window.devicePixelRatio;
//   }

//   // Update the last wake-up time
//   wakeUp() {
//     this.timeLastWakeUp = Date.now();
//   }

//   // Get the bubble closest to the pointer
//   getFocusedBubble() {
//     for (let i = this.bubbles.length - 1; i >= 0; i -= 1) {
//       const bubble = this.bubbles[i];
//       if (bubble.visible) {
//         const dx = bubble.posX - this.pointerX;
//         const dy = bubble.posY - this.pointerY;
//         const distanceSquared = dx * dx + dy * dy;
//         const hitboxRadius = bubble.radius + Constants.bubbleHitbox;
//         if (hitboxRadius * hitboxRadius >= distanceSquared) {
//           return bubble;
//         }
//       }
//     }
//     return null;
//   }

//   // Handle the pointer down event
//   handlePointerDown(event) {
//     if (event.isPrimary) {
//       this.timePointerDown = Date.now();
//       this.canvas.setPointerCapture(event.pointerId);
//       if (event.pointerType === 'mouse') {
//         this.draggedBubble = this.hoveredBubble;
//       } else {
//         this.updatePointerPosition(event);
//         this.draggedBubble = this.getFocusedBubble();
//       }
//       if (this.draggedBubble) {
//         this.possibleSelectedBubble = this.draggedBubble;
//       } else {
//         this.launchExplosion();
//       }
//     }
//   }

//   // Handle the pointer move event
//   handlePointerMove(event) {
//     if (event.isPrimary) {
//       this.updatePointerPosition(event);
//       const focusedBubble = this.getFocusedBubble();
//       if (event.pointerType === 'mouse') {
//         this.hoveredBubble = focusedBubble;
//         const cursorBubble = this.draggedBubble || this.hoveredBubble;
//         this.canvas.style.cursor = cursorBubble ? 'pointer' : 'auto';
//       }
//       if (this.possibleSelectedBubble !== focusedBubble) {
//         this.possibleSelectedBubble = null;
//       }
//     }
//   }

//   // Handle the touch move event
//   handleTouchMove(event) {
//     if (this.draggedBubble) {
//       event.preventDefault();
//     }
//   }

//   // Handle the pointer up event
//   handlePointerUp(event) {
//     if (event.isPrimary) {
//       if (this.possibleSelectedBubble) {
//         if (Date.now() - this.timePointerDown < 1000) {
//           const { currency } = this.possibleSelectedBubble;
//           this.possibleSelectedBubble = null;
//           this.eventSelect.fire(currency);
//         }
//       }
//       this.draggedBubble = null;
//     }
//   }

//   // Handle the pointer cancel event
//   handlePointerCancel() {
//     this.hoveredBubble = null;
//     this.draggedBubble = null;
//   }

//   // Launch an explosion effect on the bubbles
//   launchExplosion() {
//     for (const bubble of this.bubbles) {
//       const dx = bubble.posX - this.pointerX;
//       const dy = bubble.posY - this.pointerY;
//       const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//       const force = 5000 / (distance * distance);
//       bubble.applyForce(dx * force, dy * force);
//     }
//     this.wakeUp();
//   }

//   // Update the bubbles' positions and speeds
//   update(deltaTime) {
//     // const dampingFactor = 0.5 ** deltaTime;
//     const dampingFactor = 0.8 ** deltaTime;


//     const repulsionStrength = 0.001 * Math.min(this.width, this.height);

//     for (const bubble of this.bubbles) {
//       bubble.update();
//     }

//     for (let i = 0; i < this.bubbles.length; i += 1) {
//       const bubble1 = this.bubbles[i];
//       if (bubble1.visible) {
//         for (let j = i + 1; j < this.bubbles.length; j += 1) {
//           const bubble2 = this.bubbles[j];
//           if (!bubble2.visible) {
//             continue;
//           }
//           const dx = bubble1.posX - bubble2.posX;
//           const dy = bubble1.posY - bubble2.posY;
//           const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//           const combinedRadius = bubble1.radius + bubble2.radius;

//           if (distance < combinedRadius) {
//             const force = 6 / distance;
//             const fx = dx * force;
//             const fy = dy * force;
//             const ratio1 = 1 - bubble1.radius / combinedRadius;
//             const ratio2 = bubble2.radius / combinedRadius - 1;

//             bubble1.applyForce(fx * ratio1, fy * ratio1);
//             bubble2.applyForce(fx * ratio2, fy * ratio2);
//           }
//         }

//         bubble1.applyForce(Helper.getRandomForce() * repulsionStrength, Helper.getRandomForce() * repulsionStrength);
//       }
//     }

//     if (this.draggedBubble) {
//       const dx = this.pointerX - this.draggedBubble.posX;
//       const dy = this.pointerY - this.draggedBubble.posY;
//       const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//       const force = 5 / distance;

//       this.draggedBubble.applyForce(dx * force, dy * force);
//       this.wakeUp();
//     }

//     for (const bubble of this.bubbles) {
//       bubble.speedX *= dampingFactor;
//       bubble.speedY *= dampingFactor;
//       bubble.posX += bubble.speedX * deltaTime;
//       bubble.posY += bubble.speedY * deltaTime;

//       if (bubble.posX < bubble.radius) {
//         bubble.posX = bubble.radius;
//         bubble.speedX *= -0.7;
//       }
//       if (bubble.posY < bubble.radius) {
//         bubble.posY = bubble.radius;
//         bubble.speedY *= -0.7;
//       }
//       if (bubble.posX > this.width - bubble.radius) {
//         bubble.posX = this.width - bubble.radius;
//         bubble.speedX *= -0.7;
//       }
//       if (bubble.posY > this.height - bubble.radius) {
//         bubble.posY = this.height - bubble.radius;
//         bubble.speedY *= -0.7;
//       }
//     }
//   }

//   // Render a border around a bubble
//   renderBubbleBorder(bubble, color, width) {
//     this.context.beginPath();
//     this.context.arc(bubble.posX, bubble.posY, bubble.radius, 0, 2 * Math.PI);
//     this.context.closePath();
//     this.context.lineWidth = Constants.bubbleBorder * width;
//     this.context.strokeStyle = color;
//     this.context.stroke();
//   }

//   // Render all bubbles on the canvas
//   render() {
//     this.clear();
//     let selectedBubble = null;

//     for (const bubble of this.bubbles) {
//       if (((bubble.renderFavoriteBorder = this.renderFavoriteBorder), bubble.visible)) {
//         if (bubble.currency.id === this.selectedCurrencyId) {
//           selectedBubble = bubble;
//           continue;
//         }
//         if (this.draggedBubble === bubble) {
//           continue;
//         }
//         bubble.render(this.context);
//       }
//     }

//     if (this.draggedBubble) {
//       if (this.draggedBubble !== selectedBubble) {
//         this.draggedBubble.render(this.context);
//         this.renderBubbleBorder(this.draggedBubble, 'white', 1);
//       }
//     } else if (this.hoveredBubble) {
//       this.renderBubbleBorder(this.hoveredBubble, 'white', 1);
//     }

//     if (selectedBubble) {
//       selectedBubble.render(this.context);
//       const pulse = 0.5 * Math.sin(0.008 * Date.now()) + 0.5;
//       const borderWidth = pulse + 2;
//       const borderColor = `rgb(${Math.floor(255 * pulse)}, ${Math.floor(160 * pulse) + 95}, 255)`;
//       this.renderBubbleBorder(selectedBubble, borderColor, borderWidth);
//     }
//   }

//   // Recalculate the bubbles' properties
//   // recalculate() {
//   //   if (this.needsRecalculation === false || this.bubbles.length === 0) {
//   //     return;
//   //   }

//   //   const { size, color, colors, period, content, baseCurrency } = this.properties;
//   //   const isInitialRecalculation = this.recalculationCount === 0;

//   //   let totalSize = 0;
//   //   let maxColorValue = 0;

//   //   for (const bubble of this.bubbles) {
//   //     const isNewPush = bubble.latestPush === this.latestPush;
//   //     bubble.size = isNewPush ? Helper.calculateRadius(bubble.currency, size, period) : 0;
//   //     if (bubble.size > 0) {
//   //       totalSize += bubble.size;
//   //       const colorValue = Math.abs(Helper.calculateColorValue(bubble.currency, color, period));
//   //       if (colorValue > maxColorValue) {
//   //         maxColorValue = colorValue;
//   //       }
//   //     }
//   //   }

//   //   const canvasArea = this.width * this.height;
//   //   const sizeFactor = totalSize === 0 ? 0 : (canvasArea / totalSize) * 0.6;

//   //   for (const bubble of this.bubbles) {
//   //     const radius = Math.sqrt((bubble.size * sizeFactor) / Math.PI);
//   //     bubble.setRadius(radius, isInitialRecalculation);

//   //     const colorValue = Helper.calculateColorValue(bubble.currency, color, period);
//   //     bubble.setColor(Helper.calculateColor(colorValue, colors, maxColorValue));
//   //     bubble.setContent(Helper.generateContent(bubble.currency, content, period, baseCurrency));

//   //     bubble.posX = Helper.clamp(bubble.posX, radius, this.width - radius);
//   //     bubble.posY = Helper.clamp(bubble.posY, radius, this.height - radius);
//   //   }

//   //   this.recalculationCount += 1;
//   //   this.wakeUp();
//   // }

//   /* -------------------------------------------------------------------------- */
//   /*                                For Revenue Model                           */
//   /* -------------------------------------------------------------------------- */

//   // Unified recalculate method - replace both existing recalculate methods with this one
//   recalculate() {
//     if (this.needsRecalculation === false || this.bubbles.length === 0) {
//       return;
//     }

//     const { size, color, colors, period, timeFrame, metricType, content, baseCurrency } = this.properties;
//     const isInitialRecalculation = this.recalculationCount === 0;

//     // Determine which time period to use (revenue or crypto)
//     const effectiveTimeFrame = timeFrame || period || 'month';

//     let totalSize = 0;
//     let maxColorValue = 0;

//     for (const bubble of this.bubbles) {
//       const isNewPush = bubble.latestPush === this.latestPush;

//       // Choose the appropriate size calculation method based on data type
//       if (bubble.currency.metrics) {
//         // Revenue data
//         bubble.size = isNewPush ? Helper.calculateRevenueRadius(bubble.currency, size, effectiveTimeFrame, metricType) : 0;
//       } else {
//         // Crypto data 
//         bubble.size = isNewPush ? Helper.calculateRadius(bubble.currency, size, effectiveTimeFrame) : 0;
//       }

//       // Add minimum size to prevent disappearing
//       if (bubble.size > 0 && bubble.size < 0.5) {
//         bubble.size = 0.5;
//       }

//       if (bubble.size > 0) {
//         totalSize += bubble.size;

//         // Choose appropriate color value calculation
//         let colorValue;
//         if (bubble.currency.metrics) {
//           colorValue = Math.abs(Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame));
//         } else {
//           colorValue = Math.abs(Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame));
//         }

//         if (colorValue > maxColorValue) {
//           maxColorValue = colorValue;
//         }
//       }
//     }

//     const canvasArea = this.width * this.height;
//     // Increase minimum size factor to prevent bubbles from disappearing
//     const sizeFactor = totalSize === 0 ? 1 : Math.max(1, (canvasArea / totalSize) * 0.6);

//     for (const bubble of this.bubbles) {
//       // Ensure minimum radius to prevent disappearing
//       const radius = Math.max(10, Math.sqrt((bubble.size * sizeFactor) / Math.PI));

//       // Use true for transition time to prevent sudden size changes
//       bubble.setRadius(radius, isInitialRecalculation);

//       // Choose appropriate color value
//       let colorValue;
//       if (bubble.currency.metrics) {
//         colorValue = Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame);
//       } else {
//         colorValue = Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame);
//       }

//       bubble.setColor(Helper.calculateColor(colorValue, colors, maxColorValue));

//       // Choose appropriate content generator
//       if (bubble.currency.metrics) {
//         bubble.setContent(Helper.generateRevenueContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
//       } else {
//         bubble.setContent(Helper.generateContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
//       }

//       // Keep bubbles more centered by adding padding
//       const padding = 50; // Extra padding to keep bubbles away from edges
//       bubble.posX = Helper.clamp(bubble.posX, radius + padding, this.width - radius - padding);
//       bubble.posY = Helper.clamp(bubble.posY, radius + padding, this.height - radius - padding);
//     }

//     // Reduce damping to prevent bubbles from moving too quickly
//     for (const bubble of this.bubbles) {
//       bubble.speedX *= 0.9;
//       bubble.speedY *= 0.9;
//     }

//     this.recalculationCount += 1;
//     this.wakeUp();
//   }


//   // Set the properties for the bubbles
//   setProperties(properties) {
//     this.properties = properties;
//     this.needsRecalculation = true;
//   }

//   // Add or update bubbles based on the provided currencies
//   pushCurrencies(currencies) {
//     this.latestPush += 1;
//     for (const currency of currencies) {
//       const { id } = currency;
//       let bubble = this.bubblesDict[id];
//       if (!bubble) {
//         bubble = new BubbleNew(currency);
//         bubble.posX = Math.random() * this.width;
//         bubble.posY = Math.random() * this.height;
//         this.bubbles.push(bubble);
//         this.bubblesDict[id] = bubble;
//       }
//       bubble.currency = currency;
//       bubble.latestPush = this.latestPush;
//     }
//     this.recalculate();
//   }



// }

// export default BubbleManager


// /* eslint-disable no-cond-assign */
// /* eslint-disable no-continue */
// /* eslint-disable no-restricted-syntax */
// import BubbleNew from './Bubble';
// import CanvasManager from './CanvasManager';
// import EventEmitter from './EventEmitter';
// import Helper from './Helper';

// // Constants
// const Constants = {
//   bubblePadding: 10,
//   bubbleBorder: 2,
//   bubbleHitbox: 10
// };

// // Check if the application is embedded
// const isEmbedded = false;

// class BubbleManager extends CanvasManager {
//   constructor(canvasElement, properties) {
//     super(canvasElement);
//     this.needsRecalculation = false; // Flag to indicate if bubble properties need recalculation
//     this.recalculationCount = 0; // Count of recalculations
//     this.latestPush = 0; // Timestamp of the latest data push
//     this.bubbles = []; // Array of bubbles
//     this.bubblesDict = {}; // Dictionary of bubbles by currency ID
//     this.pointerX = -1; // X position of the pointer
//     this.pointerY = -1; // Y position of the pointer
//     this.hoveredBubble = null; // Currently hovered bubble
//     this.draggedBubble = null; // Currently dragged bubble
//     this.possibleSelectedBubble = null; // Possible selected bubble
//     this.timePointerDown = 0; // Timestamp of the pointer down event
//     this.timeLastWakeUp = Date.now(); // Timestamp of the last wake-up
//     this.selectedCurrencyId = null; // ID of the selected currency
//     this.renderFavoriteBorder = true; // Flag to render favorite border
//     this.eventSelect = new EventEmitter(); // Event emitter for selection events
//     this.animationFrameId = null; // ID of the animation frame request

//     this.eventResize.register(() => {
//       this.needsRecalculation = true;
//       this.requestFrame();
//     });

//     this.eventFrame.register((deltaTime) => {
//       if (this.needsRecalculation) {
//         this.recalculate();
//       }
//       this.update(deltaTime);
//       this.render();

//       const timeSinceLastWakeUp = Date.now() - this.timeLastWakeUp;
//       const delay = Math.round(timeSinceLastWakeUp / 150 - 20);
//       const adjustedDelay = Math.max(0, Math.min(delay, 80));

//       if (adjustedDelay > 0 && !isEmbedded) {
//         this.animationFrameId = window.setTimeout(() => this.requestFrame(), adjustedDelay); // Store the ID
//       } else {
//         this.requestFrame();
//       }
//     });

//     this.properties = properties;

//     canvasElement.addEventListener('pointerdown', (event) => this.handlePointerDown(event), { passive: false });
//     canvasElement.addEventListener('pointermove', (event) => this.handlePointerMove(event));
//     canvasElement.addEventListener('touchmove', (event) => this.handleTouchMove(event), { passive: false });
//     canvasElement.addEventListener('pointerup', (event) => this.handlePointerUp(event));
//     canvasElement.addEventListener('pointercancel', () => this.handlePointerCancel());
//   }

//   // Update the pointer's position
//   updatePointerPosition(event) {
//     this.pointerX = event.offsetX * window.devicePixelRatio;
//     this.pointerY = event.offsetY * window.devicePixelRatio;
//   }

//   // Update the last wake-up time
//   wakeUp() {
//     this.timeLastWakeUp = Date.now();
//   }

//   // Get the bubble closest to the pointer
//   getFocusedBubble() {
//     for (let i = this.bubbles.length - 1; i >= 0; i -= 1) {
//       const bubble = this.bubbles[i];
//       if (bubble.visible) {
//         const dx = bubble.posX - this.pointerX;
//         const dy = bubble.posY - this.pointerY;
//         const distanceSquared = dx * dx + dy * dy;
//         const hitboxRadius = bubble.radius + Constants.bubbleHitbox;
//         if (hitboxRadius * hitboxRadius >= distanceSquared) {
//           return bubble;
//         }
//       }
//     }
//     return null;
//   }

//   // Handle the pointer down event
//   handlePointerDown(event) {
//     if (event.isPrimary) {
//       this.timePointerDown = Date.now();
//       this.canvas.setPointerCapture(event.pointerId);
//       if (event.pointerType === 'mouse') {
//         this.draggedBubble = this.hoveredBubble;
//       } else {
//         this.updatePointerPosition(event);
//         this.draggedBubble = this.getFocusedBubble();
//       }
//       if (this.draggedBubble) {
//         this.possibleSelectedBubble = this.draggedBubble;
//       } else {
//         this.launchExplosion();
//       }
//     }
//   }

//   // Handle the pointer move event
//   handlePointerMove(event) {
//     if (event.isPrimary) {
//       this.updatePointerPosition(event);
//       const focusedBubble = this.getFocusedBubble();
//       if (event.pointerType === 'mouse') {
//         this.hoveredBubble = focusedBubble;
//         const cursorBubble = this.draggedBubble || this.hoveredBubble;
//         this.canvas.style.cursor = cursorBubble ? 'pointer' : 'auto';
//       }
//       if (this.possibleSelectedBubble !== focusedBubble) {
//         this.possibleSelectedBubble = null;
//       }
//     }
//   }

//   // Handle the touch move event
//   handleTouchMove(event) {
//     if (this.draggedBubble) {
//       event.preventDefault();
//     }
//   }

//   // Handle the pointer up event
//   handlePointerUp(event) {
//     if (event.isPrimary) {
//       if (this.possibleSelectedBubble) {
//         if (Date.now() - this.timePointerDown < 1000) {
//           const { currency } = this.possibleSelectedBubble;
//           this.possibleSelectedBubble = null;
//           this.eventSelect.fire(currency);
//         }
//       }
//       this.draggedBubble = null;
//     }
//   }

//   // Handle the pointer cancel event
//   handlePointerCancel() {
//     this.hoveredBubble = null;
//     this.draggedBubble = null;
//   }

//   // Launch an explosion effect on the bubbles
//   launchExplosion() {
//     for (const bubble of this.bubbles) {
//       const dx = bubble.posX - this.pointerX;
//       const dy = bubble.posY - this.pointerY;
//       const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//       const force = 5000 / (distance * distance);
//       bubble.applyForce(dx * force, dy * force);
//     }
//     this.wakeUp();
//   }

//   // Update the bubbles' positions and speeds
//   update(deltaTime) {
//     // const dampingFactor = 0.5 ** deltaTime;
//     const dampingFactor = 0.8 ** deltaTime;


//     const repulsionStrength = 0.001 * Math.min(this.width, this.height);

//     for (const bubble of this.bubbles) {
//       bubble.update();
//     }

//     for (let i = 0; i < this.bubbles.length; i += 1) {
//       const bubble1 = this.bubbles[i];
//       if (bubble1.visible) {
//         for (let j = i + 1; j < this.bubbles.length; j += 1) {
//           const bubble2 = this.bubbles[j];
//           if (!bubble2.visible) {
//             continue;
//           }
//           const dx = bubble1.posX - bubble2.posX;
//           const dy = bubble1.posY - bubble2.posY;
//           const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//           const combinedRadius = bubble1.radius + bubble2.radius;

//           if (distance < combinedRadius) {
//             const force = 6 / distance;
//             const fx = dx * force;
//             const fy = dy * force;
//             const ratio1 = 1 - bubble1.radius / combinedRadius;
//             const ratio2 = bubble2.radius / combinedRadius - 1;

//             bubble1.applyForce(fx * ratio1, fy * ratio1);
//             bubble2.applyForce(fx * ratio2, fy * ratio2);
//           }
//         }

//         bubble1.applyForce(Helper.getRandomForce() * repulsionStrength, Helper.getRandomForce() * repulsionStrength);
//       }
//     }

//     if (this.draggedBubble) {
//       const dx = this.pointerX - this.draggedBubble.posX;
//       const dy = this.pointerY - this.draggedBubble.posY;
//       const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
//       const force = 5 / distance;

//       this.draggedBubble.applyForce(dx * force, dy * force);
//       this.wakeUp();
//     }

//     for (const bubble of this.bubbles) {
//       bubble.speedX *= dampingFactor;
//       bubble.speedY *= dampingFactor;
//       bubble.posX += bubble.speedX * deltaTime;
//       bubble.posY += bubble.speedY * deltaTime;

//       if (bubble.posX < bubble.radius) {
//         bubble.posX = bubble.radius;
//         bubble.speedX *= -0.7;
//       }
//       if (bubble.posY < bubble.radius) {
//         bubble.posY = bubble.radius;
//         bubble.speedY *= -0.7;
//       }
//       if (bubble.posX > this.width - bubble.radius) {
//         bubble.posX = this.width - bubble.radius;
//         bubble.speedX *= -0.7;
//       }
//       if (bubble.posY > this.height - bubble.radius) {
//         bubble.posY = this.height - bubble.radius;
//         bubble.speedY *= -0.7;
//       }
//     }
//   }

//   // Render a border around a bubble
//   renderBubbleBorder(bubble, color, width) {
//     this.context.beginPath();
//     this.context.arc(bubble.posX, bubble.posY, bubble.radius, 0, 2 * Math.PI);
//     this.context.closePath();
//     this.context.lineWidth = Constants.bubbleBorder * width;
//     this.context.strokeStyle = color;
//     this.context.stroke();
//   }

//   // Render all bubbles on the canvas
//   render() {
//     this.clear();
//     let selectedBubble = null;

//     for (const bubble of this.bubbles) {
//       if (((bubble.renderFavoriteBorder = this.renderFavoriteBorder), bubble.visible)) {
//         if (bubble.currency.id === this.selectedCurrencyId) {
//           selectedBubble = bubble;
//           continue;
//         }
//         if (this.draggedBubble === bubble) {
//           continue;
//         }
//         bubble.render(this.context);
//       }
//     }

//     if (this.draggedBubble) {
//       if (this.draggedBubble !== selectedBubble) {
//         this.draggedBubble.render(this.context);
//         this.renderBubbleBorder(this.draggedBubble, 'white', 1);
//       }
//     } else if (this.hoveredBubble) {
//       this.renderBubbleBorder(this.hoveredBubble, 'white', 1);
//     }

//     if (selectedBubble) {
//       selectedBubble.render(this.context);
//       const pulse = 0.5 * Math.sin(0.008 * Date.now()) + 0.5;
//       const borderWidth = pulse + 2;
//       const borderColor = `rgb(${Math.floor(255 * pulse)}, ${Math.floor(160 * pulse) + 95}, 255)`;
//       this.renderBubbleBorder(selectedBubble, borderColor, borderWidth);
//     }
//   }

//   // Unified recalculate method - replace both existing recalculate methods with this one
//   recalculate() {
//     if (this.needsRecalculation === false || this.bubbles.length === 0) {
//       return;
//     }

//     const { size, color, colors, period, timeFrame, metricType, content, baseCurrency } = this.properties;
//     const isInitialRecalculation = this.recalculationCount === 0;

//     // Determine which time period to use (revenue or crypto)
//     const effectiveTimeFrame = timeFrame || period || 'month';

//     let totalSize = 0;
//     let maxColorValue = 0;

//     for (const bubble of this.bubbles) {
//       const isNewPush = bubble.latestPush === this.latestPush;

//       // Choose the appropriate size calculation method based on data type
//       if (bubble.currency.metrics) {
//         // Revenue data
//         bubble.size = isNewPush ? Helper.calculateRevenueRadius(bubble.currency, size, effectiveTimeFrame, metricType) : 0;
//       } else {
//         // Crypto data
//         bubble.size = isNewPush ? Helper.calculateRadius(bubble.currency, size, effectiveTimeFrame) : 0;
//       }

//       // Add minimum size to prevent disappearing
//       if (bubble.size > 0 && bubble.size < 0.5) {
//         bubble.size = 0.5;
//       }

//       if (bubble.size > 0) {
//         totalSize += bubble.size;

//         // Choose appropriate color value calculation
//         let colorValue;
//         if (bubble.currency.metrics) {
//           colorValue = Math.abs(Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame));
//         } else {
//           colorValue = Math.abs(Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame));
//         }

//         if (colorValue > maxColorValue) {
//           maxColorValue = colorValue;
//         }
//       }
//     }

//     const canvasArea = this.width * this.height;
//     // Increase minimum size factor to prevent bubbles from disappearing
//     const sizeFactor = totalSize === 0 ? 1 : Math.max(1, (canvasArea / totalSize) * 0.6);

//     for (const bubble of this.bubbles) {
//       // Ensure minimum radius to prevent disappearing
//       const radius = Math.max(10, Math.sqrt((bubble.size * sizeFactor) / Math.PI));

//       // Use true for transition time to prevent sudden size changes
//       bubble.setRadius(radius, isInitialRecalculation);

//       // Choose appropriate color value
//       let colorValue;
//       if (bubble.currency.metrics) {
//         colorValue = Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame);
//       } else {
//         colorValue = Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame);
//       }

//       bubble.setColor(Helper.calculateColor(colorValue, colors, maxColorValue));

//       // Choose appropriate content generator
//       if (bubble.currency.metrics) {
//         bubble.setContent(Helper.generateRevenueContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
//       } else {
//         bubble.setContent(Helper.generateContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
//       }

//       // Keep bubbles more centered by adding padding
//       const padding = 50; // Extra padding to keep bubbles away from edges
//       bubble.posX = Helper.clamp(bubble.posX, radius + padding, this.width - radius - padding);
//       bubble.posY = Helper.clamp(bubble.posY, radius + padding, this.height - radius - padding);
//     }

//     // Reduce damping to prevent bubbles from moving too quickly
//     for (const bubble of this.bubbles) {
//       bubble.speedX *= 0.9;
//       bubble.speedY *= 0.9;
//     }

//     this.recalculationCount += 1;
//     this.wakeUp();
//   }


//   // Set the properties for the bubbles
//   setProperties(properties) {
//     this.properties = properties;
//     this.needsRecalculation = true;
//   }

//   // Add or update bubbles based on the provided currencies
//   pushCurrencies(currencies) {
//     this.latestPush += 1;
//     for (const currency of currencies) {
//       const { id } = currency;
//       let bubble = this.bubblesDict[id];
//       if (!bubble) {
//         bubble = new BubbleNew(currency);
//         bubble.posX = Math.random() * this.width;
//         bubble.posY = Math.random() * this.height;
//         this.bubbles.push(bubble);
//         this.bubblesDict[id] = bubble;
//       }
//       bubble.currency = currency;
//       bubble.latestPush = this.latestPush;
//     }
//     this.recalculate();
//   }

//   // Override the destroy method to clear the animation frame
//   destroy() {
//     super.destroy(); // Call the parent class's destroy method
//     if (this.animationFrameId) {
//       window.cancelAnimationFrame(this.animationFrameId); // Cancel the animation frame
//       this.animationFrameId = null;
//     }
//   }
// }

// export default BubbleManager;


/* eslint-disable no-cond-assign */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import BubbleNew from './Bubble';
import CanvasManager from './CanvasManager';
import EventEmitter from './EventEmitter';
import Helper from './Helper';

// Constants
const Constants = {
  bubblePadding: 10,
  bubbleBorder: 2,
  bubbleHitbox: 10
};

// Check if the application is embedded
const isEmbedded = false;

class BubbleManager extends CanvasManager {
  constructor(canvasElement, properties) {
    super(canvasElement);
    this.needsRecalculation = false; // Flag to indicate if bubble properties need recalculation
    this.recalculationCount = 0; // Count of recalculations
    this.latestPush = 0; // Timestamp of the latest data push
    this.bubbles = []; // Array of bubbles
    this.bubblesDict = {}; // Dictionary of bubbles by currency ID
    this.pointerX = -1; // X position of the pointer
    this.pointerY = -1; // Y position of the pointer
    this.hoveredBubble = null; // Currently hovered bubble
    this.draggedBubble = null; // Currently dragged bubble
    this.possibleSelectedBubble = null; // Possible selected bubble
    this.timePointerDown = 0; // Timestamp of the pointer down event
    this.timeLastWakeUp = Date.now(); // Timestamp of the last wake-up
    this.selectedCurrencyId = null; // ID of the selected currency
    this.renderFavoriteBorder = true; // Flag to render favorite border
    this.eventSelect = new EventEmitter(); // Event emitter for selection events
    this.animationFrameId = null; // ID of the animation frame request
    this.isFirstLoad = true; // Flag to track first data load

    this.eventResize.register(() => {
      this.needsRecalculation = true;
      this.requestFrame();
    });

    this.eventFrame.register((deltaTime) => {
      if (this.needsRecalculation) {
        this.recalculate();
      }
      this.update(deltaTime);
      this.render();

      const timeSinceLastWakeUp = Date.now() - this.timeLastWakeUp;
      const delay = Math.round(timeSinceLastWakeUp / 50 - 20); // Changed from 150 to 50   
      const adjustedDelay = Math.max(0, Math.min(delay, 200)); // Increased from 80 to 200

      if (adjustedDelay > 0 && !isEmbedded) {
        this.animationFrameId = window.setTimeout(() => this.requestFrame(), adjustedDelay);
      } else {
        setTimeout(() => this.requestFrame(), 50); // Add 50ms minimum delay
      }
    });

    this.properties = properties || {
      size: 'volume',
      color: 'performance',
      colors: 'red-green',
      period: 'month',
      timeFrame: 'month',
      metricType: 'revenue',
      content: 'revenue',
      baseCurrency: { code: 'USD' }
    };

    canvasElement.addEventListener('pointerdown', (event) => this.handlePointerDown(event), { passive: false });
    canvasElement.addEventListener('pointermove', (event) => this.handlePointerMove(event));
    canvasElement.addEventListener('touchmove', (event) => this.handleTouchMove(event), { passive: false });
    canvasElement.addEventListener('pointerup', (event) => this.handlePointerUp(event));
    canvasElement.addEventListener('pointercancel', () => this.handlePointerCancel());
  }

  // Update the pointer's position
  updatePointerPosition(event) {
    this.pointerX = event.offsetX * window.devicePixelRatio;
    this.pointerY = event.offsetY * window.devicePixelRatio;
  }

  // Update the last wake-up time
  wakeUp() {
    this.timeLastWakeUp = Date.now();
  }

  // Get the bubble closest to the pointer
  getFocusedBubble() {
    for (let i = this.bubbles.length - 1; i >= 0; i -= 1) {
      const bubble = this.bubbles[i];
      if (bubble.visible) {
        const dx = bubble.posX - this.pointerX;
        const dy = bubble.posY - this.pointerY;
        const distanceSquared = dx * dx + dy * dy;
        const hitboxRadius = bubble.radius + Constants.bubbleHitbox;
        if (hitboxRadius * hitboxRadius >= distanceSquared) {
          return bubble;
        }
      }
    }
    return null;
  }

  // Handle the pointer down event
  handlePointerDown(event) {
    if (event.isPrimary) {
      this.timePointerDown = Date.now();
      this.canvas.setPointerCapture(event.pointerId);
      if (event.pointerType === 'mouse') {
        this.draggedBubble = this.hoveredBubble;
      } else {
        this.updatePointerPosition(event);
        this.draggedBubble = this.getFocusedBubble();
      }
      if (this.draggedBubble) {
        this.possibleSelectedBubble = this.draggedBubble;
      } else {
        this.launchExplosion();
      }
    }
  }

  // Handle the pointer move event
  handlePointerMove(event) {
    if (event.isPrimary) {
      this.updatePointerPosition(event);
      const focusedBubble = this.getFocusedBubble();
      if (event.pointerType === 'mouse') {
        this.hoveredBubble = focusedBubble;
        const cursorBubble = this.draggedBubble || this.hoveredBubble;
        this.canvas.style.cursor = cursorBubble ? 'pointer' : 'auto';
      }
      if (this.possibleSelectedBubble !== focusedBubble) {
        this.possibleSelectedBubble = null;
      }
    }
  }

  // Handle the touch move event
  handleTouchMove(event) {
    if (this.draggedBubble) {
      event.preventDefault();
    }
  }

  // Handle the pointer up event
  handlePointerUp(event) {
    if (event.isPrimary) {
      if (this.possibleSelectedBubble) {
        if (Date.now() - this.timePointerDown < 1000) {
          const { currency } = this.possibleSelectedBubble;
          this.possibleSelectedBubble = null;
          this.eventSelect.fire(currency);
        }
      }
      this.draggedBubble = null;
    }
  }

  // Handle the pointer cancel event
  handlePointerCancel() {
    this.hoveredBubble = null;
    this.draggedBubble = null;
  }

  // Launch an explosion effect on the bubbles
  launchExplosion() {
    for (const bubble of this.bubbles) {
      const dx = bubble.posX - this.pointerX;
      const dy = bubble.posY - this.pointerY;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const force = 5000 / (distance * distance);
      bubble.applyForce(dx * force, dy * force);
    }
    this.wakeUp();
  }

  // Update the bubbles' positions and speeds
  update(deltaTime) {
    // const dampingFactor = 0.5 ** deltaTime;
    const dampingFactor = 0.6 ** deltaTime;
    const repulsionStrength = 0.0005 * Math.min(this.width, this.height);

    for (const bubble of this.bubbles) {
      bubble.update();
    }

    for (let i = 0; i < this.bubbles.length; i += 1) {
      const bubble1 = this.bubbles[i];
      if (bubble1.visible) {
        for (let j = i + 1; j < this.bubbles.length; j += 1) {
          const bubble2 = this.bubbles[j];
          if (!bubble2.visible) {
            continue;
          }
          const dx = bubble1.posX - bubble2.posX;
          const dy = bubble1.posY - bubble2.posY;
          const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
          const combinedRadius = bubble1.radius + bubble2.radius;

          if (distance < combinedRadius) {
            const force = 6 / distance;
            const fx = dx * force;
            const fy = dy * force;
            const ratio1 = 1 - bubble1.radius / combinedRadius;
            const ratio2 = bubble2.radius / combinedRadius - 1;

            bubble1.applyForce(fx * ratio1, fy * ratio1);
            bubble2.applyForce(fx * ratio2, fy * ratio2);
          }
        }

        bubble1.applyForce(Helper.getRandomForce() * repulsionStrength, Helper.getRandomForce() * repulsionStrength);
      }
    }

    if (this.draggedBubble) {
      const dx = this.pointerX - this.draggedBubble.posX;
      const dy = this.pointerY - this.draggedBubble.posY;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const force = 5 / distance;

      this.draggedBubble.applyForce(dx * force, dy * force);
      this.wakeUp();
    }

    for (const bubble of this.bubbles) {
      bubble.speedX *= dampingFactor;
      bubble.speedY *= dampingFactor;
      bubble.posX += bubble.speedX * deltaTime;
      bubble.posY += bubble.speedY * deltaTime;

      if (bubble.posX < bubble.radius) {
        bubble.posX = bubble.radius;
        bubble.speedX *= -0.7;
      }
      if (bubble.posY < bubble.radius) {
        bubble.posY = bubble.radius;
        bubble.speedY *= -0.7;
      }
      if (bubble.posX > this.width - bubble.radius) {
        bubble.posX = this.width - bubble.radius;
        bubble.speedX *= -0.7;
      }
      if (bubble.posY > this.height - bubble.radius) {
        bubble.posY = this.height - bubble.radius;
        bubble.speedY *= -0.7;
      }
    }
  }

  // Render a border around a bubble
  renderBubbleBorder(bubble, color, width) {
    this.context.beginPath();
    this.context.arc(bubble.posX, bubble.posY, bubble.radius, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.lineWidth = Constants.bubbleBorder * width;
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  // Render all bubbles on the canvas
  render() {
    this.clear();
    let selectedBubble = null;

    for (const bubble of this.bubbles) {
      if (((bubble.renderFavoriteBorder = this.renderFavoriteBorder), bubble.visible)) {
        if (bubble.currency.id === this.selectedCurrencyId) {
          selectedBubble = bubble;
          continue;
        }
        if (this.draggedBubble === bubble) {
          continue;
        }
        bubble.render(this.context);
      }
    }

    if (this.draggedBubble) {
      if (this.draggedBubble !== selectedBubble) {
        this.draggedBubble.render(this.context);
        this.renderBubbleBorder(this.draggedBubble, 'white', 1);
      }
    } else if (this.hoveredBubble) {
      this.renderBubbleBorder(this.hoveredBubble, 'white', 1);
    }

    if (selectedBubble) {
      selectedBubble.render(this.context);
      const pulse = 0.5 * Math.sin(0.008 * Date.now()) + 0.5;
      const borderWidth = pulse + 2;
      const borderColor = `rgb(${Math.floor(255 * pulse)}, ${Math.floor(160 * pulse) + 95}, 255)`;
      this.renderBubbleBorder(selectedBubble, borderColor, borderWidth);
    }
  }

  // Enhanced recalculate method with larger, more readable bubbles
  // recalculate() {
  //   if (this.needsRecalculation === false || this.bubbles.length === 0) {
  //     return;
  //   }

  //   const { size, color, colors, period, timeFrame, metricType, content, baseCurrency } = this.properties;
  //   const isInitialRecalculation = this.recalculationCount === 0;
  //   const effectiveTimeFrame = timeFrame || period || 'month';
  //   const effectiveMetricType = metricType || 'revenue';

  //   // FIRST PASS: Find min/max revenue values
  //   let maxRevenueValue = 0;
  //   let minRevenueValue = Infinity;

  //   for (const bubble of this.bubbles) {
  //     try {
  //       if (bubble.currency.metrics && bubble.currency.metrics[effectiveMetricType]) {
  //         const metricValue = bubble.currency.metrics[effectiveMetricType][effectiveTimeFrame];
  //         if (metricValue > 0) {
  //           maxRevenueValue = Math.max(maxRevenueValue, metricValue);
  //           minRevenueValue = Math.min(minRevenueValue, metricValue);
  //         }
  //       }
  //     } catch (error) {
  //       console.warn("Error getting metric value:", error);
  //     }
  //   }

  //   console.log(`Min revenue: ${minRevenueValue}, Max revenue: ${maxRevenueValue}`);

  //   // SECOND PASS: Calculate and assign sizes with increased base size
  //   for (const bubble of this.bubbles) {
  //     // Get the metric value
  //     let metricValue = 0;
  //     try {
  //       metricValue = bubble.currency.metrics?.[effectiveMetricType]?.[effectiveTimeFrame] || 0;
  //     } catch (error) {
  //       console.warn("Error getting metric value:", error);
  //     }

  //     // Calculate a larger bubble size with better readability
  //     let bubbleSize = 80; // Increased base size for better readability

  //     if (metricValue > 0) {
  //       // Use logarithmic scaling for better visual representation with readability
  //       const logMin = Math.log10(Math.max(1, minRevenueValue));
  //       const logMax = Math.log10(Math.max(10, maxRevenueValue));
  //       const logValue = Math.log10(Math.max(1, metricValue));

  //       // Normalize on a logarithmic scale from 0 to 1
  //       const normalizedValue = (logValue - logMin) / (logMax - logMin || 1);

  //       // Map to size range: minimum 80px (very readable) to 160px (2x larger)
  //       bubbleSize = 80 + (normalizedValue * 80);

  //       // For top 3 values, make them slightly more prominent
  //       if (metricValue > maxRevenueValue * 0.8) {
  //         bubbleSize += 20; // Extra boost for top values
  //       }
  //     }

  //     // Calculate color value
  //     let colorValue;
  //     try {
  //       if (bubble.currency.metrics) {
  //         colorValue = Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame);
  //       } else {
  //         colorValue = Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame);
  //       }
  //     } catch (error) {
  //       colorValue = 0;
  //     }

  //     // Set the radius with appropriate transition
  //     bubble.setRadius(bubbleSize, isInitialRecalculation ? 2000 : 500);

  //     // Set the color
  //     bubble.setColor(Helper.calculateColor(colorValue, colors, Math.max(1, Math.abs(colorValue) * 5)));

  //     // Set content
  //     try {
  //       if (bubble.currency.metrics) {
  //         bubble.setContent(Helper.generateRevenueContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
  //       } else {
  //         bubble.setContent(Helper.generateContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
  //       }
  //     } catch (error) {
  //       bubble.setContent(bubble.currency.symbol || "");
  //     }

  //     // Keep bubbles within canvas
  //     const padding = 20;
  //     bubble.posX = Helper.clamp(bubble.posX, bubbleSize + padding, this.width - bubbleSize - padding);
  //     bubble.posY = Helper.clamp(bubble.posY, bubbleSize + padding, this.height - bubbleSize - padding);
  //   }

  //   // Reduce damping for smoother motion
  //   for (const bubble of this.bubbles) {
  //     bubble.speedX *= 0.9;
  //     bubble.speedY *= 0.9;
  //   }

  //   this.needsRecalculation = false;
  //   this.recalculationCount += 1;
  //   this.wakeUp();
  // }

  recalculate() {
    if (!this.needsRecalculation || this.bubbles.length === 0) {
      return;
    }

    const { size, color, colors, period, timeFrame, metricType, content, baseCurrency } = this.properties;
    const isInitialRecalculation = this.recalculationCount === 0;
    const effectiveTimeFrame = timeFrame || period || 'month';
    const effectiveMetricType = metricType || 'revenue';

    // Determine min and max revenue values
    let maxRevenueValue = 0;
    let minRevenueValue = Infinity;

    for (const bubble of this.bubbles) {
      try {
        const metricValue = bubble.currency.metrics?.[effectiveMetricType]?.[effectiveTimeFrame];
        if (metricValue > 0) {
          maxRevenueValue = Math.max(maxRevenueValue, metricValue);
          minRevenueValue = Math.min(minRevenueValue, metricValue);
        }
      } catch (error) {
        console.warn("Error getting metric value:", error);
      }
    }

    // Define size range
    const minBubbleSize = 80;
    const maxBubbleSize = 160;

    // Calculate logarithmic min and max
    const logMin = Math.log10(Math.max(1, minRevenueValue));
    const logMax = Math.log10(Math.max(10, maxRevenueValue));

    // Adjust each bubble
    for (const bubble of this.bubbles) {
      let metricValue = 0;
      try {
        metricValue = bubble.currency.metrics?.[effectiveMetricType]?.[effectiveTimeFrame] || 0;
      } catch (error) {
        console.warn("Error getting metric value:", error);
      }

      let bubbleSize = minBubbleSize;

      if (metricValue > 0) {
        const logValue = Math.log10(Math.max(1, metricValue));
        const normalizedValue = (logValue - logMin) / (logMax - logMin || 1);
        bubbleSize = minBubbleSize + normalizedValue * (maxBubbleSize - minBubbleSize);

        // Optional: Highlight top performers
        if (metricValue > maxRevenueValue * 0.8) {
          bubbleSize += 20;
        }
      }

      // Calculate color value
      let colorValue;
      try {
        if (bubble.currency.metrics) {
          colorValue = Helper.calculateRevenueColorValue(bubble.currency, color, effectiveTimeFrame);
        } else {
          colorValue = Helper.calculateColorValue(bubble.currency, color, effectiveTimeFrame);
        }
      } catch (error) {
        colorValue = 0;
      }

      // Set radius and color
      bubble.setRadius(bubbleSize, isInitialRecalculation ? 2000 : 500);
      bubble.setColor(Helper.calculateColor(colorValue, colors, Math.max(1, Math.abs(colorValue) * 5)));

      // Set content
      try {
        if (bubble.currency.metrics) {
          bubble.setContent(Helper.generateRevenueContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
        } else {
          bubble.setContent(Helper.generateContent(bubble.currency, content, effectiveTimeFrame, baseCurrency));
        }
      } catch (error) {
        bubble.setContent(bubble.currency.symbol || "");
      }

      // Ensure bubbles stay within canvas bounds
      const padding = 20;
      bubble.posX = Helper.clamp(bubble.posX, bubbleSize + padding, this.width - bubbleSize - padding);
      bubble.posY = Helper.clamp(bubble.posY, bubbleSize + padding, this.height - bubbleSize - padding);
    }

    // Apply damping for smoother motion
    for (const bubble of this.bubbles) {
      bubble.speedX *= 0.9;
      bubble.speedY *= 0.9;
    }

    this.needsRecalculation = false;
    this.recalculationCount += 1;
    this.wakeUp();
  }


  // Set the properties for the bubbles
  setProperties(properties) {
    this.properties = properties || this.properties;
    this.needsRecalculation = true;
  }

  pushCurrencies(currencies) {
    // Increment the latest push timestamp
    this.latestPush += 1;

    this.bubbles = [];
    this.bubblesDict = {};

    // Process the new currencies
    for (const currency of currencies) {
      const { id } = currency;
      let bubble = new BubbleNew(currency);
      bubble.posX = Math.random() * this.width;
      bubble.posY = Math.random() * this.height;
      this.bubbles.push(bubble);
      this.bubblesDict[id] = bubble;
      bubble.currency = currency;
      bubble.latestPush = this.latestPush;
    }

    // Force recalculation and redraw
    this.needsRecalculation = true;
    this.recalculate();
    this.wakeUp();
  }

  // Override the destroy method to clean up resources
  destroy() {
    // First cancel any pending animation frame
    if (this.animationFrameId) {
      // Try both methods for safety
      if (typeof this.animationFrameId === 'number') {
        window.cancelAnimationFrame(this.animationFrameId);
        clearTimeout(this.animationFrameId);
      }
      this.animationFrameId = null;
    }

    // Remove event listeners (use the same options as when adding)
    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
      this.canvas.removeEventListener('pointermove', this.handlePointerMove);
      this.canvas.removeEventListener('touchmove', this.handleTouchMove);
      this.canvas.removeEventListener('pointerup', this.handlePointerUp);
      this.canvas.removeEventListener('pointercancel', this.handlePointerCancel);
    }

    // Call parent class stop method if it exists (doesn't use super)
    if (typeof this.stop === 'function') {
      this.stop();
    }

    // Clean up references
    this.bubbles = [];
    this.bubblesDict = {};
    this.hoveredBubble = null;
    this.draggedBubble = null;
    this.possibleSelectedBubble = null;

    // Remove event listeners
    this.eventSelect.clearListeners();
    this.eventResize.clearListeners();
    this.eventFrame.clearListeners();

    window.removeEventListener('resize', this.fillContainer);
  }
}

export default BubbleManager;