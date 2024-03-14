import React from 'react';
import { cardio } from 'ldrs';

const LoadingButton = ({ loading, children, onClick, ...props }) => {
  cardio.register();
  const handleClick = (e) => {
    !loading && onClick && onClick(e); // Only call onClick if not already loading
  };
  return (
    <button onClick={handleClick} {...props} disabled={loading}>
      {loading ? <l-cardio
                size="40"
                stroke="2"
                speed="1"
                color="white" 
          ></l-cardio> : children}
    </button>
  );
};

export default LoadingButton;
