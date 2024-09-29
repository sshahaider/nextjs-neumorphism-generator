import React, { useState } from 'react';

const Tooltip = ({ value, position }) => {
  const tooltipStyle = {
    position: 'absolute',
    top: position.top || '-30px',
    left: position.left,
    backgroundColor: '#333',
    color: '#fff',
    padding: '4px',
    borderRadius: '4px',
    zIndex: 999,
  };

  return <div  style={tooltipStyle}>{value}</div>;
};

const Range = ({ value, onChange, min, max, label, step }) => {
  const [isSliderClicked, setIsSliderClicked] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const handleMouseMove = (e) => {
    if (isSliderClicked) {
      const rect = e.target.getBoundingClientRect();
      const offset = (e.clientX - rect.left) / rect.width;
      const left = `${Math.min(Math.max(offset, 0), 1) * 100}%`; // Ensure left is between 0% and 100%
      const top = '-30px'; // Adjust this value based on your design
      setTooltipPosition({ top, left });
    }
  };

  const handleSliderClick = () => {
    setIsSliderClicked(true);
  };

  const handleSliderRelease = () => {
    setIsSliderClicked(false);
  };

  return (
  
    <div className='relative flex flex-row items-center justify-center my-2'>
      <label htmlFor='default-range' className='w-[25%]'>
        {label}:
      </label>
      <div
        style={{ position: 'relative', width: '75%' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleSliderRelease}
      >
        <input layoutId='range'
          value={value}
          onChange={onChange}
          onMouseDown={handleSliderClick}
          type='range'
          min={min}
          max={max}
          step={step}
          className='w-full h-1 bg-accent rounded-lg appearance-none cursor-pointer'
        />
        {isSliderClicked && (
          <Tooltip value={value} position={tooltipPosition} />
        )}
      </div>
    </div>
  );
};

export default Range;
