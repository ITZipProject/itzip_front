import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="w-16 h-16 border-4 border-solid border-primary border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
