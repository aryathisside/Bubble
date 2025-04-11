const defaultColor = {
  red: 127,
  green: 127,
  blue: 127
};

class Helper {
  static clamp(value, min, max) {
    // eslint-disable-next-line no-nested-ternary
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  static getRandomForce() {
    return Math.random() * 2 - 1;
  }

  static formatPercentage(val, hideSign) {
    let value = val;
    if (value === null) {
      return '-';
    }

    value *= 0.01;
    const absoluteValue = Math.abs(value);

    // If the absolute value is very small, set it to a small positive or negative value
    if (absoluteValue < 0.0005) {
      value = 0.001 * Math.sign(value);
    }

    const formattingOptions = {
      style: 'percent',
      signDisplay: hideSign ? 'never' : 'exceptZero',
      maximumFractionDigits: absoluteValue >= 1 ? 0 : 1
    };

    return value.toLocaleString(undefined, formattingOptions).replace(/\u00a0/, '');
  }

  static calculateColor(colorOffset, color, maxColorOffset) {
    if (colorOffset === 0 || maxColorOffset === 0) return defaultColor;

    const ratio = Math.abs(colorOffset) / maxColorOffset;
    const intensity = Helper.clamp(Math.min(1, Math.max(0.2, ratio)), 0, 1);
    const lowerBound = Math.floor(127 * (1 - intensity));
    const upperBound = Math.floor(155 + 100 * intensity);

    if (colorOffset > 0) {
      if (color === 'yellow-blue') {
        return {
          red: lowerBound,
          green: lowerBound + 70,
          blue: upperBound
        };
      }
      return {
        red: lowerBound,
        green: upperBound,
        blue: lowerBound
      };
    }
    if (color === 'yellow-blue') {
      return {
        red: upperBound,
        green: upperBound,
        blue: lowerBound
      };
    }
    return {
      red: upperBound,
      green: lowerBound,
      blue: lowerBound
    };
  }

  static calculateSize(e) {
    return e ** 0.8;
  }

  static isValidRankDiffPeriod(period) {
    return period !== 'min1' && period !== 'min5' && period !== 'min15';
  }

  static calculateRadius(currency, sizeFactor, period) {
    switch (sizeFactor) {
      case 'marketcap':
        return Helper.calculateSize(currency.marketcap);
      case 'volume':
        return Helper.calculateSize(currency.volume);
      case 'volumeWeekly':
        return Helper.calculateSize(currency.volumeWeekly);
      case 'performance': {
        const performanceValue = Math.abs(currency.performance[period] || 0);
        return Helper.calculateSize(Math.min(1000, performanceValue));
        // return Helper.calculateSize(Helper.clamp(performanceValue, 0.01, 1000));
      }
      case 'rank-diff':
        return Helper.isValidRankDiffPeriod(period) ? Helper.calculateSize(Math.abs(currency.rankDiffs[period])) : 1;
      default:
        return 1;
    }
  }

  static calculateColorValue(currency, colorFactor, period) {
    switch (colorFactor) {
      case 'neutral':
        return 0;
      case 'performance':
        return Helper.clamp(currency.performance[period], -20, 20);
      case 'rank-diff':
        return 0;
      default:
        return 0;
    }
  }

  static generateContent(currency, contentTemplate, period, baseCurrency) {
    switch (contentTemplate) {
      case 'name':
        return currency.name;
      case 'rank':
        return currency.rank;
      case 'performance':
        return Helper.formatPercentage(currency.performance[period]);
      case 'volume':
        return Helper.formatPrice(currency.volume, baseCurrency);
      case 'volumeWeekly':
        return Helper.formatPrice(currency.volumeWeekly, baseCurrency);
      case 'price':
        return Helper.formatPrice(currency.price, baseCurrency);
      default:
        return '';
    }
  }

  // Function to get the color based on the value and color scheme
  static getPrimaryColor(value, colorScheme) {
    if (value) {
      if (value > 0) {
        // Positive value color
        return colorScheme === 'yellow-blue' ? '#4af' : '#3f3';
      }
      // Negative value color
      return colorScheme === 'yellow-blue' ? '#fb1' : '#f66';
    }
    return '';
  }

  // Function to get a different color based on the value and color scheme
  static getSecondaryColor(value, colorScheme) {
    if (value) {
      if (value > 0) {
        // Positive value alternate color
        return colorScheme === 'yellow-blue' ? '#16d' : '#282';
      }
      // Negative value alternate color
      return colorScheme === 'yellow-blue' ? '#c81' : '#a33';
    }
    return '';
  }

  static calculateConfigurationWeight(config, data) {
    const { color, period, size } = config;
    let weightedSum = 0;
    let weightTotal = 0;

    // eslint-disable-next-line no-undef, no-restricted-syntax
    for (const item of data) {
      // Assuming Ai() returns a list of items/entities
      const dataValue = Helper.calculateColorValue(item, color, period);
      const scaledValue = Helper.calculateRadius(item, size, period);

      if (scaledValue > 0) {
        const sqrtValue = Math.sqrt(scaledValue);
        weightedSum += Math.sign(dataValue) * sqrtValue;
        weightTotal += sqrtValue;
      }
    }

    return weightTotal > 0 ? weightedSum / weightTotal : 0;
  }

  static calculatePropetiesColor(config, data) {
    const weight = Helper.calculateConfigurationWeight(config, data);
    const primary = Helper.getPrimaryColor(weight);
    const secondary = Helper.getSecondaryColor(weight);

  }

  // static formatPrice(value, currency) {

  //   let amount = value;
  //   if (amount < 0) {
  //     amount = 0;
  //   }
  //   let fractionDigits = amount === 0 ? 2 : 3 - Math.ceil(Math.log10(amount));
  //   if (fractionDigits < 0) {
  //     fractionDigits = 0;
  //   }
  //   if (fractionDigits > 10) {
  //     fractionDigits = 10;
  //   }
  //   if (fractionDigits === 1) {
  //     fractionDigits = 2;
  //   }
  //   if (amount > 1e6) {
  //     fractionDigits = 2;
  //   }
  //   if (!Number.isFinite(fractionDigits)) {
  //     fractionDigits = 0;
  //   }

  //   // Create the formatting options
  //   const formatOptions = {
  //     style: 'currency',
  //     currency: currency.code,
  //     currencyDisplay: 'narrowSymbol',
  //     minimumFractionDigits: fractionDigits,
  //     maximumFractionDigits: fractionDigits
  //   };

  //   if (amount > 1e6) {
  //     formatOptions.notation = 'compact';
  //   }
  //   try {
  //     return amount.toLocaleString(undefined, formatOptions);
  //   } catch {
  //     formatOptions.currencyDisplay = 'symbol';
  //     return amount.toLocaleString(undefined, formatOptions);
  //   }
  // }



  static handleResize(callback) {
    const resizeHandler = () => {
      callback(window.innerWidth <= 768);
    };

    resizeHandler()
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }


  /* -------------------------------------------------------------------------- */
  /*                                For Revenue Model                           */
  /* -------------------------------------------------------------------------- */


  // Calculate the size of a bubble based on revenue metrics
  static calculateRevenueRadius(location, sizeFactor, timeFrame, metricType) {
    const metricValue = location.metrics[metricType][timeFrame];
    return Helper.calculateSize(metricValue);
  }

  // Calculate the color value based on revenue metrics
  static calculateRevenueColorValue(location, colorFactor, timeFrame) {
    if (colorFactor === 'neutral') {
      return 0;
    }

    if (colorFactor === 'performance') {
      // Use growth rate for color
      return Helper.clamp(location.metrics.growth[timeFrame], -20, 20);
    }

    return 0;
  }

  // Generate content for the bubble based on revenue data
  static generateRevenueContent(location, contentTemplate, timeFrame, currency) {
    const currencyCode = typeof currency === 'string' ? currency : (currency?.code || 'USD');

    switch (contentTemplate) {
      case 'name':
        return location.name;
      case 'state':
        return location.state;
      case 'country':
        return location.country;
      case 'performance':
        return Helper.formatPercentage(location.metrics.growth[timeFrame]);
      case 'revenue':
        return Helper.formatPrice(location.metrics.revenue[timeFrame], { code: currencyCode });
      case 'profit':
        return Helper.formatPrice(location.metrics.profit[timeFrame], { code: currencyCode });
      default:
        return '';
    }
  }

  static formatPrice(value, currency) {
    // First check if value is valid
    if (value === undefined || value === null || !Number.isFinite(parseFloat(value))) {
      return '-'; // Return a dash for invalid values
    }

    let amount = parseFloat(value);
    if (amount < 0) {
      amount = 0;
    }

    let currencyCode = 'USD'; // Default currency code

    // Safely extract currency code
    if (currency) {
      if (typeof currency === 'string') {
        currencyCode = currency;
      } else if (currency.code && typeof currency.code === 'string') {
        currencyCode = currency.code;
      }
    }

    let fractionDigits = amount === 0 ? 2 : 3 - Math.ceil(Math.log10(amount));
    if (fractionDigits < 0) {
      fractionDigits = 0;
    }
    if (fractionDigits > 10) {
      fractionDigits = 10;
    }
    if (fractionDigits === 1) {
      fractionDigits = 2;
    }
    if (amount > 1e6) {
      fractionDigits = 2;
    }
    if (!Number.isFinite(fractionDigits)) {
      fractionDigits = 0;
    }

    // Create the formatting options
    const formatOptions = {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits
    };

    if (amount > 1e6) {
      formatOptions.notation = 'compact';
    }

    try {
      return amount.toLocaleString(undefined, formatOptions);
    } catch (error) {
      // Fallback if there's an error
      formatOptions.currencyDisplay = 'symbol';
      try {
        return amount.toLocaleString(undefined, formatOptions);
      } catch (error) {
        // Last resort fallback - just return the number with a dollar sign
        return `$${amount.toFixed(fractionDigits)}`;
      }
    }
  }


  static calculateRevenueRadius(location, sizeFactor, timeFrame, metricType) {
    // Default to revenue if metricType isn't specified or is invalid
    const effectiveMetricType = ['revenue', 'profit', 'growth'].includes(metricType) ? metricType : 'revenue';

    // Get the appropriate metric value
    let value;

    try {
      if (effectiveMetricType === 'growth') {
        // For growth, use absolute percentage value for sizing
        const growthValue = Math.abs(parseFloat(location.metrics.growth[timeFrame]) || 0);
        // Scale growth percentage to a reasonable bubble size (percentage * multiplier)
        value = growthValue * 5000; // Adjust multiplier as needed
      }
      else {
        // For revenue or profit, use the raw value
        value = location.metrics[effectiveMetricType][timeFrame] || 0;
      }
    } catch (error) {
      console.warn(`Error calculating ${effectiveMetricType} for ${timeFrame}:`, error);
      value = 0;
    }

    // Apply logarithmic scaling for better visual representation
    // This prevents extremely large values from dominating the visualization
    // while still maintaining proportional relationship
    if (value > 0) {
      return Math.max(10, Math.log10(value) * 5);
    }

    return 10; // Minimum size for bubbles
  }

  static calculateRevenueColorValue(location, colorFactor, timeFrame) {
    if (colorFactor === 'neutral') {
      return 0;
    }

    if (colorFactor === 'performance') {
      // Use growth rate for color
      try {
        return Helper.clamp(parseFloat(location.metrics.growth[timeFrame]), -20, 20);
      } catch (error) {
        console.warn(`Error calculating growth for ${timeFrame}:`, error);
        return 0;
      }
    }

    return 0;
  }

  static generateRevenueContent(location, contentTemplate, timeFrame, currency) {
    const currencyCode = typeof currency === 'string' ? currency : (currency?.code || 'USD');

    // If the location has a pre-formatted display value, use it
    if (location.displayValue) {
      return location.displayValue;
    }

    // Otherwise, format the content based on template
    switch (contentTemplate) {
      case 'revenue':
        try {
          // Format as compact currency for better readability in bubbles
          const value = location.metrics.revenue[timeFrame];
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            notation: 'compact',
            maximumFractionDigits: 1
          }).format(value);
        } catch (error) {
          return '$0';
        }

      case 'profit':
        try {
          // Format as compact currency for better readability in bubbles
          const value = location.metrics.profit[timeFrame];
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
            notation: 'compact',
            maximumFractionDigits: 1
          }).format(value);
        } catch (error) {
          return '$0';
        }

      case 'growth':
      case 'performance':
        try {
          // Format with 1 decimal place for percentages
          const value = parseFloat(location.metrics.growth[timeFrame]);
          return `${value.toFixed(1)}%`;
        } catch (error) {
          return '0%';
        }

      // Let name display be handled by the bubble's name property
      case 'name':
      case 'state':
      case 'country':
      default:
        return ''; // Return empty string to avoid duplicating the name
    }
  }
}

export default Helper;
