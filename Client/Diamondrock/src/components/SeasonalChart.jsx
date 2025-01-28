import React from 'react';

const SeasonalChart = ({ data, width = 300, height = 100 }) => {
  // Find min and max values for scaling
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Scale points to fit the chart
  const scaleY = (value) => {
    return height - ((value - minValue) / (maxValue - minValue)) * height;
  };
  
  const scaleX = (index) => {
    return (index / (data.length - 1)) * width;
  };
  
  // Generate path data
  const pathData = data.map((point, index) => {
    const x = scaleX(index);
    const y = scaleY(point.value);
    return `${index === 0 ? 'M' : 'L'} ${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Chart line */}
      <path
        d={pathData}
        fill="none"
        stroke="#6366f1"
        strokeWidth="1.5"
        className="transition-all duration-300"
      />
      
      {/* Data points */}
      {data.map((point, index) => (
        <g key={index}>
          <circle
            cx={scaleX(index)}
            cy={scaleY(point.value)}
            r="3"
            className="fill-indigo-600"
          />
          <circle
            cx={scaleX(index)}
            cy={scaleY(point.value)}
            r="6"
            className="fill-indigo-600 opacity-0 hover:opacity-10 transition-opacity cursor-pointer"
          />
        </g>
      ))}
    </svg>
  );
};

export default SeasonalChart;