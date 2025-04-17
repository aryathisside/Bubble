// src/components/FlagImage.jsx
import React, { useState, useEffect } from 'react';
import { getFlagImage } from '../utils/flagUtils';

const FlagImage = ({ countryCode, alt, ...props }) => {
  const [flagSrc, setFlagSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!countryCode) {
      setLoading(false);
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    // Load the flag image
    getFlagImage(countryCode.toLowerCase())
      .then((src) => {
        setFlagSrc(src);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [countryCode]);

  if (loading) {
    return <div className="flag-placeholder" {...props} />;
  }

  if (error || !flagSrc) {
    return <div className="flag-error" {...props} />;
  }

  return <img src={flagSrc} alt={alt || `Flag of ${countryCode}`} className="country-flag" {...props} />;
};

export default FlagImage;
