class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  register(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
  }

  fire(...args) {
    for (const listener of this.listeners) {
      try {
        listener(...args);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    }
  }

  // Add this method to properly clean up listeners
  clearListeners() {
    this.listeners = [];
  }
}

export default EventEmitter;